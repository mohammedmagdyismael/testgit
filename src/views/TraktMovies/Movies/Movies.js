import React, { useEffect, useState } from 'react';
import { 
  Container,
  EmptyStateMsg,
  EmptyStateMsgContainer,
  PlaceholderImg,
  ResultMovieNameLink,
  ResultMovieYear, 
  ResultMovieCard,
} from './Movies.style';

const Movies = ({ movies }) => {
  const [moviesCard, setMoviesCard] = useState([]);
  useEffect(() => {
    const moviesList = [];
   if (!moviesCard.length && movies && movies.length) {
     debugger
    movies.forEach(movie => {
      const imdbURL = "https://www.imdb.com/title/"+movie.movie.ids.imdb;
      debugger
      moviesList.push(
        <ResultMovieCard>
          {/* <PlaceholderImg src={MoviePlaceholderImg}/>  */}                  
          <ResultMovieNameLink href={imdbURL} target="_blank">
              {movie.movie.title}
          </ResultMovieNameLink>
          <ResultMovieYear>
              Year: {movie.movie.year}
          </ResultMovieYear>
        </ResultMovieCard>
      )
    });
   }
   setMoviesCard(moviesList);
  }, [movies]);

  return (
        <Container>
            {moviesCard}
        </Container>
    )
}

  
export default Movies;
