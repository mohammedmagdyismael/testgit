import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Select from '../select/Select';
import Text from '../text/Text';
import withDisplayName from '../WithDisplayName';

const HOURS_IN_DAY = 24;
const MINUTES_IN_HOUR = 60;
const MINUTES_IN_DAY = HOURS_IN_DAY * MINUTES_IN_HOUR;

class TimeInput extends Component {
  static propTypes = {
    timeDuration: PropTypes.number,
    timeFormat: PropTypes.oneOf([12, 24]),
    startTime: PropTypes.string,
    language: PropTypes.string,
  };

  static defaultProps = {
    timeDuration: 30,
    timeFormat: 12,
    startTime: '00:00',
    language: 'en',
  };

  state = {
    timeSlots: [],
    timeDuration: undefined,
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.timeDuration !== prevState.timeDuration) {
      return {
        timeDuration: nextProps.timeDuration,
      };
    }

    return null;
  }

  componentDidMount() {
    this.generateTimeSlots(this.props.timeDuration, this.props.timeFormat, this.props.startTime);
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.timeDuration !== this.state.timeDuration) {
      this.generateTimeSlots(this.props.timeDuration, this.props.timeFormat, this.props.startTime);
    }
  }

  get24Time = totalMinutes => {
    let hours = Math.floor(totalMinutes / 60);
    let minutes = totalMinutes % 60;
    hours = hours < 10 ? `0${hours}` : hours;
    minutes = minutes < 10 ? `0${minutes}` : minutes;
    return `${hours}:${minutes}:00`;
  };

  getChildRef = () => this.select;

  convertTo12HourFormat = time => {
    let newFormat = time;
    const oldHours = +newFormat.substr(0, 2);
    let newHours = oldHours % 12 || 12;
    newHours = newHours < 10 ? `0${newHours}` : newHours;
    const amOrPm = oldHours < 12 ? ' AM' : ' PM';
    newFormat = newHours + newFormat.substr(2, 3) + amOrPm;
    return newFormat;
  };

  generateTimeSlots = (timeDuration, timeFormat, startTime) => {
    const { language } = this.props;
    const timeSlots = [];
    const startTimeArray = startTime.split(':');
    const startTimeHoursInMinutes = parseInt(startTimeArray[0]) * 60;
    const startTimeTotalMinutes = startTimeHoursInMinutes + parseInt(startTimeArray[1]);

    for (
      let minutes = startTimeTotalMinutes;
      minutes < MINUTES_IN_DAY + startTimeTotalMinutes;
      minutes += timeDuration
    ) {
      let displayMinutes;
      let displayTime;

      // Checking if the minutes is bigger than MINUTES_IN_DAY in a day
      // then subtract MINUTES_IN_DAY from minutes to start from
      if (minutes >= MINUTES_IN_DAY) {
        displayMinutes = minutes - MINUTES_IN_DAY;
      } else {
        displayMinutes = minutes;
      }

      displayTime = this.get24Time(displayMinutes);
      displayTime = displayTime.split(':');
      displayTime = new Date(0, 0, 0, displayTime[0], displayTime[1]);

      if (timeFormat === 24) {
        displayTime = displayTime.toLocaleTimeString(`${language}-Eg`, {
          hour: '2-digit',
          hour12: false,
          minute: '2-digit',
        });
      } else {
        displayTime = displayTime.toLocaleTimeString(`${language}-Eg`, {
          hour: '2-digit',
          hour12: true,
          minute: '2-digit',
        });
      }

      timeSlots.push({
        data: {
          placeholder: displayTime,
          value: this.get24Time(displayMinutes),
          searchable: [displayTime],
        },
        component: <Text>{displayTime}</Text>,
      });
    }

    this.setState({
      timeSlots,
    });
  };

  render() {
    const { timeSlots } = this.state;
    return (
      <Select
        {...this.props}
        items={timeSlots}
        noIcon
        ref={select => {
          this.select = select;
        }}
      />
    );
  }
}

export default withDisplayName(TimeInput, 'TimeInput');
