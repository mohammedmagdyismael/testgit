import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import styled from 'styled-components';
import { space, width } from 'styled-system';
import Icons from '../../icons';

import Icon from '../icon/Icon';
import IconsStore from '../icon/IconsStore';
import Text from '../text/Text';
import Calendar from '../calendar/Calendar';
import withDisplayName from '../WithDisplayName';
import { FONT_TYPES } from '../base/Typography';
import { COLORS } from '../base/Colors';
import './DateInput.scss';

const DateInputContainer = styled.div`
  ${width};
  ${space};
  ${props => (props.extendInputDate ? props.extendInputDate : '')};
`;

const InputContainerCalendar = styled.div`
  ${props => (props.extendInputContainerCalendar ? props.extendInputContainerCalendar : '')};
`;

class DateInput extends Component {
  constructor(props) {
    super(props);

    this.iconsStore = new IconsStore(Icons);
    this.state = {
      isCalendarOpened: this.props.showCalendar,
      date: this.props.date,
      errorMessage: '',
      iconClassName: undefined,
      isDanger: false,
      enableValidation: true,
    };
  }

  componentDidMount() {
    document.addEventListener('mousedown', this.handleClickOutside);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.date === undefined || nextProps.date === null) {
      if (nextProps.resetOnUndefined) {
        this.resetSelect();
      }
    } else {
      const stateObj = {};
      let check = false;
      if (nextProps.showCalendar === false) {
        stateObj.showCalendar = false;
        check = true;
      }
      if (nextProps.date !== this.props.date) {
        stateObj.date = nextProps.date;
        check = true;
      }
      if (check) {
        this.setState(stateObj);
      }
    }
  }

  componentDidUpdate(_, prevState) {
    if (
      (prevState.showCalendar && !this.state.isCalendarOpened) ||
      this.state.date !== prevState.date
    ) {
      this.validate();
    }
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClickOutside);
  }

  onChange = e => {
    this.setState(
      {
        date: this.props.enableClear && this.state.date ? '' : e.date,
        enableValidation: true,
      },
      () => {
        this.hideCalendar();
        if (this.props.onChange) {
          this.props.onChange({ date: e.date });
        }
      },
    );
  };

  setWrapperRef = node => {
    this.wrapperRef = node;
  };

  toggleCalendar = () => {
    if (!this.props.disabled) {
      if (this.state.isCalendarOpened) {
        this.hideCalendar();
      } else {
        this.showCalendar();
      }
    }
  };

  showCalendar = () => {
    if (!this.props.disabled) {
      this.setState({
        isCalendarOpened: true,
        iconClassName: 'icon--up',
        enableValidation: true,
      });
    }
  };

  hideCalendar = () => {
    if (!this.props.disabled) {
      this.setState({
        isCalendarOpened: false,
        iconClassName: 'icon--down',
        enableValidation: true,
      });
    }
  };

  handleClickOutside = event => {
    const isVisibleScrollBar = window.innerWidth > document.documentElement.clientWidth;
    const isClickOnScrollBar = window.outerWidth - 18 <= event.x;
    if (
      this.wrapperRef &&
      !this.wrapperRef.contains(event.target) &&
      (!isVisibleScrollBar || (isVisibleScrollBar && !isClickOnScrollBar)) &&
      this.state.isCalendarOpened
    ) {
      this.setState({
        isCalendarOpened: false,
        iconClassName: 'icon--down',
        enableValidation: true,
      });
    }
  };

  /**
   * Changes the error message and shows it
   * @param {string} message
   */
  showErrorMessage = message => {
    this.setState({
      errorMessage: message,
      isDanger: true,
      enableValidation: true,
    });
  };

  /**
   * Removes error message
   */
  hideErrorMessage = () => {
    this.setState({
      errorMessage: '',
      isDanger: false,
      enableValidation: true,
    });
  };

  /**
   * Checks if input is valid
   */
  isValid = () => {
    if (this.props.isRequired && this.state.enableValidation) {
      if (this.state.date === '' || this.state.date === undefined) {
        return false;
      }
    }

    return true;
  };

  /**
   * Validates input
   */
  validate = () => {
    if (!this.isValid()) {
      this.showErrorMessage(
        this.props.isArabic
          ? `${this.props.placeholder} مطلوب`
          : `${this.props.placeholder} required`,
      );
    } else {
      this.hideErrorMessage();
    }
  };

  focus = () => {
    this.showCalendar();
  };

  resetSelect = () => {
    this.setState({
      date: '',
      enableValidation: false,
    });
  };
  localizeDate = (date, locale) => {
    if (date !== '' && date !== undefined) {
      let dateArr;
      if (date.includes('/')) {
        dateArr = `${date}`.split('/');
      } else if (date.includes('-')) {
        dateArr = `${date}`.split('-');
      }
      const selectedYear = dateArr[2];
      const selectedMonth = dateArr[0] - 1;
      const selectedDay = dateArr[1];
      const localized = new Date(selectedYear, selectedMonth, selectedDay).toLocaleDateString(
        locale,
        {
          year: 'numeric',
          month: 'numeric',
          day: 'numeric',
        },
      );
      return date !== undefined ? localized : '';
    }
    return date;
  };

  render() {
    const {
      onChange,
      isArabic,
      reverse,
      className,
      extendInputDate,
      extendInputContainerCalendar,
      ...filteredProps
    } = this.props;
    const calendarInputContainerClasses = classnames('input-date-container', className, {
      'input-date-container--disabled': this.props.disabled,
    });
    const calendarContainerClasses = classnames(
      'calendar',
      {
        'calendar-show': this.state.isCalendarOpened,
      },
      {
        'calendar-hide': !this.state.isCalendarOpened,
      },
    );

    return (
      <DateInputContainer
        innerRef={div => {
          this.wrapperRef = div;
        }}
        className={calendarInputContainerClasses}
        {...filteredProps}
        extendInputDate={extendInputDate}
      >
        <InputContainerCalendar
          className={classnames('input-container--calendar', {
            'input-container--active': this.state.isCalendarOpened,
            'input-date-container--danger': this.state.isDanger,
          })}
          tabIndex="0"
          onClick={this.toggleCalendar}
          onKeyDown={() => {}}
          extendInputContainerCalendar={extendInputContainerCalendar}
        >
          <input
            className={isArabic || reverse ? 'input-value-reverse' : 'input-value'}
            placeholder={this.props.placeholder}
            value={this.localizeDate(this.state.date, isArabic ? 'ar-EG' : 'en-US')}
            readOnly="readonly"
            autoComplete="off"
          />

          <div className={classnames('icon-container', this.state.iconClassName)}>
            <Icon icon={this.iconsStore.getIcon('dropdown')} width={18} color={COLORS.TEXT} />
          </div>
        </InputContainerCalendar>
        <Text tag="span" type={FONT_TYPES.CAPTION} className="date-input-error">
          {this.state.errorMessage}
        </Text>
        <div className={calendarContainerClasses}>
          <Calendar
            onChange={this.onChange}
            date={this.state.date}
            type="single"
            minDate={this.props.minDate}
            maxDate={this.props.maxDate}
            dateFormat={this.props.dateFormat}
            id={this.props.id}
            isArabic={isArabic}
          />
        </div>
      </DateInputContainer>
    );
  }
}

DateInput.propTypes = {
  className: PropTypes.string,
  id: PropTypes.string,
  placeholder: PropTypes.string, // show, if label empty
  onChange: PropTypes.func,
  date: PropTypes.string,
  minDate: PropTypes.string,
  maxDate: PropTypes.string,
  dateFormat: PropTypes.oneOf(['yyyy-mm-dd', 'mm/dd/yyyy', '']),
  showCalendar: PropTypes.bool, // false: hide Calendar
  enableClear: PropTypes.bool, // false: each click- input, true: first click- input, second- clear
  isRequired: PropTypes.bool,
  disabled: PropTypes.bool,
  resetOnUndefined: PropTypes.bool,
  isArabic: PropTypes.bool,
  reverse: PropTypes.bool,
};

DateInput.defaultProps = {
  enableClear: false,
  resetOnUndefined: false,
  className: undefined,
  id: undefined,
  placeholder: undefined,
  onChange: () => {},
  date: undefined,
  minDate: undefined,
  maxDate: undefined,
  dateFormat: 'mm/dd/yyyy',
  showCalendar: false,
  isRequired: false,
  disabled: false,
  isArabic: false,
  reverse: false,
};

export default withDisplayName(DateInput, 'DateInput');
