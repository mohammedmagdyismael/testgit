import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import styled from 'styled-components';
import { width, height } from 'styled-system';

import withDisplayName from '../WithDisplayName';

const SwitchContainer = styled.span`
  align-items: center;
  display: flex;
  justify-content: center;
  padding: 0;
  text-align: center;
`;

const Switch = styled.input`
  display: none;
  line-height: 1.15;
  margin: 0;
  padding: 0;
`;

const SwitchLabel = styled.label`
  transition: all 0.4s ease;
  -moz-user-select: none;
  -ms-user-select: none;
  -webkit-user-select: none;
  background: ${props => (props.isChecked ? '#3e8ddd' : '#e0e0e0')};
  border: 1px solid #f5f5f5;
  border-radius: 2em;
  cursor: pointer;
  display: block;
  outline: 0;
  padding: 2px;
  position: relative;
  user-select: none;
  ${width};
  ${height};

  &::after {
    box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.1), 0 4px 0 rgba(0, 0, 0, 0.08);
    transition: left 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275),
      right 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275), padding 0.3s ease, margin 0.3s ease;
    -webkit-box-sizing: initial;
    background-color: #fff;
    border-radius: 2em;
    box-sizing: initial;
    content: '';
    display: block;
    height: 100%;
    left: ${props => (props.isChecked && !props.reverse ? '50%' : '0')};
    right: ${props => (props.isChecked && props.reverse ? '50%' : '0')};
    position: relative;
    width: 50%;
  }

  &:hover {
    &::after {
      will-change: padding;
    }
  }

  &:active {
    box-shadow: ${props => (props.isChecked ? 'none' : 'inset 0 0 0 2em $light-grey')};

    &::after {
      padding-right: 0.8em;
      margin-left: ${props => (props.isChecked ? '-0.8em' : 'none')};
    }
  }
`;

class SwitchButton extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isChecked: props.isChecked,
    };
  }

  componentDidMount() {
    if (this.props.isChecked) {
      document.getElementById(this.props.htmlFor).checked = true;
    } else {
      document.getElementById(this.props.htmlFor).checked = false;
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.state.isChecked !== nextProps.isChecked) {
      this.setState({ isChecked: nextProps.isChecked });
    }
  }

  onClick = () => {
    const isChecked = !this.state.isChecked;

    this.setState({
      isChecked,
    });

    if (this.props.onChange) {
      this.props.onChange(isChecked);
    }
  };

  getCheckValue = () => this.state.isChecked;

  render() {
    const { isChecked } = this.state;
    const { disable, htmlFor, className, reverse } = this.props;
    return (
      <SwitchContainer
        className={classnames(className, {
          disabled: disable,
        })}
      >
        <Switch
          className={classnames('switch-animation', {
            'switch-checked': isChecked,
          })}
          id={htmlFor}
          type="checkbox"
        />
        <SwitchLabel
          onClick={this.onClick}
          onKeyPress={this.onClick}
          htmlFor={htmlFor}
          isChecked={isChecked}
          width={this.props.width}
          height={this.props.height}
          reverse={reverse}
        />
      </SwitchContainer>
    );
  }
}

SwitchButton.propTypes = {
  className: PropTypes.string,
  isChecked: PropTypes.bool,
  onChange: PropTypes.func,
  htmlFor: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  disable: PropTypes.bool,
  width: PropTypes.string,
  height: PropTypes.string,
  reverse: PropTypes.bool,
};

SwitchButton.defaultProps = {
  className: '',
  isChecked: true,
  disable: false,
  onChange: () => {},
  width: '4em',
  height: '2em',
  reverse: false,
};

export default withDisplayName(SwitchButton, 'SwitchButton');
