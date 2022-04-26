import { Component } from 'react';
import PropTypes from 'prop-types';

class AppError extends Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
  };

  // eslint-disable-next-line no-unused-vars
  componentDidCatch = (error, _errorInfo) => {
    const { rg4js, enableRaygun } = window;
    if (process.env.REACT_APP_CONFIG_ENV === 'production' && enableRaygun) {
      if (rg4js && typeof rg4js === 'function') {
        rg4js('send', { error });
      }
    }
  };

  render() {
    return this.props.children;
  }
}

export default AppError;
