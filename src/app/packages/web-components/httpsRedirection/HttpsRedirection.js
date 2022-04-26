import React, { Component } from 'react';
import PropTypes from 'prop-types';

class HttpsRedirection extends Component {
  componentWillMount() {
    // Force redirect to https if not on local development
    if (!this.props.disableHttps) {
      if (window.location.protocol !== 'https:') {
        window.location.href = window.location.href.replace('http://', 'https://');
      }
    }
  }

  render() {
    return <div>{this.props.children}</div>;
  }
}

HttpsRedirection.propTypes = {
  children: PropTypes.node.isRequired,
  disableHttps: PropTypes.bool,
};

HttpsRedirection.defaultProps = {
  disableHttps: false,
};

export default HttpsRedirection;
