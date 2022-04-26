// @flow

/**
 * Gets the number of days between two dates
 * @param {Date} dateOne
 * @param {Date} dateTwo
 * @returns {number}
 */
export const getNumberOfDaysBetweenTwoDates = (dateOne: Date, dateTwo: Date): number =>
  Math.round((dateTwo - dateOne) / (1000 * 60 * 60 * 24));

/**
 * Add number of days to a date
 * @param {Date} timeStamp
 * @param {number} daysCount
 * @returns {Date}
 */
export const addDaysToDate = (timeStamp: Date, daysCount: number): Date => {
  const date = new Date(timeStamp * 1000);
  date.setDate(date.getDate() + daysCount);

  return date;
};
