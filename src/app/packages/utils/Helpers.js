const isSameDay = (d1, d2) =>
  d1.getDate() === d2.getDate() &&
  d1.getMonth() === d2.getMonth() &&
  d1.getFullYear() === d2.getFullYear();

export const doubleDigit = num => (num.toString().length === 1 ? `0${num}` : num);

export const isToday = date => isSameDay(date, new Date());

export const isTomorrow = date => {
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  return isSameDay(date, tomorrow);
};

export const getMonthFromDate = (date, shortMonthName = false) => {
  const month = [];
  month[0] = shortMonthName ? 'Jan' : 'January';
  month[1] = shortMonthName ? 'Feb' : 'February';
  month[2] = shortMonthName ? 'Mar' : 'March';
  month[3] = shortMonthName ? 'Apr' : 'April';
  month[4] = 'May';
  month[5] = 'June';
  month[6] = 'July';
  month[7] = shortMonthName ? 'Aug' : 'August';
  month[8] = shortMonthName ? 'Sept' : 'September';
  month[9] = shortMonthName ? 'Oct' : 'October';
  month[10] = shortMonthName ? 'Nov' : 'November';
  month[11] = shortMonthName ? 'Dec' : 'December';
  return month[date.getMonth()];
};

export const getDayOfWeekFromDate = (date, localization) => {
  const daysOfWeek = {
    0: localization.Sunday,
    1: localization.Monday,
    2: localization.Tuesday,
    3: localization.Wednesday,
    4: localization.Thursday,
    5: localization.Friday,
    6: localization.Saturday,
  };
  return daysOfWeek[date.getDay()];
};

export const getDayOfMonthFromDate = date => doubleDigit(date.getDate());

export const getYearFromDate = date => date.getFullYear();

export const getDateRangeLabel = (startDate, endDate) =>
  `${startDate.getDate()} ${getMonthFromDate(
    startDate,
    true,
  )} - ${endDate.getDate()} ${getMonthFromDate(endDate, true)}`;

export const toIndiaDigits = number => {
  const id = ['٠', '١', '٢', '٣', '٤', '٥', '٦', '٧', '٨', '٩'];
  return number.replace(/[0-9]/g, w => id[+w]);
};

export const toEnglishNumbers = number => {
  const notIndNum = /^([^\u0660-\u0669]*)$/;
  if (!notIndNum.test(number.toString())) {
    return number.replace(/[٠١٢٣٤٥٦٧٨٩]/g, d => d.charCodeAt(0) - 1632);
  }
  return number;
};

export const getAge = (birthDate, localization, language) => {
  if (birthDate) {
    const today = new Date();
    const birthDateObject = new Date(birthDate);
    let years = today.getFullYear() - birthDateObject.getFullYear();
    let months = today.getMonth() - birthDateObject.getMonth();

    if (months < 0 || (months === 0 && today.getDate() < birthDate.getDate)) {
      years -= 1;
    }

    let prefix;

    if (language === 'ar') {
      if (years === 0) {
        prefix = months > 1 && months < 11 ? localization.months : localization.month;
      } else {
        prefix = years > 1 && years < 11 ? localization.years : localization.year;
      }
      months = toIndiaDigits(months.toString());
      years = toIndiaDigits(years.toString());
    } else if (years === 0) {
      prefix = months > 1 ? localization.months : localization.month;
    } else {
      prefix = years > 1 ? localization.years : localization.year;
    }

    return {
      age: years === 0 ? months : years,
      prefix,
    };
  }
  return {
    age: undefined,
    prefix: undefined,
  };
};

export const getDateAfterGivenDays = daysCount => {
  const oneDayTime = 24 * 60 * 60 * 1000;
  const givenDaysTime = daysCount * oneDayTime;

  return new Date(new Date().getTime() + givenDaysTime);
};

export const getFormattedDate = date => {
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const year = date.getFullYear();

  return `${month}/${day}/${year}`;
};

export const getGenderText = patientGender => {
  let patientGenderText = '';
  if (patientGender === true || ''.concat(patientGender).toLowerCase() === 'true') {
    patientGenderText = 'Male';
  } else if (patientGender === false || ''.concat(patientGender).toLowerCase() === 'false') {
    patientGenderText = 'Female';
  }
  return patientGenderText;
};

export const getFirstObjByProp = (arrOfObj, prop, searchPropValue) => {
  const arrLen = arrOfObj.length;
  for (let i = 0; i < arrLen; i += 1) {
    if (arrOfObj[i][prop] === searchPropValue) {
      return { ...arrOfObj[i] };
    }
  }
  return false;
};

export const getMMDDYYYY = dateIn => {
  const date = new Date(dateIn);
  if (dateIn) {
    const year = date.getFullYear(date).toString();
    const month = (date.getMonth(date) + 1).toString();
    const day = date.getDate(date).toString();
    const dateOut = ''.concat(month, '/', day, '/', year);
    return dateOut;
  }
  return '';
};

export const getNumsObjInArrByProp = (arrOfObj, prop, searchPropValue) => {
  const arrLen = arrOfObj.length;
  const res = [];
  for (let i = 0; i < arrLen; i += 1) {
    if (arrOfObj[i][prop] === searchPropValue) {
      res.push(i);
    }
  }
  return res;
};

export const get12HoursFormat = time => {
  const timeArray = time.split(':');
  const timeZone = timeArray[0] < 12 ? 'AM' : 'PM';
  let hours = timeArray[0] < 12 ? timeArray[0] : timeArray[0] - 12;
  hours = doubleDigit(hours);
  hours = parseInt(hours) === 0 ? 12 : hours;

  let minutes = timeArray[1];
  minutes = doubleDigit(minutes);
  const timeLabel = `${hours}:${minutes} ${timeZone}`;

  return timeLabel;
};

export const get24HoursFormat = totalMinutes => {
  let hours = Math.floor(totalMinutes / 60);
  let minutes = totalMinutes % 60;
  hours = doubleDigit(hours);
  minutes = doubleDigit(minutes);
  return `${hours}:${minutes}:00`;
};

const HOURS_IN_DAY = 24;
const MINUTES_IN_HOUR = 60;
const MINUTES_IN_DAY = HOURS_IN_DAY * MINUTES_IN_HOUR;

export const generateTimeSlots = (shifts, _12Key, _24Key) => {
  if (shifts) {
    const timeSlots = [];
    shifts.map(shift => {
      for (let minutes = shift.start; minutes < shift.end; minutes += shift.duration) {
        let timeIn24HoursFormat;

        if (minutes >= MINUTES_IN_DAY) {
          timeIn24HoursFormat = get24HoursFormat(minutes - MINUTES_IN_DAY);
        } else {
          timeIn24HoursFormat = get24HoursFormat(minutes);
        }

        timeSlots.push({
          [_12Key]: get12HoursFormat(timeIn24HoursFormat),
          [_24Key]: timeIn24HoursFormat,
        });
      }
      return undefined;
    });
    return timeSlots;
  }
  return undefined;
};

export const convertTimeToMinutes = time => {
  const timeArray = time.split(':');
  const minutes = parseInt(timeArray[0]) * 60 + parseInt(timeArray[1]);
  return minutes;
};

export const getTimeOptionsInWorkingHours = (date, workingHours, scheduleType, localization) => {
  const dayOfWeek = getDayOfWeekFromDate(new Date(date), localization);
  const dayWorkingHours = workingHours.find(day => day.DayOfWeek === dayOfWeek);

  if (dayWorkingHours) {
    let timeSlots = [];
    if (scheduleType === 1) {
      // In case of on appointment date
      const timeShifts = [];
      let earliestShiftStart = dayWorkingHours.DayShifts.length > 0 ? MINUTES_IN_DAY : 0;
      let latestShiftEnd = 0;
      let previousShiftEnd = 0;

      dayWorkingHours.DayShifts.forEach(shift => {
        const shiftStartInMinutes = convertTimeToMinutes(shift.StartTime);
        let shiftEndInMinutes = convertTimeToMinutes(shift.EndTime);

        if (shiftStartInMinutes < earliestShiftStart) {
          earliestShiftStart = shiftStartInMinutes;
        }

        // If the end time === 12:00:00 we will replace the 0 minutes with MINUTES_IN_DAY
        if (shiftEndInMinutes === 0) {
          shiftEndInMinutes = MINUTES_IN_DAY;
        }

        if (shiftEndInMinutes > latestShiftEnd) {
          latestShiftEnd = shiftEndInMinutes;
        }

        // Render time slots between two shifts
        if (previousShiftEnd !== 0 && previousShiftEnd !== shiftStartInMinutes) {
          timeShifts.push({
            start: previousShiftEnd,
            end: shiftStartInMinutes,
            duration: 15,
          });
        }

        timeShifts.push({
          start: shiftStartInMinutes,
          end: shiftEndInMinutes,
          duration: shift.SlotDuration,
        });

        previousShiftEnd = shiftEndInMinutes;
      });

      // Generate the reminder of the day
      timeShifts.push({
        start: latestShiftEnd,
        end: earliestShiftStart + MINUTES_IN_DAY,
        duration: 15,
      });
      timeSlots = generateTimeSlots(timeShifts, 'label', 'value');
    } else if (scheduleType === 2) {
      // In case of FIFO doctor
      dayWorkingHours.DayShifts.forEach(shift => {
        const shiftStartInMinutes = convertTimeToMinutes(shift.StartTime);
        const shiftEndInMinutes = convertTimeToMinutes(shift.EndTime);
        const shiftStart = get24HoursFormat(shiftStartInMinutes);
        const shiftEnd = get24HoursFormat(shiftEndInMinutes);

        const label = `${get12HoursFormat(shiftStart)} - ${get12HoursFormat(shiftEnd)}`;
        timeSlots.push({
          label,
          value: {
            shiftStart,
            shiftEnd,
          },
        });
      });
    }
    return timeSlots;
  }
  return undefined;
};

export const getLocalizedNumber = (number, countryCode, language) => {
  if (number) {
    let localizedNumber;
    if (language === 'en') {
      localizedNumber = `${countryCode || ''} ${number || ''}`;
    } else {
      localizedNumber = `${toIndiaDigits(number) || ''} ${(countryCode &&
        toIndiaDigits(countryCode.replace('+', ''))) ||
        ''}${countryCode && '+'}`;
    }
    return localizedNumber;
  }
  return null;
};
