import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Flex } from 'grid-styled';
import { space } from 'styled-system';

import { COLORS } from '../base/Colors';

const HeaderContainer = Flex.extend`
  height: 60px;
  display: ${props => (props.hideHeader ? 'none' : 'flex')};
  ${space};
`;

const Logo = styled.img`
  cursor: pointer;
  transition: opacity 150ms ease;
  width: 134px;
`;

const Header = ({ onLogoClick, logoUrl, items, hideHeader, ...props }) => (
  <HeaderContainer
    hideHeader={hideHeader}
    alignItems="center"
    justifyContent="space-between"
    width={1}
    bg={COLORS.PRIMARY_BLUE}
    {...props}
  >
    <Logo src={logoUrl} alt="logo" onClick={onLogoClick} onKeyDown={() => {}} role="button" />
    <Flex alignItems="center" justifyContent="flex-end">
      {items}
    </Flex>
  </HeaderContainer>
);

Header.propTypes = {
  items: PropTypes.node,
  logoUrl: PropTypes.string.isRequired,
  onLogoClick: PropTypes.func,
  hideHeader: PropTypes.bool,
};

Header.defaultProps = {
  items: [],
  onLogoClick: () => {},
};

export default Header;
