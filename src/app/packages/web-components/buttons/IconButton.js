import React, { PureComponent } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import {
  width,
  height,
  minHeight,
  minWidth,
  bgColor,
  border,
  borderColor,
  space,
} from 'styled-system';

import Icon, { iconPropTypes } from '../icon/Icon';
import { COLORS } from '../base/Colors';

const StyledButton = styled.button`
  ${height};
  ${minHeight};
  ${width};
  ${minWidth};
  ${border};
  ${borderColor};
  ${bgColor};
  ${space};
  border-radius: 50%;
  outline: none;
  align-items: center;
  display: flex;
  justify-content: center;

  &:not(:disabled) {
    cursor: pointer;
  }
`;

class IconButton extends PureComponent {
  static propTypes = {
    radius: PropTypes.number,
    disabled: PropTypes.bool,
    icon: iconPropTypes.isRequired,
    iconWidth: PropTypes.number,
  };

  static defaultProps = {
    radius: 40,
    disabled: false,
    iconWidth: 16,
  };

  state = {
    iconColor: this.props.disabled ? COLORS.WHITE : COLORS.PRIMARY_BLUE,
    buttonBorderColor: this.props.disabled ? COLORS.DISABLED : COLORS.PRIMARY_BLUE,
    buttonBackgroundColor: this.props.disabled ? COLORS.DISABLED : COLORS.WHITE,
  };

  onMouseOver = () => {
    this.changeButtonColors({
      iconColor: COLORS.WHITE,
      buttonBackgroundColor: COLORS.PRIMARY_BLUE,
    });
  };

  onMouseOut = () => {
    this.changeButtonColors({
      iconColor: COLORS.PRIMARY_BLUE,
      buttonBackgroundColor: COLORS.WHITE,
    });
  };

  changeButtonColors = ({ iconColor, buttonBackgroundColor }) => {
    // If the button is disabled no more to update the state
    const { disabled } = this.props;
    if (disabled) {
      return;
    }

    this.setState({
      iconColor,
      buttonBackgroundColor,
    });
  };

  render = () => {
    const { radius, icon, iconWidth } = this.props;
    const { iconColor, buttonBackgroundColor, buttonBorderColor } = this.state;

    return (
      <StyledButton
        {...this.props}
        height={radius}
        minHeight={radius}
        width={radius}
        minWidth={radius}
        borderColor={buttonBorderColor}
        bg={buttonBackgroundColor}
        onMouseEnter={this.onMouseOver}
        onMouseLeave={this.onMouseOut}
      >
        <Icon icon={icon} width={iconWidth} color={iconColor} />
      </StyledButton>
    );
  };
}

export default IconButton;
