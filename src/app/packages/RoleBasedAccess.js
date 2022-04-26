import { decodeJwtToken, Cookie } from '@vezeeta/web-utils';

export const USER_ROLES = {
  OWNER: 'Owner',
  DOCTOR: 'Doctor',
  ASSISTANT: 'Assistant',
  SINGLE_DR_APP: 'SINGLE_DR_APP',
};

export const getUserRole = () => {
  if (Cookie.get(Cookie.AUTH_TOKEN)) {
    const userToken = decodeJwtToken(Cookie.get(Cookie.AUTH_TOKEN)).payLoad;
    const userRoles = userToken.role;
    if (userRoles && userRoles.length) {
      // Owner [ENtity Owner]
      // Doctor [Single under entity]
      // Assistant
      // Owner + Doctor [Single Dr APp]

      if (userRoles.includes('Owner') && !userRoles.includes('Doctor')) return USER_ROLES.OWNER;
      if (!userRoles.includes('Owner') && userRoles.includes('Doctor')) return USER_ROLES.DOCTOR;
      if (userRoles.includes('Assistant')) return USER_ROLES.ASSISTANT;
      if (userRoles.includes('Owner') && userRoles.includes('Doctor'))
        return USER_ROLES.SINGLE_DR_APP;
    }
  }
  return '';
};
