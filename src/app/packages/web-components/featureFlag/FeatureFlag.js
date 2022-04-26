import React from 'react';
import PropTypes from 'prop-types';

import FeatureFlagContainer from './FeatureFlagContainer';

const FeatureFlag = ({ flagKey, children }) => (
  <FeatureFlagContainer.Consumer>
    {flags => flags[flagKey] && children}
  </FeatureFlagContainer.Consumer>
);

FeatureFlag.propTypes = {
  flagKey: PropTypes.string.isRequired,
  children: PropTypes.any, // eslint-disable-line
};

export default FeatureFlag;
