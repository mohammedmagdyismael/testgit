/* eslint-disable react/forbid-prop-types */
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Icon from '../../../icon/Icon';
import IconsStore from '../../IconsStore';
import {
  FieldContainer,
  FieldLabel,
  FieldValue,
  ListContainer,
  LabelValueContainer,
  IsRequiredNote,
  DisableOverLay,
} from './DropdownMultiSelect.style';

import {
  dropDownListToggler,
  renderDropDownList,
  renderSelectedOptions,
} from './DropdownMultiSelect.helper';

const DropDown = ({ ...props }) => {
  const {
    fieldLabel,
    fieldValue,
    options,
    extendDropDownStyle,
    extendFieldText,
    icon,
    iconSize,
    onChanges,
    isRequired,
    extendDropDownList,
    extendDropDownListItem,
    componentName,
    isDisabled,
    isValid,
  } = props;
  const [optionList, setOptionList] = useState([]); // for List View
  const [selectedKeys, setSelectedKeys] = useState([]);

  const toggleDropDowns = () => {
    const dropDowns = document.querySelectorAll('div[class^="dropdown"]');
    const anotherDropDownsLabels = [];

    // Get all onther dropdown other than the current clicked one
    dropDowns.forEach(dropDown => {
      const dropDownClassName = Array.from(dropDown.classList).filter(className =>
        className.includes('dropdown-'),
      );
      if (dropDownClassName[0] !== `dropdown-${componentName}`) {
        anotherDropDownsLabels.push(dropDownClassName[0]);
      }
    });

    // Close opened lists of all onther dropdowns
    anotherDropDownsLabels.forEach(dropDown => {
      const label = dropDown.split('-')[1];
      const list = document.getElementById(`dropdown-list-${label}`);
      if (list) list.style.display = 'none';
    });
  };

  const onItemSelect = (option, index) => {
    const updatedOptionsList = [...optionList];
    updatedOptionsList[index].isChecked = !option.isChecked;
    setOptionList(updatedOptionsList);
    const checkedSelections = [];
    updatedOptionsList.forEach(item => {
      if (item.isChecked) checkedSelections.push(item.value);
    });
    setSelectedKeys(checkedSelections);
    if (onChanges) onChanges(checkedSelections);
  };

  // Load for first time
  useEffect(
    () => {
      const resetedOptionsList = [];
      if (options && options.length && !optionList.length) {
        options.forEach(item => {
          resetedOptionsList.push({
            ...item,
            isChecked: false,
          });
        });
        setOptionList(options);
        setSelectedKeys([]);
        setOptionList(resetedOptionsList);
      }
    },
    [options],
  );

  useEffect(
    () => {
      const resetedOptionsList = [];
      /*  if ((!fieldValue || !fieldValue.length) && selectedKeys.length) {
        options.forEach(item => {
          resetedOptionsList.push({
            ...item,
            isChecked: false,
          });
        });
        setSelectedKeys([]);
      } */
      if (options && options.length) {
        options.forEach(item => {
          if (fieldValue.includes(item.key)) {
            resetedOptionsList.push({
              ...item,
              isChecked: true,
            });
          } else {
            resetedOptionsList.push({
              ...item,
              isChecked: false,
            });
          }
        });
        setSelectedKeys(fieldValue);
        setOptionList(resetedOptionsList);
      }
    },
    [fieldValue],
  );

  const isFieldValueRendered = selectedKeys.length > 0;

  const onFieldClick = () => {
    toggleDropDowns();
    dropDownListToggler(optionList, `dropdown-list-${componentName}`);
  };

  const listListenerHandler = event => {
    const myElementToCheckIfClicksAreInsideOf = document.querySelector(`#${componentName}`);
    if (!myElementToCheckIfClicksAreInsideOf.contains(event.target)) {
      const list = document.getElementById(`dropdown-list-${componentName}`);
      list.style.display = 'none';
    }
  };

  const addListener = () => {
    document.body.addEventListener('click', listListenerHandler, true);
  };

  const removeListener = () => {
    document.body.removeEventListener('click', listListenerHandler, true);
  };

  useEffect(() => {
    addListener();
    return () => {
      removeListener();
    };
  }, []);

  return (
    <div
      style={{ position: 'relative' }}
      className={`dropdown dropdown-${componentName}`}
      id={componentName}
    >
      <DisableOverLay isDisabled={isDisabled} />
      <FieldContainer isValid={isValid} isDimmed={false} extendDropDownStyle={extendDropDownStyle}>
        <LabelValueContainer
          style={{ width: '90%' }}
          onClick={() => {
            if (options && options.length) onFieldClick();
          }}
        >
          {fieldLabel && (
            <FieldLabel isValueSelected={selectedKeys.length}>
              {fieldLabel}
              {isRequired && <IsRequiredNote>*</IsRequiredNote>}
            </FieldLabel>
          )}
          {isFieldValueRendered && (
            <FieldValue extendFieldText={extendFieldText}>
              {renderSelectedOptions(optionList)}
            </FieldValue>
          )}
        </LabelValueContainer>
        {icon && (
          <Icon
            className="icon"
            onClick={() => {
              if (onFieldClick) {
                onFieldClick();
              }
            }}
            icon={IconsStore.getIcon(icon)}
            width={iconSize}
          />
        )}
      </FieldContainer>
      <div id={`dropdown-list-${componentName}`} style={{ display: 'none', position: 'relative' }}>
        <ListContainer extendDropDownList={extendDropDownList}>
          {renderDropDownList(optionList, onItemSelect, {
            extendDropDownListItem,
          })}
        </ListContainer>
      </div>
    </div>
  );
};

DropDown.propTypes = {
  fieldValue: PropTypes.string,
  fieldLabel: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired,
  options: PropTypes.array,
  onChanges: PropTypes.func.isRequired,
  iconSize: PropTypes.number.isRequired,
  extendDropDownStyle: PropTypes.string,
  isRequired: PropTypes.bool,
  extendDropDownList: PropTypes.array,
  extendDropDownListItem: PropTypes.string,
  componentName: PropTypes.string.isRequired,
  isDisabled: PropTypes.bool,
  isValid: PropTypes.bool,
  extendFieldText: PropTypes.string,
};
export default DropDown;
