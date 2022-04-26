import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Flex } from 'grid-styled';

import Text from '../text/Text';
import withDisplayName from '../WithDisplayName';

class Option extends Component {
  componentWillReceiveProps(nextProps) {
    if (nextProps.defaultChecked !== undefined && this.input) {
      this.input.checked = nextProps.defaultChecked;
    }
  }

  /**
   * Updates parent value
   */
  updateValue = () => {
    this.input.checked = true;
    this.props.updateValue(this.props.value);
  };

  render() {
    const { disable, value, name, defaultChecked, component, description, direction } = this.props;
    const optionClassName = disable ? 'option--disabled' : '';
    return (
      <Flex flexDirection={direction}>
        <li className={optionClassName}>
          <Flex flexDirection="row">
            <input
              autoComplete="off"
              ref={input => {
                this.input = input;
              }}
              type="radio"
              id={value}
              name={name}
              onClick={this.updateValue}
              defaultChecked={defaultChecked}
              disabled={disable}
            />
            <div className="check" onClick={this.updateValue} onKeyDown={() => {}}>
              <div className="inside" />
            </div>
            <Text htmlFor={value} {...component.props}>
              {component.props.children}
            </Text>
          </Flex>
        </li>
        {description && <Text {...description.props}>{description.props.children}</Text>}
      </Flex>
    );
  }
}

Option.propTypes = {
  component: PropTypes.element.isRequired,
  description: PropTypes.element.isRequired,
  checked: PropTypes.bool,
  defaultChecked: PropTypes.bool.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  updateValue: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  disable: PropTypes.bool.isRequired,
  direction: PropTypes.string.isRequired,
};

Option.defaultProps = {
  checked: false,
};

export default withDisplayName(Option, 'Option');
