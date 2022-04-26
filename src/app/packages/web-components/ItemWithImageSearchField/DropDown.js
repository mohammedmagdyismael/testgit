/* eslint-disable react/require-default-props */
/* eslint-disable react/forbid-prop-types */
import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import Spinner from '../spinner/Spinner';
import Icon from '../icon/Icon';
import IconsStore from './IconsStore';

import {
  FieldContainer,
  FieldLabel,
  ListContainer,
  SearchInput,
  LabelValueContainer,
  IsRequiredNote,
  DisableOverLay,
} from './DropDown.style';

import { dropDownListToggler, renderDropDownList } from './DropDown.helper';

const DropDown = ({ ...props }) => {
  const {
    placeHolder,
    fieldLabel,
    fieldValue,
    searchable,
    multipleSelection,
    options,
    extendDropDownStyle,
    icon,
    iconSize,
    onChanges,
    onSearch,
    isRequired,
    extendDropDownList,
    extendDropDownListItem,
    onClickIconAction,
    componentName,
    isDisabled,
    language,
    isLoading,
    isValid,
    onTypingDelay,
  } = props;
  const [selectedOptions, setSelectOption] = useState([]); // for selected items
  const [typedValue, setTypedValue] = useState('');
  const timer = useRef(null);

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

  const onItemSelect = option => {
    setSelectOption([option]);
    if (onChanges) {
      onChanges(option);
    }
    dropDownListToggler(options, componentName);
  };

  useEffect(
    () => {
      if (fieldValue !== undefined && options && options.length) {
        const filteredOption = options.filter(option => option.value === fieldValue);
        if (filteredOption && filteredOption[0]) {
          setTypedValue(filteredOption[0].fieldValue);
          setSelectOption(filteredOption);
        }
      }
    },
    [fieldValue, options],
  );

  const onSearchInList = value => {
    setTypedValue(value);
    const list = document.getElementById(`dropdown-list-${componentName}`);
    if (list && list.style.display === 'none') {
      list.style.display = 'block';
    }
    clearTimeout(timer.current);
    timer.current = setTimeout(() => {
      if (onSearch && value && value.length > 2) {
        onSearch(value);
      }
    }, onTypingDelay);
  };

  const isInputFieldRendered = searchable;

  const onFieldClick = () => {
    if (searchable) {
      if (document.getElementById(`input-container-${componentName}`)) {
        document.getElementById(`input-container-${componentName}`).focus();
      }
    }
    toggleDropDowns();
    dropDownListToggler(options, componentName);
  };

  return (
    <div style={{ position: 'relative' }} className={`dropdown dropdown-${componentName}`}>
      <DisableOverLay isDisabled={isDisabled} />
      <FieldContainer isValid={isValid} isDimmed={false} extendDropDownStyle={extendDropDownStyle}>
        {icon && (
          <div style={{ display: 'inline-flex', alignItems: 'center' }}>
            {isLoading ? (
              <Spinner radius={20} color="#58595b" />
            ) : (
              <Icon
                className="icon"
                onClick={() => {
                  if (onClickIconAction) {
                    onClickIconAction();
                  } else {
                    onFieldClick();
                  }
                }}
                icon={IconsStore.getIcon(icon)}
                width={iconSize}
              />
            )}
          </div>
        )}
        <LabelValueContainer
          style={{ width: '97%' }}
          onClick={() => {
            if ((options && options.length) || searchable) onFieldClick();
          }}
        >
          {fieldLabel && (
            <FieldLabel isValueSelected={searchable || selectedOptions.length}>
              {fieldLabel}
              {isRequired && <IsRequiredNote>*</IsRequiredNote>}
            </FieldLabel>
          )}
          {isInputFieldRendered && (
            <SearchInput
              autoComplete="off"
              placeholder={placeHolder}
              id={`input-container-${componentName}`}
              type="text"
              value={typedValue}
              onChange={e => {
                onSearchInList(e.target.value);
              }}
              extendDropDownStyle={extendDropDownStyle}
            />
          )}
        </LabelValueContainer>
      </FieldContainer>
      <div id={`dropdown-list-${componentName}`} style={{ display: 'none', position: 'relative' }}>
        <ListContainer
          extendDropDownList={extendDropDownList}
          id={`dropdown-list-items-${componentName}`}
        >
          {renderDropDownList(
            options,
            multipleSelection,
            onItemSelect,
            {
              extendDropDownListItem,
            },
            componentName,
            language,
          )}
        </ListContainer>
      </div>
    </div>
  );
};

DropDown.propTypes = {
  fieldValue: PropTypes.string,
  fieldLabel: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired,
  searchable: PropTypes.bool,
  selectFirst: PropTypes.bool,
  multipleSelection: PropTypes.bool,
  options: PropTypes.array,
  onChanges: PropTypes.func.isRequired,
  iconSize: PropTypes.number.isRequired,
  extendDropDownStyle: PropTypes.string,
  onSearch: PropTypes.func,
  isHorizontallySorted: PropTypes.bool,
  isRequired: PropTypes.bool,
  extendDropDownList: PropTypes.array,
  extendDropDownListItem: PropTypes.string,
  onClickIconAction: PropTypes.func,
  componentName: PropTypes.string.isRequired,
  isDisabled: PropTypes.bool,
  isLoading: PropTypes.bool,
  language: PropTypes.string,
  isValid: PropTypes.bool,
  onTypingDelay: PropTypes.number,
  placeHolder: PropTypes.string,
};
export default DropDown;
