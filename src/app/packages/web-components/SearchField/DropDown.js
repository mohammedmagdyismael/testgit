/* eslint-disable react/forbid-prop-types */
import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import Spinner from '../spinner/Spinner';
import Icon from '../icon/Icon';
import IconsStore from './IconsStore';

import {
  FieldContainer,
  FieldLabel,
  FieldValue,
  ListContainer,
  SearchInput,
  LabelValueContainer,
  IsRequiredNote,
  DisableOverLay,
} from './DropDown.style';

import {
  dropDownListToggler,
  renderDropDownList,
  renderSelectedOptions,
  // dropDownListTogglerBySearchOptions,
} from './DropDown.helper';

const DropDown = ({ ...props }) => {
  const {
    fieldLabel,
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
    onResetSearch,
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
    if (searchable) setTypedValue(option.fieldValue);
    setSelectOption([option]);
    if (onChanges) {
      onChanges(option);
    }
    dropDownListToggler(options, `dropdown-list-${componentName}`);
  };

  const onSearchInList = value => {
    setTypedValue(value);
    const list = document.getElementById(`dropdown-list-${componentName}`);
    if (list && list.style.display === 'none') {
      list.style.display = 'block';
    }

    clearTimeout(timer.current);
    if (onSearch && value && value.length > 0) {
      timer.current = setTimeout(() => {
        onSearch(value);
      }, 500);
    } else if (onResetSearch) onResetSearch();
  };

  const isFieldValueRendered = !searchable && selectedOptions.length > 0;
  const isInputFieldRendered = searchable;

  const onFieldClick = () => {
    if (searchable) {
      if (document.getElementById(`input-container-${componentName}`)) {
        document.getElementById(`input-container-${componentName}`).focus();
      }
    }
    toggleDropDowns();
    dropDownListToggler(options, `dropdown-list-${componentName}`);
  };

  return (
    <div style={{ position: 'relative' }} className={`dropdown dropdown-${componentName}`}>
      <DisableOverLay isDisabled={isDisabled} />
      <FieldContainer isValid={isValid} isDimmed={false} extendDropDownStyle={extendDropDownStyle}>
        <LabelValueContainer
          style={{ width: '90%' }}
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
          {isFieldValueRendered && (
            <FieldValue>{renderSelectedOptions(selectedOptions, multipleSelection)}</FieldValue>
          )}
          {isInputFieldRendered && (
            <SearchInput
              autoComplete="off"
              id={`input-container-${componentName}`}
              type="text"
              value={typedValue}
              onChange={e => {
                onSearchInList(e.target.value);
              }}
            />
          )}
        </LabelValueContainer>
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
        {!icon && (
          <div style={{ display: 'inline-flex', alignItems: 'center' }}>
            {isLoading ? <Spinner radius={20} color="#58595b" /> : ''}
          </div>
        )}
      </FieldContainer>
      <div id={`dropdown-list-${componentName}`} style={{ display: 'none', position: 'relative' }}>
        <ListContainer extendDropDownList={extendDropDownList}>
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
  onResetSearch: PropTypes.func,
};
export default DropDown;
