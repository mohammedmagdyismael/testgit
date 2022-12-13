import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getMovies } from 'app/packages/store/actions/actions'
import { 
    Container, 
    Wrapper, 
    HeaderTitleContainer, 
    HeaderTitleWrapper, 
    Title, 
    extendContactButtonStyle 
} from './TraktMoviesContainer.style';
import Movies from './Movies';

const TraktMoviesContainer = ({ movies, ...props }) => {

    useEffect(() => {
        props.getMovies({
            query: 'a'
        });
    }, []);
    
    return (
        <Container>
            <Movies movies={movies} />
        </Container>
    )
}

const mapStateToProps = state => ({
    movies: state.actions.movies,
});
  
  const mapDispatchToProps = dispatch =>
    bindActionCreators(
      {
        getMovies,
      },
      dispatch,
    );
  
  export default connect(
    mapStateToProps,
    mapDispatchToProps,
  )(TraktMoviesContainer);
