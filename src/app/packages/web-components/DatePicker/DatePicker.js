/* eslint-disable prettier/prettier */
import React from 'react';
import PropTypes from 'prop-types';
import DatePicker from 'react-date-picker';
import './DatePicker.css';

import {
  PlaceholderContainer,
  PlaceholderTitle,
  Container,
  IsRequiredNote,
} from './DatePicker.styles';

const DatePickerComponent = ({
  onchangeDate,
  value,
  locale,
  isDisabled,
  language,
  placeholder,
  isValid,
  isRequired,
}) => (
  <Container isValid={isValid}>
    <div style={{ position: 'relative' }}>
      <PlaceholderContainer isValid={isValid} isRtl={language === 'ar'} isDisabled={isDisabled}>
        <div>
          <PlaceholderTitle isEmpty={!value}>
            {placeholder} 
            {isRequired && <IsRequiredNote>*</IsRequiredNote>}
          </PlaceholderTitle>
          {value &&
              <p>
                {
                  new Date(value).toLocaleDateString(`${language}-EG`, {
                    month: 'long',
                    day: '2-digit',
                    year: 'numeric',
                  })
                }
              </p>
          }
        </div>
      </PlaceholderContainer>
      <DatePicker
        clearIcon={null}
        onChange={e => onchangeDate(e)}
        value={value}
        locale={locale}
        disabled={isDisabled}
        language={language}
      />
    </div>
  </Container>
);


DatePickerComponent.propTypes = {
  onchangeDate: PropTypes.func,
  value: PropTypes.instanceOf(Date),
  locale: PropTypes.string,
  isDisabled: PropTypes.bool,
  language: PropTypes.string,
  placeholder: PropTypes.string,
  isValid: PropTypes.bool,
  isRequired: PropTypes.bool,
};

export default DatePickerComponent;
