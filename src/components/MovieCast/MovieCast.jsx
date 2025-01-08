import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Loader from '../Loader/Loader';
import { fetchMovieCast } from '../../movielist-api';
import css from './MovieCast.module.css';

const defaultImg = ''

const MovieCast = () => {
  const { movieId } = useParams();
  const [movieCast, setMovieCast] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!movieId) return;

    const loadMovieCast = async () => {
      setIsLoading(true);

      try {
        const data = await fetchMovieCast(movieId);
        setMovieCast(data);
      } catch (error) {
        setError(`Error fetching MovieCast: ${error.message}`);
      } finally {
        setIsLoading(false);
      }
    };

    loadMovieCast();
  }, [movieId]);

  return (
    <div className={css.container}>
      {isLoading && (
        <div className={css.loading}>
          <Loader />
        </div>
      )}

      {error && <p className={css.error}>{error}</p>}

      {!isLoading && !error && !movieCast.length && (
        <p className={css.message}>No cast information available.</p>
      )}

      {!isLoading && !error && movieCast.length > 0 && (
        <>
          <h3 className={css.subtitle}>Movie Cast</h3>
          <ul className={css.castList}>
            {movieCast.map(({ id, name, profile_path, character }) => (
              <li key={id} className={css.castItem}>
                <img
                  src={
                    profile_path
                      ? `https://image.tmdb.org/t/p/w200${profile_path}`
                      : defaultImg
                  }
                  alt={name}
                  className={css.actorImage}
                />
                <p className={css.actorName}>{name}</p>
                <p className={css.characterName}>Character: {character}</p>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
};

export default MovieCast;