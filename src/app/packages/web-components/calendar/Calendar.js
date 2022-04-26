import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ClassNames from 'classnames';
import Icons from '../../icons';

import Icon from '../icon/Icon';
import IconsStore from '../icon/IconsStore';
import Select from '../select/Select';
import Text from '../text/Text';
import Colors from '../shared/Colors';
import withDisplayName from '../WithDisplayName';
import './Calendar.scss';

const ARROW_WIDTH = 8;

class Calendar extends Component {
  constructor(props) {
    super(props);
    this.state = this.getStartState(this.props);
    this.iconsStore = new IconsStore(Icons);
  }

  /**
   * Change state, if props change
   * @param {string} this.props.minDate
   * @param {string} nextProps.minDate
   * @param {string} this.props.maxDate
   * @param {string} nextProps.maxDate
   * @param {string} this.props.type
   * @param {string} this.props.date
   * @param {string} this.props.startDate
   * @param {string} nextProps.startDate
   * @param {string} this.props.endDate
   * @param {string} nextProps.endDate
   */
  componentWillReceiveProps(nextProps) {
    const arr = [];
    if (this.props.minDate !== nextProps.minDate)
      arr.push({ key: 'minDate', val: nextProps.minDate });
    if (this.props.maxDate !== nextProps.maxDate)
      arr.push({ key: 'maxDate', val: nextProps.maxDate });
    if (this.props.type === 'single') {
      if (this.props.date !== nextProps.date) arr.push({ key: 'date', val: nextProps.date });
    } else {
      if (this.props.startDate !== nextProps.startDate)
        arr.push({ key: 'startDate', val: nextProps.startDate });
      if (this.props.endDate !== nextProps.endDate)
        arr.push({ key: 'endDate', val: nextProps.endDate });
    }
    const arrLength = arr.length;
    if (arrLength > 0) {
      const stateObj = {};
      for (let i = 0; i < arrLength; i += 1) {
        const { key } = arr[i];
        let { val } = arr[i];
        if (this.checkMMDDYYYY(val)) {
          val = this.transformMMDDYYYYtoYYYYMMDD(val);
        }
        if (this.checkYYYYMMDD(val) || val === '') {
          stateObj[key] = val;
        }
      }
      this.setState(stateObj);
    }
  }

  /**
   * event onClick Right Arrow
   */
  onClickRightArrowCalendar = () => {
    const { currentMonthNum } = this.state;
    let year = +this.state.currentYear;
    const maxYear = new Date(this.props.maxDate).getFullYear();
    let month = +currentMonthNum + 1;

    if (currentMonthNum === 12) {
      month = 1;
      year += 1;
    }

    this.setState({
      currentMonthNum: +month,
      currentMonthName: this.props.isArabic
        ? this.getMonthArabicNames()[month - 1]
        : this.getMonthNames()[month - 1],
      currentYear: +year,
      disableNextMonthButton: year === maxYear && month === 12,
      disablePreviousMonthButton: false,
    });
  };

  /**
   * event onClick Left Arrow
   */
  onClickLeftArrowCalendar = () => {
    const { currentMonthNum } = this.state;
    let year = +this.state.currentYear;
    const minYear = new Date(this.props.minDate).getFullYear();
    let month = +currentMonthNum - 1;
    if (currentMonthNum === 1) {
      month = 12;
      year -= 1;
    }
    this.setState({
      currentMonthNum: +month,
      currentMonthName: this.props.isArabic
        ? this.getMonthArabicNames()[month - 1]
        : this.getMonthNames()[month - 1],
      currentYear: +year,
      disableNextMonthButton: false,
      disablePreviousMonthButton: year === minYear && month === 1,
    });
  };

  /**
   * event onClick Calendar Body, check id cell
   * @param {event} e
   */
  onClickCalendar = e => {
    const fullId = e.target.id;
    const id = fullId.substr(this.props.id.length);
    if (this.checkYYYYMMDD(id)) {
      const { dateFormat, err, minDate, maxDate } = this.state;
      if (this.props.type === 'single') {
        if (this.compareDate(minDate, id) && this.compareDate(id, maxDate)) {
          const date = id;
          this.setState({
            date,
          });
          const dateOut = date === '' ? '' : this.transformDate(date, dateFormat);
          if (this.props.onChange) {
            this.props.onChange({ date: dateOut, err });
          }
        } else if (!this.compareDate(minDate, id)) {
          this.switchErrorPopUp(
            this.props.isArabic
              ? this.state.errMessageLessThanMinDateArabic.concat(
                this.transformYYYYMMDDtoMMDDYYYY(this.state.minDate, this.props.isArabic), // eslint-disable-line
              ) // eslint-disable-line
              : this.state.errMassageLessThenMinDate.concat(
                this.transformYYYYMMDDtoMMDDYYYY(this.state.minDate), // eslint-disable-line
              ), // eslint-disable-line
          );
        } else if (!this.compareDate(id, maxDate)) {
          this.switchErrorPopUp(
            this.props.isArabic
              ? this.state.errMessageMorethanMaxDateArabic.concat(
                  this.transformYYYYMMDDtoMMDDYYYY(this.state.maxDate, this.props.isArabic), // eslint-disable-line
                ) // eslint-disable-line
              : this.state.errMassageMoreThenMxaDate.concat(
                  this.transformYYYYMMDDtoMMDDYYYY(this.state.maxDate), // eslint-disable-line
                ), // eslint-disable-line
          );
        }
      } else {
        let { startDate, endDate } = this.state;
        if (endDate === '') {
          if (startDate === '') {
            if (this.compareDate(minDate, id) && this.compareDate(id, maxDate)) {
              startDate = id;
              this.setState({
                startDate,
              });
              const dateOut = !startDate ? '' : this.transformDate(startDate, dateFormat);
              if (this.props.onChange) {
                this.props.onChange({ startDate: dateOut, err });
              }
            }
          } else if (this.compareDate(startDate, id) && this.compareDate(id, maxDate)) {
            endDate = id;
            this.setState({
              endDate,
            });
            const startDateOut = startDate === '' ? '' : this.transformDate(startDate, dateFormat);
            const endDateOut = endDate === '' ? '' : this.transformDate(endDate, dateFormat);
            if (this.props.onChange) {
              this.props.onChange({ startDate: startDateOut, endDate: endDateOut, err });
            }
          } else if (this.compareDate(minDate, id) && this.compareDate(id, startDate)) {
            endDate = startDate;
            startDate = id;
            this.setState({
              startDate,
              endDate,
            });
            const startDateOut = startDate === '' ? '' : this.transformDate(startDate, dateFormat);
            const endDateOut = endDate === '' ? '' : this.transformDate(endDate, dateFormat);
            if (this.props.onChange) {
              this.props.onChange({ startDate: startDateOut, endDate: endDateOut, err });
            }
          } else if (!this.compareDate(minDate, id)) {
            this.switchErrorPopUp(this.state.errMassageLessThenMinDate.concat(this.state.minDate));
          } else if (!this.compareDate(id, maxDate)) {
            this.switchErrorPopUp(this.state.errMassageMoreThenMxaDate.concat(this.state.maxDate));
          }
        } else if (startDate !== '') {
          startDate = '';
          endDate = '';
          this.setState({
            startDate,
            endDate,
          });
          if (this.props.onChange) {
            this.props.onChange({ startDate: '', endDate: '', err });
          }
        }
      }
    }
  };

  /**
   * event onClick ErrorPopUp - for close
   */
  onClickErrorPopUp = () => {
    this.setState({
      showErrorPopUp: false,
      errPopUp: '',
    });
  };

  /**
   * Change Year
   * @param {event} e
   */
  onChangeTitleYear = year => {
    const currentYear = year;
    const minYear = new Date(this.state.minDate).getFullYear();
    const maxYear = new Date(this.state.maxDate).getFullYear();
    const checkTitleYear = +currentYear >= +minYear && +currentYear <= +maxYear;

    this.setState({
      currentYear: +currentYear,
      checkTitleYear,
      disableNextMonthButton: currentYear === maxYear && this.state.currentMonthNum === 12,
      disablePreviousMonthButton: currentYear === minYear && this.state.currentMonthNum === 1,
    });
  };

  /**
   * get Start State
   * @return {object} state
   */
  getStartState = () => {
    const minDateDefault = '01/01/1900';
    const maxDateDefault = '12/31/2099';
    const now = new Date();
    const err = [];
    const monthNames = this.props.isArabic ? this.getMonthArabicNames() : this.getMonthNames();
    const monthNum = now.getMonth();
    const monthName = monthNames[now.getMonth()];
    const year = now.getFullYear();
    let minDate = this.props.minDate ? this.props.minDate : minDateDefault;
    let maxDate = this.props.maxDate ? this.props.maxDate : maxDateDefault;
    let { dateFormat, date, startDate, endDate } = this.props;
    const dateArr = [minDate, maxDate];
    if (this.props.type === 'single') {
      dateArr.push(date);
    } else {
      dateArr.push(startDate);
      dateArr.push(endDate);
    }
    if (dateFormat === '') {
      dateFormat = this.setDateFormat(dateArr);
    }
    if (minDate !== '' && !this.checkYYYYMMDD(minDate)) {
      if (this.checkMMDDYYYY(minDate)) {
        minDate = this.transformMMDDYYYYtoYYYYMMDD(minDate);
      } else {
        err.push('minDate format != yyyy-mm-dd or mm/dd/yyyy');
        minDate = minDateDefault;
      }
    }
    if (maxDate !== '' && !this.checkYYYYMMDD(maxDate)) {
      if (this.checkMMDDYYYY(maxDate)) {
        maxDate = this.transformMMDDYYYYtoYYYYMMDD(maxDate);
      } else {
        err.push('maxDate format != yyyy-mm-dd or mm/dd/yyyy');
        maxDate = maxDateDefault;
      }
    }
    if (minDate !== '' && maxDate !== '' && !this.compareDate(minDate, maxDate)) {
      maxDate = maxDateDefault >= minDate ? minDateDefault : minDate;
    }
    if (this.props.type === 'single') {
      if (date !== '' && !this.checkYYYYMMDD(date)) {
        if (this.checkMMDDYYYY(date)) {
          date = this.transformMMDDYYYYtoYYYYMMDD(date);
        } else {
          err.push('date format != yyyy-mm-dd or mm/dd/yyyy');
          startDate = '';
        }
      }
    } else {
      if (startDate !== '' && !this.checkYYYYMMDD(startDate)) {
        if (this.checkMMDDYYYY(startDate)) {
          startDate = this.transformMMDDYYYYtoYYYYMMDD(startDate);
        } else {
          err.push('startDate format != yyyy-mm-dd or mm/dd/yyyy');
          startDate = '';
        }
      }
      if (startDate === '') endDate = '';
      if (endDate !== '' && !this.checkYYYYMMDD(endDate)) {
        if (this.checkMMDDYYYY(endDate)) {
          endDate = this.transformMMDDYYYYtoYYYYMMDD(endDate);
        } else {
          err.push('endDate format != yyyy-mm-dd or mm/dd/yyyy');
          endDate = '';
        }
      }
      if (startDate !== '' && endDate !== '' && !this.compareDate(startDate, endDate)) {
        startDate = '';
        endDate = '';
      }
    }

    return {
      now,
      currentMonthNum: monthNum + 1,
      currentMonthName: monthName,
      currentYear: year,
      minDate,
      maxDate,
      date,
      startDate,
      endDate,
      dateFormat,
      err,
      weekDays: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
      weekDaysArabic: ['سبت', 'جمعة', 'خميس', 'أربعاء', 'ثلاثاء', 'إثنين', 'أحد'],
      showErrorPopUp: false,
      errPopUp: '',
      errMassageLessThenMinDate: 'Please select a date starting from ',
      errMessageLessThanMinDateArabic: '  الرجاء اختيار يوم بداية من ',
      errMassageMoreThenMxaDate: 'Please select a date before ',
      errMessageMorethanMaxDateArabic: ' الرجاء اختيار يوم قبل ',
      checkTitleYear: true,
      disableNextMonthButton: false,
      disablePreviousMonthButton: false,
    };
  };

  /**
   * get Month Names Array
   * @return {array}
   */
  getMonthNames = () => [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  getMonthArabicNames = () => [
    'يناير',
    'فبراير',
    'مارس',
    'أبريل',
    'مايو',
    'يونيو',
    'يوليو',
    'اغسطس',
    'سبتمبر',
    'أكتوبر',
    'نوفمبر',
    'ديسمبر',
  ];

  getIconColor = isDisabled => {
    if (isDisabled) {
      return Colors.mediumGrey;
    }
    return Colors.vezeetaBlue;
  };

  /**
   * set Date Format
   * @param {array} dateArr
   * @return {string} dateFormat
   */
  setDateFormat(dateArr) {
    const dateArrLen = dateArr.length;
    let dateFormat = 'mm/dd/yyyy';
    let sumYYYYMMDD = 0;
    for (let i = 0; i < dateArrLen; i += 1) {
      if (dateArr[i] === '' || this.checkYYYYMMDD(dateArr[i])) sumYYYYMMDD += 1;
    }
    if (sumYYYYMMDD === dateArrLen) {
      dateFormat = 'yyyy-mm-dd';
    }
    return dateFormat;
  }

  /**
   * switch on and switch off Error PopUp
   * @param {string} err
   */
  switchErrorPopUp = err => {
    this.setState({
      showErrorPopUp: true,
      errPopUp: err,
    });
    setTimeout(() => {
      this.setState({
        showErrorPopUp: false,
        errPopUp: '',
      });
    }, 6000);
  };

  /**
   * create Day Styles
   * @param {object} obj
   * @return {string} classDiv
   */
  createDayStyles = obj => {
    const { val, now, type, date, startDate, endDate, isArabic } = obj;
    const arr = val.split('-');
    const startDateObj = startDate !== '' ? new Date(startDate) : '';
    const endDateObj = startDate !== '' ? new Date(endDate) : '';
    let classDiv = '';
    if (type === 'single') {
      if (val === date) {
        classDiv += ' calendar-one-date ';
      }
    } else if (startDate !== '') {
      const valDate = new Date(val);
      if (val === startDate && val === endDate) {
        classDiv += ' calendar-one-date ';
      } else if (val === startDate) {
        classDiv += isArabic ? ' calendar-start-date-arabic ' : ' calendar-start-date ';
      } else if (endDate !== '') {
        if (valDate > startDateObj && valDate < endDateObj) {
          classDiv += ' calendar-diapason-date ';
        } else if (val === endDate) {
          classDiv += isArabic ? ' calendar-end-date-arabic ' : ' calendar-end-date ';
        }
      }
    }
    const todayClass =
      +arr[0] === +now.getFullYear() && +arr[1] === now.getMonth() + 1 && +arr[2] === +now.getDate()
        ? 'calendar-today'
        : '';
    classDiv += todayClass;
    // if(isArabic&&todayClass==='') classDiv+='calendar-today'
    return classDiv;
  };

  /**
   * find Days In Month
   * @param {number} month
   * @param {string} year
   * @return {number}
   */
  findDaysInMonth = (month, year) => {
    if (
      month === 'January' ||
      month === 'March' ||
      month === 'May' ||
      month === 'July' ||
      month === 'August' ||
      month === 'October' ||
      month === 'December'
    ) {
      return 31;
    }
    if (
      month === 1 ||
      month === 3 ||
      month === 5 ||
      month === 7 ||
      month === 8 ||
      month === 10 ||
      month === 12
    ) {
      return 31;
    } else if (
      month === 'April' ||
      month === 'June' ||
      month === 'September' ||
      month === 'November'
    ) {
      return 30;
    } else if (month === 4 || month === 6 || month === 9 || month === 11) {
      return 30;
    } else if ((year - 2016) % 4 !== 0) {
      return 28;
    }
    return 29;
  };

  /**
   * check YYYYMMDD
   * @param {string} val
   * @return (bool)
   */
  checkYYYYMMDD(val) {
    const arr = val.split('-');
    if (arr.length === 3) {
      if (!Number.isNaN(+arr[0])) {
        if (+arr[1] >= 1 && +arr[1] <= 12) {
          const daysInMonth = this.findDaysInMonth(+arr[1], +arr[0]);
          if (+arr[2] >= 1 && +arr[2] <= daysInMonth) return true;
        }
      }
    }
    return false;
  }

  /**
   * check MMDDYYYY
   * @param {string} val
   * @return (bool)
   */
  checkMMDDYYYY(val) {
    const arr = val.split('/');
    if (arr.length === 3) {
      if (!Number.isNaN(+arr[2])) {
        if (+arr[0] >= 1 && +arr[0] <= 12) {
          const daysInMonth = this.findDaysInMonth(+arr[0], +arr[2]);
          if (+arr[1] >= 1 && +arr[1] <= daysInMonth) return true;
        }
      }
    }
    return false;
  }

  /**
   * Return date in dateFormat format
   * @param {string} date
   * @param {string} dateFormat
   */
  transformDate(date, dateFormat) {
    switch (dateFormat) {
      case 'mm/dd/yyyy':
        if (this.checkMMDDYYYY(date)) return date;
        if (this.checkYYYYMMDD(date)) return this.transformYYYYMMDDtoMMDDYYYY(date);
        break;
      case 'yyyy-mm-dd':
        if (this.checkYYYYMMDD(date)) return date;
        if (this.checkMMDDYYYY(date)) return this.transformMMDDYYYYtoYYYYMMDD(date);
        break;
      default:
        return false;
    }
  }

  /**
   * transform MMDDYYYY to YYYYMMDD
   * @param {string} mmddyyyy
   */
  transformMMDDYYYYtoYYYYMMDD = mmddyyyy => {
    const arr = mmddyyyy.split('/');
    return arr[2] + '-' + arr[0] + '-' + arr[1]; // eslint-disable-line
  };

  /**
   * ttransform YYYYMMDD to MMDDYYYY
   * @param {string} yyyymmdd
   */
  transformYYYYMMDDtoMMDDYYYY = (yyyymmdd, isArabic) => {
    const arr = yyyymmdd.split('-');
    if(!isArabic || isArabic===undefined) return arr[1] + '/' + arr[2] + '/' + arr[0]; // eslint-disable-line
    return `${this.toIndiaDigits(arr[2])} - ${this.toIndiaDigits(arr[1])} - ${this.toIndiaDigits(
      arr[0],
    )}`;
  };

  /**
   * Compare dates: if startDate <= endDate return true
   * @param {string} startDate
   * @param {string} endDate
   */
  compareDate = (startDate, endDate) => {
    const startDateObj = new Date(startDate);
    const endDateObj = new Date(endDate);
    const startYear = startDateObj.getFullYear();
    const startMonth = startDateObj.getMonth();
    const startDateNum = startDateObj.getDate();
    const startTime = startYear * 365 + startMonth * 30 + startDateNum;
    const endYear = endDateObj.getFullYear();
    const endMonth = endDateObj.getMonth();
    const endDateNum = endDateObj.getDate();
    const endTime = endYear * 365 + endMonth * 30 + endDateNum;
    if (startTime > endTime) return false;
    return true;
  };

  toIndiaDigits = number => {
    const id = ['٠', '١', '٢', '٣', '٤', '٥', '٦', '٧', '٨', '٩'];
    return number.replace(/[0-9]/g, w => id[+w]);
  };

  /**
   * Generate a list of years descending from current year to 1900
   * @returns {array} yearsOptions
   */
  generateYears = () => {
    const startYear = new Date(this.props.minDate).getFullYear();
    const currentYear = new Date(this.props.maxDate).getFullYear();
    const yearsOptions = [];

    for (let counter = currentYear; counter >= startYear; counter -= 1) {
      const year = {
        data: {
          placeholder: this.props.isArabic ? this.toIndiaDigits(`${counter}`) : `${counter}`,
          value: counter,
        },
        component: (
          <Text>{this.props.isArabic ? this.toIndiaDigits(`${counter}`) : `${counter}`}</Text>
        ),
      };
      yearsOptions.push(year);
    }
    return yearsOptions;
  };

  render() {
    const cellNums = 42;
    const {
      now,
      date,
      startDate,
      endDate,
      currentMonthNum,
      currentMonthName,
      currentYear,
      weekDays,
      errPopUp,
      showErrorPopUp,
      checkTitleYear,
      weekDaysArabic,
    } = this.state;
    const { type, isArabic } = this.props;
    const prevMonthAr = [];
    const thisMonthAr = [];
    const nextMonthAr = [];
    const monthDays = this.findDaysInMonth(currentMonthNum, currentYear);
    const thisMonthDate = new Date(`${currentYear}-${currentMonthNum}`);
    const thisMonth1Day = thisMonthDate.getDay();
    for (let i = 1; i <= monthDays; i += 1) {
      thisMonthAr.push(`${currentYear}-${currentMonthNum}-${i}`);
    }
    let prevMonthNum = currentMonthNum - 1;
    let prevYear = currentYear;
    if (currentMonthNum === 1) {
      prevYear = currentYear - 1;
      prevMonthNum = 12;
    }
    const prevMonthDays = this.findDaysInMonth(prevMonthNum, prevYear);
    const prevMonthShowDays = thisMonth1Day;
    for (let i = prevMonthDays - prevMonthShowDays + 1; i <= prevMonthDays; i += 1) {
      prevMonthAr.push(`${prevYear}-${prevMonthNum}-${i}`);
    }
    const nextMonthNum = (currentMonthNum % 12) + 1;
    const nextYear = currentMonthNum === 12 ? currentYear + 1 : currentYear;
    const nextMonthShowDays = cellNums - prevMonthShowDays - monthDays;
    for (let i = 1; i <= nextMonthShowDays; i += 1) {
      nextMonthAr.push(`${nextYear}-${nextMonthNum}-${i}`);
    }
    let titleYearClass = 'calendar-header-title-year-input ';
    if (!checkTitleYear) {
      titleYearClass += ' year--dange';
    }
    return (
      <div className="calendar-wrapper">
        <div className="calendar-header">
          <div
            className={ClassNames('calendar-arrow', {
              'calendar-arrow--disable': this.state.disablePreviousMonthButton,
              'calendar-arrow--rotated': isArabic,
            })}
            onClick={this.onClickLeftArrowCalendar}
            onKeyDown={() => {}}
          >
            <Icon
              icon={this.iconsStore.getIcon('arrow_left')}
              width={ARROW_WIDTH}
              color={this.getIconColor(this.state.disablePreviousMonthButton)}
            />
          </div>
          <div className="calendar-header-title">
            <div className="calendar-header-title-month">{currentMonthName}</div>
            <div className="calendar-header-title-year">
              <Select
                className={titleYearClass}
                items={this.generateYears()}
                select={currentYear}
                onChange={this.onChangeTitleYear}
                placeholder="Year"
                noSearch
                noIcon
                reverse={isArabic}
              />
            </div>
          </div>
          <div
            className={ClassNames('calendar-arrow', {
              'calendar-arrow--disable': this.state.disableNextMonthButton,
              'calendar-arrow--rotated': isArabic,
            })}
            onClick={this.onClickRightArrowCalendar}
            onKeyDown={() => {}}
          >
            <Icon
              icon={this.iconsStore.getIcon('arrow_right')}
              width={ARROW_WIDTH}
              color={this.getIconColor(this.state.disableNextMonthButton)}
            />
          </div>
        </div>
        <div className="calendar-body" onClick={this.onClickCalendar} onKeyDown={() => {}}>
          <div
            className={showErrorPopUp ? 'calendar-error-popup-show' : 'calendar-error-popup-hide'}
            onClick={this.onClickErrorPopUp}
            onKeyDown={() => {}}
          >
            {errPopUp}
          </div>
          <div className="calendar-week-days">
            {isArabic ? (
              <div className="week-names">
                {weekDaysArabic.map(day => (
                  <div key={day} className="calendar-weekday calendar-weekday-arabic">
                    {day}
                  </div>
                ))}
              </div>
            ) : (
              <div className="week-names">
                {weekDays.map(day => (
                  <div key={day} className="calendar-weekday">
                    {day}
                  </div>
                ))}
              </div>
            )}
          </div>
          {isArabic ? (
            <div className="calendar-days-arabic">
              {prevMonthAr.map(val => {
                const arr = val.split('-');
                let classDiv = 'calendar-day-arabic calendar-opacity-50 ';
                classDiv += this.createDayStyles({
                  val,
                  now,
                  type,
                  date,
                  startDate,
                  endDate,
                  isArabic,
                });
                return (
                  <div key={val} id={this.props.id.concat(val)} className={classDiv}>
                    {this.toIndiaDigits(arr[2])}
                  </div>
                );
              })}
              {thisMonthAr.map(val => {
                const arr = val.split('-');
                let classDiv = 'calendar-day-arabic ';
                classDiv += this.createDayStyles({
                  val,
                  now,
                  type,
                  date,
                  startDate,
                  endDate,
                  isArabic,
                });
                return (
                  <div key={val} id={this.props.id.concat(val)} className={classDiv}>
                    {this.toIndiaDigits(arr[2])}
                  </div>
                );
              })}
              {nextMonthAr.map(val => {
                const arr = val.split('-');
                let classDiv = 'calendar-day-arabic calendar-opacity-50 ';
                classDiv += this.createDayStyles({
                  val,
                  now,
                  type,
                  date,
                  startDate,
                  endDate,
                  isArabic,
                });
                return (
                  <div key={val} id={this.props.id.concat(val)} className={classDiv}>
                    {this.toIndiaDigits(arr[2])}
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="calendar-days">
              {prevMonthAr.map(val => {
                const arr = val.split('-');
                let classDiv = 'calendar-day calendar-opacity-50 ';
                classDiv += this.createDayStyles({
                  val,
                  now,
                  type,
                  date,
                  startDate,
                  endDate,
                });
                return (
                  <div key={val} id={this.props.id.concat(val)} className={classDiv}>
                    {arr[2]}
                  </div>
                );
              })}
              {thisMonthAr.map(val => {
                const arr = val.split('-');
                let classDiv = 'calendar-day ';
                classDiv += this.createDayStyles({
                  val,
                  now,
                  type,
                  date,
                  startDate,
                  endDate,
                });
                return (
                  <div key={val} id={this.props.id.concat(val)} className={classDiv}>
                    {arr[2]}
                  </div>
                );
              })}
              {nextMonthAr.map(val => {
                const arr = val.split('-');
                let classDiv = 'calendar-day calendar-opacity-50 ';
                classDiv += this.createDayStyles({
                  val,
                  now,
                  type,
                  date,
                  startDate,
                  endDate,
                });
                return (
                  <div key={val} id={this.props.id.concat(val)} className={classDiv}>
                    {arr[2]}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    );
  }
}

Calendar.propTypes = {
  onChange: PropTypes.func.isRequired,
  minDate: PropTypes.string,
  maxDate: PropTypes.string,
  date: PropTypes.string,
  startDate: PropTypes.string,
  endDate: PropTypes.string,
  dateFormat: PropTypes.oneOf(['yyyy-mm-dd', 'mm/dd/yyyy', '']),
  type: PropTypes.oneOf(['range', 'single']),
  id: PropTypes.string,
  isArabic: PropTypes.bool,
};

Calendar.defaultProps = {
  minDate: '2015-01-01',
  maxDate: `${new Date().getFullYear() + 1}-12-31`,
  startDate: '', // for type: range
  endDate: '', // for type: range
  date: '', // for type: single
  dateFormat: '',
  type: 'range',
  id: '', // add string id to calendar-cell-id
  isArabic: false,
};

export default withDisplayName(Calendar, 'Calendar');
