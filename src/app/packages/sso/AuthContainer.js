// @flow

import React, { Component } from 'react';
import { Cookie } from '@vezeeta/web-utils';
import Splash from '@vezeeta/web-components/lib/splash/Splash';

import authenticate from './Authenticate';
import signOut from './SignOut';

// $FlowFixMe
const logoUrl = `${process.env.REACT_APP_CDN_URL}/assets/logo-blue.png`;

type Props = {
  children: any,
  onAuthenticate: Function,
};

type State = {
  isLoading: boolean,
};

class AuthContainer extends Component<Props, State> {

  state = {
    isLoading: true,
  };

  componentDidMount() {
    const isAuthenticated = Cookie.get(Cookie.AUTH_TOKEN);

    if (isAuthenticated) {
      if (!sessionStorage.getItem('session')) {
        authenticate(this.renderChildren);
      } else {
        this.renderChildren();
      }
    } else {
      signOut();
    }
  }

  renderChildren = () => {
    const { onAuthenticate } = this.props;
    onAuthenticate();
    this.setState({
      isLoading: false,
    });
  };

  render() {
    const { children } = this.props;
    const { isLoading } = this.state;

    if (isLoading) {
      return <Splash logoUrl={logoUrl} />;
    }

    return children;
  }
}

export default AuthContainer;
