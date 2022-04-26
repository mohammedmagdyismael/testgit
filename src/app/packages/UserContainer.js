import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { AuthContainer, signOut } from '@vezeeta/web-sso';
import mixpanel from 'mixpanel-browser';
import { MixpanelProvider } from 'react-mixpanel';
import { getUser, setUserDefaultLangauge } from '@vezeeta/enterprise-store/lib/actions/user';
import { loadCountry, loadCountryList } from '@vezeeta/enterprise-store/lib/actions/country';
import {
  loadAccountPaymentDetails,
  loadAccountCreditCards,
  PAYMENT,
  STATUS,
} from '@vezeeta/enterprise-store/lib/actions/payment';
import { decodeJwtToken, encrypt, Cookie } from '@vezeeta/web-utils';
import { HttpsRedirection } from '@vezeeta/web-components';
import {
  initSetUpMixpanel,
  AppError,
  integrateRaygun,
  integrateSalesforce,
} from './app/Integrations';
import EnterpriseLayout from './enterprise-layout/src/EnterpriseLayout';
import ClinicsContainer from './enterprise-layout/src/ClinicsContainer';

import { shouldEnableAddCreditCardInfo } from './enterprise-layout/src/UserContainer.helper';

class UserContainer extends Component {
  constructor(props) {
    super(props);

    if (Cookie.get(Cookie.AUTH_TOKEN)) {
      this.accountKey = decodeJwtToken(Cookie.get(Cookie.AUTH_TOKEN)).payLoad.unique_name;
    }

    let language;
    if (Cookie.get(Cookie.LANGUAGE)) {
      language = Cookie.get(Cookie.LANGUAGE);
    } else {
      Cookie.set(Cookie.LANGUAGE, 'en');
      language = 'en';
    }

    this.state = {
      user: undefined,
      userLoaded: false,
      userFirstName: undefined,
      userLastName: undefined,
      userEmail: undefined,
      userProfilePhotoPath: undefined,
      enableAddCreditCardOption: false,
      paymentTypeKey: undefined,
      entityKey: undefined,
      paymentDetailsState: undefined,
      cardsState: undefined,
      language,
    };
  }

  componentDidMount = () => {
    this.authTokenChecker = setInterval(() => this.pollAuthTokenChecker(), 3000);
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    if (prevState.user !== nextProps.user && nextProps.userLoaded !== prevState.userLoaded) {
      initSetUpMixpanel(nextProps.user, prevState.language);
      integrateRaygun(nextProps.user);
      integrateSalesforce(nextProps.user, prevState.language);

      if (nextProps.user && nextProps.user.DefaultLanguageId) {
        const language = nextProps.user.DefaultLanguageId === 1 ? 'en' : 'ar';
        if (prevState.language !== language) {
          Cookie.set(Cookie.LANGUAGE, `${nextProps.user.DefaultLanguageId === 1 ? 'en' : 'ar'}`);
          window.location.reload();
        }
      }
      return {
        user: nextProps.user,
        userLoaded: nextProps.userLoaded,
        userFirstName: nextProps.user.FirstName,
        userLastName: nextProps.user.LastName,
        userEmail: nextProps.user.EmailAddress,
        userProfilePhotoPath: nextProps.user.ProfilePhotoPath,
        userCountryIsoCode: nextProps.user.CountryIsoCode,
        entityKey: nextProps.user.EntityKey,
      };
    }

    if (
      prevState.paymentDetailsState !== nextProps.payment.paymentDetailsState &&
      nextProps.payment.paymentDetailsState === PAYMENT.GET_PAYMENT_DETAILS.SUCCEEDED &&
      nextProps.payment.paymentDetails
    ) {
      return {
        paymentTypeKey: nextProps.payment.paymentDetails.PaymentTypeKey,
        enableAddCreditCardOption: shouldEnableAddCreditCardInfo(
          nextProps.payment.cards,
          nextProps.payment.paymentDetails.PaymentMethodKey,
        ),
        paymentDetailsState: nextProps.payment.paymentDetailsState,
      };
    }

    if (
      prevState.cardsState !== nextProps.payment.cardsState &&
      nextProps.payment.cardsState === PAYMENT.GET_CREDIT_CARDS.SUCCEEDED &&
      nextProps.payment.cards &&
      nextProps.payment.paymentDetails
    ) {
      return {
        enableAddCreditCardOption: shouldEnableAddCreditCardInfo(
          nextProps.payment.cards,
          nextProps.payment.paymentDetails.PaymentMethodKey,
        ),
        cardsState: nextProps.payment.cardsState,
      };
    }

    return null;
  }

  componentWillUnmount() {
    this.authTokenChecker = null;
  }

  onLanguageChange = language => {
    Cookie.set(
      Cookie.CULTURE,
      `${language === 'en' ? 'ar' : 'en'}-${this.props.user.CountryIsoCode}`,
    );
    mixpanel.track('Changed Language', {
      'Changed to': language === 'en' ? 'ar' : 'en',
    });
    this.props.setUserDefaultLangauge(language === 'en' ? 2 : 1, true);
  };

  onAuthenticate = () => {
    if (!this.props.user) {
      const { language } = this.state;
      this.props.loadCountryList();
      this.props.loadCountry();
      this.props.getUser(language);
      this.props.loadAccountPaymentDetails(this.accountKey);
      this.props.loadAccountCreditCards(this.accountKey, true, STATUS.ACTIVE);
    }
  };

  pollAuthTokenChecker = () => {
    if (this.accountKey) {
      if (Cookie.get(Cookie.AUTH_TOKEN)) {
        if (this.accountKey !== decodeJwtToken(Cookie.get(Cookie.AUTH_TOKEN)).payLoad.unique_name) {
          window.location.reload();
        }
      } else {
        window.location.reload();
      }
    }
  };

  goToCartInAccountsWeb = () => {
    const { entityKey, paymentTypeKey } = this.state;
    const cookieExpiryTime = parseInt(process.env.REACT_APP_TEMP_COOKIE_EXPIRY_MINUTES) / 60 / 24;
    const cookieExpiryTimeInMillisecond = cookieExpiryTime * 24 * 3600 * 1000;
    // Adding cookies for accounts.vezeeta.com
    Cookie.set(Cookie.ACCOUNT_KEY, encrypt(this.accountKey), { expires: cookieExpiryTime });
    Cookie.set(Cookie.CLINIC_KEY, encrypt(entityKey), { expires: cookieExpiryTime });
    Cookie.set(Cookie.START_ROUTE, '/cart', { expires: cookieExpiryTime });
    Cookie.set(Cookie.END_ROUTE, '/confirmation', { expires: cookieExpiryTime });
    Cookie.set(Cookie.RETURN_URL, window.location.href, { expires: cookieExpiryTime });
    Cookie.set(Cookie.PAGE_TITLE, 'Add credit card info', { expires: cookieExpiryTime });
    Cookie.set(Cookie.PAYMENT_TYPE_KEY, encrypt(paymentTypeKey), {
      expires: cookieExpiryTime,
    });
    Cookie.set(Cookie.EXPIRY_TIME, Date.now() + cookieExpiryTimeInMillisecond, {
      expires: cookieExpiryTime,
    });

    window.location.replace(
      `${
        process.env.REACT_APP_ACCOUNTS_URL
      }/en-${this.state.userCountryIsoCode.toLowerCase()}/signup/cart`,
    );
  };

  goToProducts = () => {
    const { entityKey } = this.state;
    const cookieExpiryTime = 10 / 60 / 24;
    const cookieExpiryTimeInMilliseconds = cookieExpiryTime * 24 * 3600 * 1000;
    // Adding cookies for accounts.vezeeta.com
    Cookie.set(Cookie.ACCOUNT_KEY, encrypt(this.accountKey), { expires: cookieExpiryTime });
    Cookie.set(Cookie.CLINIC_KEY, encrypt(entityKey), { expires: cookieExpiryTime });
    Cookie.set(Cookie.START_ROUTE, '/products', { expires: cookieExpiryTime });
    Cookie.set(Cookie.END_ROUTE, '/cart', { expires: cookieExpiryTime });
    Cookie.set(Cookie.RETURN_URL, window.location.href, { expires: cookieExpiryTime });
    Cookie.set(Cookie.PAGE_TITLE, 'Add Branches/Rooms | Vezeeta', { expires: cookieExpiryTime });
    Cookie.set(Cookie.EXPIRY_TIME, Date.now() + cookieExpiryTimeInMilliseconds, {
      expires: cookieExpiryTime,
    });

    window.location.replace(
      // $FlowIgnore: suppressing this error
      `${process.env.REACT_APP_ACCOUNTS_URL.toString()}/en-${this.state.userCountryIsoCode.toLowerCase()}/signup/products/book`,
    );
  };

  render() {
    const { supportSingleLanguage, user, extendContentContainer } = this.props;
    return (
      <MixpanelProvider mixpanel={mixpanel}>
        <HttpsRedirection disableHttps={process.env.REACT_APP_FORCE_HTTPS === 'false'}>
          <AuthContainer onAuthenticate={this.onAuthenticate}>
            <ClinicsContainer language={this.state.language}>
              <EnterpriseLayout
                loading={!this.props.userLoaded}
                doctorName={`${this.state.userFirstName} ${this.state.userLastName}`}
                doctorEmail={this.state.userEmail}
                doctorPhoto={this.state.userProfilePhotoPath}
                tabs={this.props.headerTabs}
                title={this.props.title}
                breadcrumbProps={this.props.breadcrumbProps}
                activeTab={this.props.activeTab}
                enablePayLater={!this.state.enableAddCreditCardOption}
                payLater={this.goToCartInAccountsWeb}
                manageBranches={this.goToProducts}
                signOut={signOut}
                env={process.env.REACT_APP_CONFIG_ENV}
                cdnUrl={process.env.REACT_APP_CDN_URL}
                language={this.state.language}
                onLanguageChange={this.onLanguageChange}
                mixpanel={mixpanel}
                supportSingleLanguage={supportSingleLanguage}
                user={user}
                extendContentContainer={extendContentContainer}
              >
                <AppError>
                  <div className="App">{this.props.children}</div>
                </AppError>
              </EnterpriseLayout>
            </ClinicsContainer>
          </AuthContainer>
        </HttpsRedirection>
      </MixpanelProvider>
    );
  }
}

UserContainer.propTypes = {
  user: PropTypes.object,
  userLoaded: PropTypes.bool,
  payment: PropTypes.object,
  getUser: PropTypes.func.isRequired,
  loadCountry: PropTypes.func.isRequired,
  loadCountryList: PropTypes.func.isRequired,
  loadAccountPaymentDetails: PropTypes.func.isRequired,
  loadAccountCreditCards: PropTypes.func.isRequired,
  children: PropTypes.object.isRequired,
  headerTabs: PropTypes.array,
  activeTab: PropTypes.string,
  title: PropTypes.string,
  breadcrumbProps: PropTypes.object,
  setUserDefaultLangauge: PropTypes.func.isRequired,
  supportSingleLanguage: PropTypes.bool.isRequired,
  extendContentContainer: PropTypes.oneOfType([PropTypes.string, PropTypes.array]).isRequired,
};

UserContainer.defaultProps = {
  user: undefined,
  userLoaded: false,
  payment: undefined,
  headerTabs: [],
  activeTab: undefined,
  title: undefined,
  breadcrumbProps: undefined,
};

const mapStateToProps = state => ({
  userLoaded: state.user.loaded,
  user: state.user.user,
  countryLoaded: state.country.loaded,
  payment: state.payment,
});

const mapDispatchToProps = dispatch => ({
  getUser: language => dispatch(getUser(language)),
  signOut: () => dispatch(signOut()),
  loadCountryList: () => dispatch(loadCountryList()),
  loadCountry: () => dispatch(loadCountry()),
  setUserDefaultLangauge: (languageId, reload) =>
    dispatch(setUserDefaultLangauge(languageId, reload)),
  loadAccountPaymentDetails: accountKey => dispatch(loadAccountPaymentDetails(accountKey)),
  loadAccountCreditCards: (accountKey, isActive, status) =>
    dispatch(loadAccountCreditCards(accountKey, isActive, status)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(UserContainer);
