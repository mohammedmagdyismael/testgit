import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Flex } from 'grid-styled';

import Text from '../text/Text';
import Icon, { iconPropTypes } from '../icon/Icon';
import FieldContainer from './FieldContainer';
import Input from './Input';
import { FONT_TYPES, FONT_SIZES, FONT_WEIGHTS, LINE_HEIGHTS } from '../base/Typography';
import { COLORS } from '../base/Colors';

class Field extends Component {
  static propTypes = {
    placeholder: PropTypes.string.isRequired,
    value: PropTypes.string,
    name: PropTypes.string,
    autoComplete: PropTypes.string,
    errorText: PropTypes.string,
    helpText: PropTypes.string,

    isDanger: PropTypes.bool,
    isDisabled: PropTypes.bool,

    icon: iconPropTypes,
    iconWidth: PropTypes.number,

    onFocus: PropTypes.func,
    onBlur: PropTypes.func,
    onChange: PropTypes.func,
  };

  static defaultProps = {
    value: undefined,
    name: undefined,
    autoComplete: 'on',
    errorText: undefined,
    helpText: undefined,

    isDanger: false,
    isDisabled: false,

    icon: undefined,
    iconWidth: 15,

    onFocus: () => {},
    onBlur: () => {},
    onChange: () => {},
  };

  state = {
    isFocused: false,
  };

  onFocus = () => {
    this.setState({
      isFocused: true,
    });
    this.props.onFocus();
  };

  onBlur = () => {
    this.setState({
      isFocused: false,
    });
    this.props.onBlur();
  };

  render() {
    const {
      placeholder,
      value,
      name,
      // autoComplete,
      errorText,
      helpText,
      isDanger,
      isDisabled,
      icon,
      iconWidth,
      onChange,
    } = this.props;
    const { isFocused } = this.state;

    const showHelpText = helpText && !isDanger;
    const showErrorText = errorText && isDanger;
    const height = 34;
    let color;
    const helpTextProps = {
      position: 'absolute',
      fontType: FONT_TYPES.CAPTION,
      top: height,
      display: 'block',
      lineHeight: 20,
    };

    if (isFocused) {
      color = COLORS.PRIMARY_BLUE;
    } else if (isDanger) {
      color = COLORS.PRIMARY_RED;
    } else if (isDisabled) {
      color = COLORS.DISABLED;
    } else {
      color = COLORS.TEXT;
    }

    return (
      <FieldContainer borderColor={color}>
        <Flex width={1} alignItems="center">
          {icon && <Icon icon={icon} width={iconWidth} color={color} mr={2} />}
          <Input
            height={height}
            placeholder={placeholder}
            fontSize={FONT_SIZES[FONT_TYPES.BODY]}
            fontWeight={FONT_WEIGHTS.NORMAL}
            lineHeight={LINE_HEIGHTS[FONT_TYPES.BODY]}
            onBlur={this.onBlur}
            onFocus={this.onFocus}
            onChange={onChange}
            disabled={isDisabled}
            value={value}
            name={name}
            autoComplete="off"
          />
        </Flex>
        {showErrorText && (
          <Text tag="span" color={COLORS.PRIMARY_RED} {...helpTextProps}>
            {errorText}
          </Text>
        )}
        {showHelpText && (
          <Text tag="span" color={COLORS.HELP_TEXT} {...helpTextProps}>
            {helpText}
          </Text>
        )}
      </FieldContainer>
    );
  }
}

export default Field;
