/* eslint-disable react/forbid-prop-types */
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import {
  Container,
  RadioButton,
  CheckMark,
  RadioButtonItemDescription,
  RadioButtonItemName,
} from './RadioButtonOptions.style';

const RadioButtonOptions = ({ ...props }) => {
  const [selectedKey, setSelectedKey] = useState(undefined);
  const [renderedOptions, setRenderedOptions] = useState([]);

  const { options, onChange, isHorizonatal } = props;

  const renderOptions = optionslist => {
    if (optionslist && optionslist.length) {
      const renderedOptionsList = optionslist.map(option => (
        <div
          key={option.key}
          style={{ display: 'flex', margin: '0px 5px 10px 5px', height: '37px' }}
        >
          <div>
            <div style={{ transform: 'translateY(-7px)' }}>
              <Container className="container">
                <RadioButton type="radio" checked={selectedKey === option.key} name="radio" />
                <CheckMark
                  isChecked={selectedKey === option.key}
                  className="checkmark"
                  onClick={() => {
                    setSelectedKey(option.key);
                    if (onChange) {
                      onChange(option.key);
                    }
                  }}
                />
              </Container>
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <div>
              <RadioButtonItemName>{option.label}</RadioButtonItemName>
              <RadioButtonItemDescription>{option.desc}</RadioButtonItemDescription>
            </div>
          </div>
        </div>
      ));
      return renderedOptionsList;
    }
  };

  useEffect(
    () => {
      if (options && options.length && !selectedKey) {
        setSelectedKey(options[0].key);
        setRenderedOptions(renderOptions(options));
      }
    },
    [options],
  );

  useEffect(
    () => {
      if (selectedKey) setRenderedOptions(renderOptions(options));
    },
    [selectedKey],
  );

  return (
    <div style={{ display: 'flex', flexDirection: isHorizonatal ? 'row' : 'column' }}>
      {renderedOptions}
    </div>
  );
};

RadioButtonOptions.propTypes = {
  options: PropTypes.array,
  onChange: PropTypes.func,
  isHorizonatal: PropTypes.bool,
};
export default RadioButtonOptions;
