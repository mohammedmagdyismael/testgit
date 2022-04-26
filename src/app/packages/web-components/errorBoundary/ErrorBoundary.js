import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Error from './Error';

class ErrorBoundary extends Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
  };

  state = {
    hasError: false,
  };

  componentDidCatch = () => {
    if (process.env.NODE_ENV !== 'development') {
      this.setState({
        hasError: true,
      });
    }
  };

  render() {
    const { hasError } = this.state;
    return hasError ? <Error {...this.props} /> : this.props.children;
  }
}

export default ErrorBoundary;
