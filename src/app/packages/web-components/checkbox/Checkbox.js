import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { Flex } from 'grid-styled';

import Text from '../text/Text';
import { FONT_TYPES } from '../base/Typography';
import withDisplayName from '../WithDisplayName';
import './Checkbox.scss';

class Checkbox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isChecked: props.isChecked,
    };
  }

  /**
   * Updates state with received isChecked prop
   * @param {object} nextProps
   */
  componentWillReceiveProps(nextProps) {
    this.setState({ isChecked: nextProps.isChecked });
  }

  /**
   * Handles checkbox click
   */
  onClick = () => {
    const isChecked = !this.state.isChecked;

    this.setState({
      isChecked,
    });

    this.props.onChange(isChecked);
  };

  render() {
    const { textType, textClassName, children, label, htmlFor } = this.props;

    return (
      <span className="checkbox-container">
        <div
          className={classnames('checkbox', {
            'checkbox-checked': this.state.isChecked,
          })}
          onClick={this.onClick}
          onKeyPress={this.onClick}
        />
        {children ? (
          <Flex pl={3}>{children}</Flex>
        ) : (
          <Text
            type={textType}
            className={classnames('checkbox-label', textClassName)}
            onClick={this.onClick}
            onKeyPress={this.onClick}
            htmlFor={htmlFor}
            cursor="pointer"
          >
            {label}
          </Text>
        )}
      </span>
    );
  }
}

Checkbox.propTypes = {
  label: PropTypes.string,
  textType: PropTypes.string,
  textClassName: PropTypes.string,
  isChecked: PropTypes.bool,
  onChange: PropTypes.func,
  htmlFor: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  children: PropTypes.node,
};

Checkbox.defaultProps = {
  label: '',
  textType: FONT_TYPES.BODY,
  textClassName: undefined,
  isChecked: false,
  onChange: () => {},
  htmlFor: '',
  children: undefined,
};

export default withDisplayName(Checkbox, 'Checkbox');
