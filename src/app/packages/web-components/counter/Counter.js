import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Icons from '../../icons';
import { Flex } from 'grid-styled';
import styled from 'styled-components';

import Icon from '../icon/Icon';
import IconsStore from '../icon/IconsStore';
import Text from '../text/Text';
import { COLORS } from '../base/Colors';
import withDisplayName from '../WithDisplayName';
import { FONT_TYPES } from '../base/Typography';
import Button from '../buttons/Button';

const CounterButton = styled(Button)`
  border-radius: 50%;
  height: 30px;
  width: 30px;
  max-width: none;
  padding: 0;
`;

class Counter extends Component {
  static propTypes = {
    value: PropTypes.number,
    onChange: PropTypes.func,
    className: PropTypes.string,
    minimumCount: PropTypes.number,
    disabled: PropTypes.bool,
    isArabic: PropTypes.bool,
  };

  static defaultProps = {
    className: '',
    onChange: () => {},
    value: 1,
    minimumCount: 1,
    disabled: false,
    isArabic: false,
  };

  state = {
    count: this.props.value,
    disableMinus: this.props.value <= this.props.minimumCount,
  };

  /**
   * Returns the current count
   */
  getInputValue = () => this.state.count;

  /**
   * localize the numbers to arabic
   */

  toIndiaDigits = number => {
    const id = ['٠', '١', '٢', '٣', '٤', '٥', '٦', '٧', '٨', '٩'];
    return number.replace(/[0-9]/g, w => id[+w]);
  };

  iconsStore = new IconsStore(Icons);

  /**
   * Increase the current count by one
   */
  increaseCount = () => {
    const { minimumCount, onChange } = this.props;
    this.setState(prevState => {
      const count = prevState.count + 1;
      const disableMinus = count <= minimumCount;
      onChange(count);
      return {
        count,
        disableMinus,
      };
    });
  };

  /**
   * Check if the current count if bigger than one, then decrease it by one
   */
  decreaseCount = () => {
    const { minimumCount, onChange } = this.props;
    let { count, disableMinus } = this.state;
    if (count > 1 && !disableMinus) {
      this.setState(prevState => {
        count = prevState.count - 1;
        disableMinus = count <= minimumCount;
        onChange(count);
        return {
          count,
          disableMinus,
        };
      });
    }
  };

  /**
   * Always returns true
   */
  isValid = () => true;

  /**
   * Do nothing, just to have the same field method
   */
  validate = () => {};

  render() {
    const { className, disabled, isArabic } = this.props;
    const { disableMinus, count } = this.state;
    return (
      <Flex alignItems="center" justifyContent="center" className={className}>
        <CounterButton
          primary={false}
          color={COLORS.PRIMARY_BLUE}
          onClick={this.decreaseCount}
          onKeyDown={() => {}}
          disabled={disableMinus || disabled}
        >
          <Icon
            icon={this.iconsStore.getIcon('minus')}
            width={24}
            color={disableMinus || disabled ? COLORS.DISABLED : COLORS.PRIMARY_BLUE}
          />
        </CounterButton>
        <Text mx={5} minWidth={20} textAlign="center" type={FONT_TYPES.TITLE}>
          {isArabic ? this.toIndiaDigits(count.toString()) : count}
        </Text>
        <CounterButton
          primary={false}
          color={COLORS.PRIMARY_BLUE}
          onClick={this.increaseCount}
          onKeyDown={() => {}}
          disabled={disabled}
        >
          <Icon
            icon={this.iconsStore.getIcon('plus')}
            width={12}
            color={disabled ? COLORS.DISABLED : COLORS.PRIMARY_BLUE}
          />
        </CounterButton>
      </Flex>
    );
  }
}

export default withDisplayName(Counter, 'Counter');
