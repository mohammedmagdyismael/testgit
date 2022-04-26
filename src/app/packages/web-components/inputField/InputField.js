import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { width, space } from 'styled-system';

import Icon, { iconPropTypes } from '../icon/Icon';
import Text from '../text/Text';
import Colors from '../shared/Colors';
import withDisplayName from '../WithDisplayName';
import { FONT_TYPES } from '../base/Typography';
import './InputField.scss';

const Input = styled.input`
  height: 34px;
  font-size: 13px;
  background-color: transparent;
  border: 0;
  border-bottom: 1px solid #58595b;
  color: #58595b;
  font-weight: 500;
  line-height: normal;
  outline: 0;
  width: 100%;
  padding: ${props =>
    // eslint-disable-next-line no-nested-ternary
    props.reverse
      ? props.noIcon
        ? '8px 0px !important'
        : '8px 25px 8px 2px !important'
      : props.noIcon
        ? '8px 0px !important'
        : '8px 2px 8px 25px !important'};
  ${props => (props.extendInputFieldElement ? props.extendInputFieldElement : '')};
`;

const InputFieldContainer = styled.div`
  ${width};
  ${space};
  ${props => (props.extendInputField ? props.extendInputField : '')};
`;

class InputField extends Component {
  constructor(props) {
    super(props);

    this.state = {
      errorMessage: '',
      isDanger: false,
      iconColor: Colors.defaultGrey,
      value: this.props.value || '',
      dangerLock: false,
    };

    InputField.defaultProps = {
      className: '',
      value: '',
    };
  }

  /**
   * Update value if it was changed
   */
  componentWillReceiveProps(nextProps) {
    if (this.state.value !== nextProps.value) {
      if (nextProps.value === undefined || nextProps.value === null) {
        this.resetSelect();
      } else {
        this.setState({ value: nextProps.value });
        if (this.state.isDanger) {
          this.hideErrorMessage();
        }
      }
    }
  }

  /**
   * Changing the icon color depending on input state
   */
  onFocus = () => {
    if (this.props.center) {
      this.input.removeAttribute('placeholder');
    }

    if (!this.state.isDanger) {
      this.setState({ iconColor: Colors.vezeetaBlue });
    }
  };

  /**
   * Validating the input value and change the icon color to default
   */
  onBlur = () => {
    this.validate();
    if (this.props.onBlur) {
      this.props.onBlur(this.getInputValue());
    }
  };

  /**
   * Update input's value while writing
   * @param {event} e
   */
  onTyping = e => {
    const { value } = e.target;
    this.setState(
      {
        value,
        dangerLock: false,
      },
      () => {
        if (this.props.onChange) {
          this.props.onChange(value);
        }

        if (this.state.value !== '') {
          this.validate();
        }
      },
    );
  };

  /**
   * Returns the current input value
   */
  getInputValue = () => this.input.value;

  /**
   * Change the error message and change the isDanger state to true
   * @param {string} message
   */
  showErrorMessage = (message, dangerLock) => {
    this.setState({
      errorMessage: message,
      isDanger: true,
      iconColor: Colors.vezeetaRed,
      dangerLock: dangerLock || false,
    });
  };

  /**
   * Change the idDanger state to false
   */
  hideErrorMessage = dangerUnlock => {
    if (!this.state.dangerLock || dangerUnlock) {
      this.setState({
        isDanger: false,
        iconColor: this.input === document.activeElement ? Colors.vezeetaBlue : Colors.defaultGrey,
      });
    }
  };

  /**
   * Get regex tests from validation object and run all tests
   * Shows error message if false
   * Update the data in the parent component
   */
  validate = () => {
    let shouldBreak = false;
    const result = true;

    if (!this.props.disabled) {
      if (this.state.value === '' || this.state.value === undefined) {
        if (this.props.isRequired === true) {
          if(this.props.customErrorMassage && this.props.customErrorMassage !== '' )
          {
            this.showErrorMessage(
              this.props.customErrorMassage
            )
          }
          else{
            this.showErrorMessage(
              this.props.isArabic
                ? `${this.props.placeholder} مطلوب`
                : `${this.props.placeholder} required`,
            );
          }
        } else {
          this.hideErrorMessage();
        }
      } else if (this.props.validationChecks) {
        this.props.validationChecks.forEach(check => {
          if (shouldBreak) return;
          const regexResult = check.regex.test(this.getInputValue());

          if (!regexResult) {
            shouldBreak = true;
            this.showErrorMessage(
              this.props.isArabic ? check.errorMessage.ar : check.errorMessage.en,
            );
          } else {
            this.hideErrorMessage();
          }
        });
      } else {
        this.hideErrorMessage();
      }
    }

    return result;
  };

  /**
   * Move focus to the input
   */
  focus = () => {
    this.input.focus();
  };

  /**
   * Return if the component isDanger
   */
  isValid = () => {
    if (this.state.isDanger) {
      return false;
    }

    if (this.props.isRequired) {
      if (this.state.value === '' || this.state.value === undefined) {
        return false;
      }
    }

    return true;
  };

  /**
   * Clears the inputs value
   */
  clear = () => {
    this.setState({
      value: '',
    });
  };

  resetSelect = () => {
    this.clear();
  };

  render() {
    const {
      onChange,
      onBlur,
      className,
      reverse,
      extendInputField,
      extendInputFieldElement,
      ...filteredProps
    } = this.props;
    let dangerClass;
    let icon;
    let noIconClass = '';
    let centerClass = '';
    let helpers;
    let maxLength;
    let disabledClass = '';

    if (!this.state.isDanger) {
      dangerClass = '';
    } else {
      dangerClass = ' input-field--danger';
    }

    let noIcon;
    if (this.props.icon) {
      noIcon = false;
      icon = (
        <div className="icon-container">
          <Icon icon={this.props.icon} width={this.props.iconWidth} color={this.state.iconColor} />
        </div>
      );
    } else {
      noIcon = true;
      icon = <div />;
      noIconClass = ' field-no-icon';
    }

    if (this.props.center) {
      centerClass = ' placeholder--center';
    }

    if (this.props.helperIcon) {
      helpers = (
        <div className="helper-icon">
          <Icon
            icon={this.props.helperIcon}
            width={this.props.helperIconWidth}
            color={this.state.iconColor}
          />
        </div>
      );
    }

    if (this.props.helperImages) {
      helpers = (
        <div className="helper-images">
          {this.props.helperImages.map((helper, index) => (
            <img key={index} src={helper.image} height={helper.height} alt={helper.image} /> // eslint-disable-line
          ))}
        </div>
      );
    }

    if (this.props.maxLength) {
      maxLength = this.props.maxLength; // eslint-disable-line
    } else {
      maxLength = undefined;
    }

    if (this.props.disabled) {
      disabledClass = ' input-field--disabled';
    }

    if (this.props.type === 'hidden') {
      return (
        <Input
          type={this.props.type}
          value={this.state.value}
          id={this.props.inputId}
          autoComplete="off"
          name={this.props.name}
          ref={input => {
            this.input = input;
          }}
          noIcon={noIcon}
          reverse={reverse}
        />
      );
    } else if (this.props.type === 'textarea') {
      return (
        <InputFieldContainer
          className={`input-field ${className}${dangerClass}${disabledClass}`}
          lang={this.props.language}
          {...filteredProps}
        >
          <textarea
            className={`${noIconClass}${centerClass}`}
            type={this.props.type}
            placeholder={`${this.props.placeholder}${this.props.isRequired ? '*' : ''}`}
            onBlur={this.onBlur}
            onFocus={this.onFocus}
            maxLength={maxLength}
            ref={input => {
              this.input = input;
            }}
            value={this.state.value}
            onChange={this.onTyping}
            id={this.props.inputId}
            autoComplete={this.props.autoComplete}
            name={this.props.name}
            disabled={this.props.disabled}
          />
          <Text tag="span" type={FONT_TYPES.CAPTION}>
            {this.state.errorMessage}
          </Text>
        </InputFieldContainer>
      );
    }
    return (
      <InputFieldContainer
        className={`input-field ${className}${dangerClass}${disabledClass}`}
        lang={this.props.language}
        {...filteredProps}
        extendInputField={extendInputField}
      >
        {icon}
        <Input
          className={`${noIconClass}${centerClass}`}
          type={this.props.type}
          placeholder={`${this.props.placeholder}${this.props.isRequired ? '*' : ''}`}
          onBlur={this.onBlur}
          onFocus={this.onFocus}
          maxLength={maxLength}
          innerRef={input => {
            this.input = input;
          }}
          value={this.state.value}
          onChange={this.onTyping}
          id={this.props.inputId}
          autoComplete="off"
          name={this.props.name}
          disabled={this.props.disabled}
          noIcon={noIcon}
          reverse={reverse}
          extendInputFieldElement={extendInputFieldElement}
        />
        {helpers}
        <Text tag="span" type={FONT_TYPES.CAPTION}>
          {this.state.errorMessage}
        </Text>
      </InputFieldContainer>
    );
  }
}

InputField.propTypes = {
  className: PropTypes.string,
  type: PropTypes.string,
  icon: iconPropTypes,
  iconWidth: PropTypes.number,
  center: PropTypes.bool,
  placeholder: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  validationChecks: PropTypes.arrayOf(PropTypes.object),
  language: PropTypes.string,

  onBlur: PropTypes.func,
  onChange: PropTypes.func,
  helperImages: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string, iconPropTypes])),
  helperIcon: iconPropTypes,
  helperIconWidth: PropTypes.number,
  maxLength: PropTypes.number,
  formatOnTyping: PropTypes.func,
  inputId: PropTypes.string,
  autoComplete: PropTypes.string,
  name: PropTypes.string,
  disabled: PropTypes.bool,
  isRequired: PropTypes.bool,
  reverse: PropTypes.bool,
  isArabic: PropTypes.bool,
  customErrorMassage: PropTypes.string,
};

InputField.defaultProps = {
  type: 'text',
  icon: undefined,
  iconWidth: 13,
  center: false,
  className: '',
  value: '',
  validationChecks: [],
  isRequired: true,
  language: 'en',
  onBlur: () => {},
  onChange: () => {},
  helperImages: [],
  helperIcon: {},
  helperIconWidth: 13,
  maxLength: undefined,
  formatOnTyping: () => {},
  inputId: undefined,
  autoComplete: undefined,
  name: undefined,
  disabled: false,
  reverse: false,
  isArabic: false,
  customErrorMassage:''
};

export default withDisplayName(InputField, 'InputField');
