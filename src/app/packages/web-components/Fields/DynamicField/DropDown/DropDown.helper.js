import React from 'react';

import {
  ListItem,
  ItemLabel,
  ItemDescription,
  ItemContentContainer,
  CheckBox,
} from './DropDown.style';

export const dropDownListToggler = (optionsList, listId) => {
  if (optionsList && optionsList.length) {
    const list = document.getElementById(listId);
    if (list.style.display === 'none') {
      list.style.display = 'block';
    } else {
      list.style.display = 'none';
    }
  }
};

export const dropDownListTogglerBySearchOptions = (optionsList, listId) => {
  if (optionsList && optionsList.length) {
    const list = document.getElementById(listId);
    if (list.style.display === 'none') {
      list.style.display = 'block';
    }
  }
};

export const renderSelectedOptions = (selectedOptionsList, isMultipleSelection) => {
  if (selectedOptionsList.length) {
    if (isMultipleSelection) {
      const firstTwoItems = selectedOptionsList.slice(0, 3);
      let composedValue = '';
      firstTwoItems.forEach(item => {
        if (!composedValue) {
          composedValue = item.fieldValue;
        } else {
          composedValue += `, ${item.fieldValue}`;
        }
      });
      composedValue += selectedOptionsList.length > 3 ? ` +${selectedOptionsList.length - 3}` : '';
      return composedValue;
    }
    return selectedOptionsList[0].fieldValue;
  }
};

export const renderDropDownList = (
  optionsList,
  isMultipleSelection,
  callback,
  extendedStyle,
  language,
) => {
  let mappedOptions = [];

  if (optionsList && optionsList.length) {
    mappedOptions = optionsList.map((option, index) => (
      <ListItem
        key={option.key}
        extendDropDownListItem={extendedStyle.extendDropDownListItem}
        onClick={() => {
          callback(option, index);
        }}
        isMultipleSelection={isMultipleSelection}
      >
        <ItemContentContainer>
          {isMultipleSelection && <CheckBox type="checkbox" checked={option.isChecked} />}
          <div style={{ margin: '0px 10px', display: 'flex', flexDirection: 'column' }}>
            <ItemLabel>{option.fieldValue}</ItemLabel>
            {option.description && (
              <ItemDescription language={language}>{option.description}</ItemDescription>
            )}
          </div>
        </ItemContentContainer>
      </ListItem>
    ));
  }

  return mappedOptions;
};
