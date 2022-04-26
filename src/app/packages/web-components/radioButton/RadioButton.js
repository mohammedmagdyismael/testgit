import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import _ from 'lodash';

import Option from './Option';
import Rect from '../shimmerEffect/Rect';
import Circle from '../shimmerEffect/Circle';
import { NoAnimationFlex } from '../shimmerEffect/NoAnimationContainer';
import withDisplayName from '../WithDisplayName';
import './RadioButton.scss';

class RadioButton extends Component {
  constructor(props) {
    super(props);

    this.state = {
      value: this.props.select,
      isLoading: !this.props.options,
    };
  }

  componentWillReceiveProps(nextProps) {
    if (!_.isEqual(nextProps.options, this.props.options) && nextProps.options.length !== 0) {
      this.setState({
        isLoading: false,
      });
    }

    if (!_.isEqual(nextProps.select, this.props.select)) {
      this.updateValue(nextProps.select);
    }
  }

  /**
   * Get radio button value
   */
  getInputValue = () => this.state.value;

  /**
   * Updates this.state.value and call
   * this.props.onChange
   * @param value
   */
  updateValue = value => {
    this.setState(
      {
        value,
      },
      () => {
        if (this.props.onChange) {
          this.props.onChange(this.state.value);
        }
      },
    );
  };

  /**
   * Interfaces that should be in all components that require user's input
   */
  showErrorMessage = () => {};

  hideErrorMessage = () => {};
  isValid = () => true;
  validate = () => {};
  focus = () => {};

  render() {
    let options = null;
    const { direction, disabled } = this.props;

    if (!this.state.isLoading) {
      options = this.props.options.map(option => (
        <Option
          key={option.value}
          value={option.value}
          name={option.name}
          defaultChecked={option.value === this.state.value}
          updateValue={this.updateValue}
          component={option.component}
          description={option.description}
          direction={direction}
          disable={disabled || !!option.disable}
        />
      ));
    } else {
      options = (
        <NoAnimationFlex className={`lazy-loading ${this.props.listAlignment}`}>
          <NoAnimationFlex alignItems="center">
            <Circle mr={2} radius={30} />
            <Rect width={160} />
          </NoAnimationFlex>
          <NoAnimationFlex alignItems="center">
            <Circle mr={2} radius={30} />
            <Rect width={160} />
          </NoAnimationFlex>
        </NoAnimationFlex>
      );
    }

    return (
      <ul
        className={classnames('radio-button-list', this.props.listAlignment, this.props.className, {
          'radio-button-list--disabled': this.props.disabled,
        })}
      >
        {options}
      </ul>
    );
  }
}

RadioButton.propTypes = {
  className: PropTypes.string,
  select: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      name: PropTypes.string,
      component: PropTypes.element,
      description: PropTypes.element,
    }),
  ),
  listAlignment: PropTypes.string,
  onChange: PropTypes.func,
  disabled: PropTypes.bool,
  direction: PropTypes.string,
};

RadioButton.defaultProps = {
  className: '',
  listAlignment: 'flex-col',
  select: undefined,
  onChange: () => {},
  disabled: false,
  direction: 'row',
};

export default withDisplayName(RadioButton, 'RadioButton');
