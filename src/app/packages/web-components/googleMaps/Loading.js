import React from 'react';
import PropTypes from 'prop-types';

import Container from './Container';
import Spinner from '../spinner/Spinner';

const Loading = ({ height, radius }) => (
  <Container alignItems="center" justifyContent="center" height={height}>
    <Spinner radius={radius} />
  </Container>
);

Loading.propTypes = {
  height: PropTypes.number.isRequired,
  radius: PropTypes.number,
};

Loading.defaultProps = {
  radius: 30,
};

export default Loading;
