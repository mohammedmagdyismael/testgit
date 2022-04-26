import React from 'react';
import PropTypes from 'prop-types';
import ClassNames from 'classnames';

import Image from '../image/Image';
import Text from '../text/Text';
import withDisplayName from '../WithDisplayName';
import './Country.scss';

function Country(props) {
  if (props.loading) {
    return (
      <div className="loading">
        <div className="flag--loading" />
        <div className="name--loading" />
      </div>
    );
  }
  return (
    <div className={ClassNames('country-item', props.className)}>
      <Image
        src={props.flag}
        radius={14}
        alt={props.name}
        name={props.name}
        m={props.language === 'en' ? '0 10px 0 0' : '0 0 0 10px'}
      />
      <Text className="name">{props.name}</Text>
    </div>
  );
}

Country.propTypes = {
  loading: PropTypes.bool,
  className: PropTypes.string,
  flag: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  language: PropTypes.string.isRequired,
};

Country.defaultProps = {
  loading: false,
  className: undefined,
};

export default withDisplayName(Country, 'Country');
