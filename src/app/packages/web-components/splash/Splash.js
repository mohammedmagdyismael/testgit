import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Flex } from 'grid-styled';

import InfiniteLoadingBar from '../infiniteLoadingBar/InfiniteLoadingBar';
import Space from '../base/Space';

const SplashContainer = styled(Flex)`
  height: 100vh;
`;

const Logo = styled.img`
  height: auto;
  width: 300px;
  margin-bottom: ${Space[10]}px;
`;

const Splash = ({ logoUrl }) => (
  <SplashContainer
    alignItems="center"
    justifyContent="center"
    flexDirection="column"
    width={1}
    height="100"
  >
    <Logo src={logoUrl} alt="logo" />
    <InfiniteLoadingBar width={300} />
  </SplashContainer>
);

Splash.propTypes = {
  logoUrl: PropTypes.string.isRequired,
};

export default Splash;
