export const ACCOUNTS = {
  SET_INFO: 'SET_INFO',
};

export const setInfo = payload => ({
  type: ACCOUNTS.SET_INFO,
  payload,
});
