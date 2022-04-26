import React from 'react';
import PropTypes from 'prop-types';
import Icons from '../../icons';

import IconsStore from '../icon/IconsStore';
import EmptyState from '../emptyState/EmptyState';
import Spinner from '../spinner/Spinner';
import withDisplayName from '../WithDisplayName';
import './Loading.scss';

const refreshPage = () => {
  window.location.reload();
};

const Loading = props => {
  if (props.isLoading) {
    // While our other component is loading...

    if (props.timedOut) {
      // In case we've timed out loading our other component.
      return (
        <EmptyState
          text="Connection timed out.."
          image={`${process.env.REACT_APP_CDN_URL}/assets/secure_server.svg`}
          buttonText="Refresh Page"
          buttonIcon={new IconsStore(Icons).getIcon('refresh')}
          buttonIconWidth={12}
          buttonOnClick={refreshPage}
        />
      );
    } else if (props.pastDelay) {
      // Display a loading screen after a set delay.
      return (
        <div className="global-loading">
          <Spinner />
        </div>
      );
    }
    // Don't flash "Loading..." when we don't need to.
    return null;
  } else if (props.error) {
    // If we aren't loading, maybe
    return (
      <EmptyState
        text="Page failed to load, there was a network error!"
        image={`${process.env.REACT_APP_CDN_URL}/assets/secure_server.svg`}
        buttonText="Refresh Page"
        buttonIcon={new IconsStore(Icons).getIcon('refresh')}
        buttonIconWidth={12}
        buttonOnClick={refreshPage}
      />
    );
  }
  // This case shouldn't happen... but we'll return null anyways.
  return null;
};

Loading.propTypes = {
  isLoading: PropTypes.bool,
  timedOut: PropTypes.bool,
  error: PropTypes.bool,
  pastDelay: PropTypes.bool,
};

Loading.defaultProps = {
  isLoading: false,
  timedOut: false,
  error: false,
  pastDelay: false,
};

export default withDisplayName(Loading, 'Loading');
