import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Color from 'color';
import ColorString from 'color-string';

import ButtonBase from './ButtonBase';
import Text from '../text/Text';
import Spinner from '../spinner/Spinner';
import Icon, { iconPropTypes } from '../icon/Icon';
import { FONT_WEIGHTS } from '../base/Typography';
import { COLORS, COLORS_VALUES } from '../base/Colors';

class Button extends Component {
  static propTypes = {
    children: PropTypes.string.isRequired,
    color: PropTypes.string,
    primary: PropTypes.bool,
    disabled: PropTypes.bool,
    isLoading: PropTypes.bool,
    icon: iconPropTypes,
    iconWidth: PropTypes.number,
    reverse: PropTypes.bool,
  };

  static defaultProps = {
    color: undefined,
    primary: true,
    disabled: false,
    isLoading: false,
    icon: undefined,
    iconWidth: 15,
    reverse: false,
  };

  /**
   * Decides button background and text color depends on the button type
   * and whether it's disabled or not
   * Types:
   * - Primary: Background will inherit color prop and the text will be white
   * - Secondary: Text will inherit color prop and the background will be transparent
   *
   * @returns {object} contains {textColor, buttonBackground}
   */
  getButtonColors = () => {
    const { primary, disabled, isLoading } = this.props;
    let { color } = this.props;
    const isDisabled = disabled || isLoading;
    let textColor;
    let buttonBackground;
    let buttonBackgroundOnHover;
    let borderColor;
    let borderColorOnHover;

    // Set the default colors if the color prop is not provided
    if (!color) {
      color = primary ? COLORS.PRIMARY_RED : COLORS.TEXT;
    }

    if (primary) {
      if (isDisabled) {
        textColor = COLORS.TEXT;
        buttonBackground = COLORS.DISABLED;
        buttonBackgroundOnHover = buttonBackground;
      } else {
        textColor = COLORS.WHITE;
        buttonBackground = color;
        buttonBackgroundOnHover = Color(COLORS_VALUES[buttonBackground])
          .darken(0.15)
          .hex();
      }
      borderColor = buttonBackground;
      borderColorOnHover = buttonBackgroundOnHover;
    } else {
      if (isDisabled) {
        textColor = COLORS.DISABLED;
        buttonBackgroundOnHover = COLORS.TRANSPARENT;
      } else {
        textColor = color;
        buttonBackgroundOnHover = Color(COLORS_VALUES[color])
          .alpha(0.08)
          .rgb()
          .array();
        buttonBackgroundOnHover = ColorString.to.rgb(buttonBackgroundOnHover);
      }

      borderColor = COLORS.BUTTON_BORDER;
      buttonBackground = COLORS.TRANSPARENT;
      borderColorOnHover = borderColor;
    }

    return {
      textColor,
      buttonBackground,
      borderColor,
      buttonBackgroundOnHover,
      borderColorOnHover,
    };
  };

  render() {
    const { children, isLoading, disabled, icon, iconWidth, reverse } = this.props;
    const {
      textColor,
      buttonBackground,
      borderColor,
      buttonBackgroundOnHover,
      borderColorOnHover,
    } = this.getButtonColors();
    const shouldRenderIcon = icon && !isLoading;
    const flexDirection = reverse ? 'row-reverse' : 'row';
    const cursor = disabled || isLoading ? 'default' : 'pointer';

    return (
      <ButtonBase
        {...this.props}
        disabled={disabled || isLoading}
        bg={buttonBackground}
        borderColor={borderColor}
        hover={{ backgroundColor: buttonBackgroundOnHover, borderColor: borderColorOnHover }}
        flexDirection={flexDirection}
      >
        {isLoading && (
          <Spinner radius={16} color={textColor} ml={reverse && 2} mr={!reverse && 2} />
        )}
        {shouldRenderIcon && (
          <Icon
            icon={icon}
            width={iconWidth}
            color={textColor}
            ml={reverse && 2}
            mr={!reverse && 2}
          />
        )}
        {typeof children === 'string' ? (
          <Text
            tag="span"
            width="max-content"
            color={textColor}
            fontWeight={FONT_WEIGHTS.SEMI_BOLD}
            lineHeight={14}
            cursor={cursor}
          >
            {children}
          </Text>
        ) : (
          children
        )}
      </ButtonBase>
    );
  }
}

export default Button;
