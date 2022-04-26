/* eslint-disable camelcase */
import mixpanel from 'mixpanel-browser';

//* *********************************************//
//* *******************Raygun*******************//
//* ********************************************//
export const integrateRaygun = user => {
  const { rg4js, enableRaygun } = window;

  if (
    rg4js &&
    typeof rg4js === 'function' &&
    enableRaygun &&
    process.env.REACT_APP_CONFIG_ENV === 'production'
  ) {
    rg4js('apiKey', process.env.REACT_APP_RAYGUN_API_KEY);
    rg4js('enableCrashReporting', true);
    // rg4js('enablePulse', false); // Enables Real User Monitoring
    rg4js('setUser', {
      identifier: user.EntityKey,
      isAnonymous: false,
      email: user.EmailAddress,
      firstName: user.EntityName,
      fullName: `${user.FirstName} ${user.LastName}`,
    });
    rg4js('options', {
      allowInsecureSubmissions: false,
    });
  }
};

//* *********************************************//
//* **************Salesforce chat***************//
//* ********************************************//
const localizedButtonIDChat = {
  1: process.env.REACT_APP_CHAT_BUTTON_ID_EG,
  4: process.env.REACT_APP_CHAT_BUTTON_ID_SA,
};

const localizedDeploymentId = {
  1: process.env.REACT_APP_DEPLOYMENT_ID_EG,
  4: process.env.REACT_APP_DEPLOYMENT_ID_SA,
};

const localizedEswLiveAgentDevName = {
  1: process.env.REACT_APP_ESWLIVE_AGENT_DEV_NAME_EG,
  4: process.env.REACT_APP_ESWLIVE_AGENT_DEV_NAME_SA,
};

const localizedDeploymentName = {
  1: process.env.REACT_APP_DEPLOYMENT_NAME_EG,
  4: process.env.REACT_APP_DEPLOYMENT_NAME_SA,
};

const MIXPANEL_KEY = process.env.REACT_APP_MIXPANEL_KEY;

export const integrateSalesforce = (user, language) => {
  const { embedded_svc } = window;

  if (embedded_svc) {
    embedded_svc.settings.extraPrechatFormDetails = [
      {
        label: 'Account Key',
        value: user.EntityKey,
        displayToAgent: true,
      },
    ];
    embedded_svc.settings.storageDomain = process.env.REACT_APP_TOKEN_DOMAIN;
    embedded_svc.settings.loadingText = language === 'en' ? 'Loading' : 'تحميل';
    embedded_svc.settings.language = language;
    embedded_svc.settings.defaultMinimizedText =
      language === 'en' ? 'Chat with an expert' : 'تحدث معنا للمساعدة';
    embedded_svc.settings.disabledMinimizedText =
      language === 'en' ? 'Agent Offline' : 'المحادثة غير متوفرة حاليًا';
    window.localizedButtonId = localizedButtonIDChat[user.CountryId];
    window.localizedDeploymentId = localizedDeploymentId[user.CountryId];
    window.localizedEswLiveAgentDevName = localizedEswLiveAgentDevName[user.CountryId];
    window.localizedDeploymentName = localizedDeploymentName[user.CountryId];
    window.enableChat =
      window && window.localizedButtonId && window.countriesSupportChat.includes(user.CountryId);
  }
};

//* *********************************************//
//* *****************Mixpanel*******************//
//* ********************************************//

export const initSetUpMixpanel = (user, language) => {
  mixpanel.init(MIXPANEL_KEY);

  mixpanel.register({
    'Account Name': user.EntityName,
    'Account Email': user.EmailAddress,
    'Account Key': user.EntityKey,
    Language: language,
    distinct_id: user.EntityKey,
  });

  mixpanel.identify(user.EntityKey);

  mixpanel.people.set({
    $first_name: user.FirstNameEnglish,
    $last_name: user.LastNameEnglish,
    $distinct_id: user.EntityKey,
    $phone: user.PhoneNumber,
    $email: user.EmailAddress,
    $name: user.EntityName,
    'Default Language': language,
  });
};
