import React from 'react';

import {
  ListItem,
  ItemLabel,
  ItemDescription,
  ItemContentContainer,
  CheckBox,
  OptionItemContent,
} from './DropdownMultiSelect.style';

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

export const renderSelectedOptions = optionList => {
  if (optionList.length) {
    const NUMBER_OF_DISPLAYED_VALUES = 2;
    let composedValue = '';
    let checkedItemsCounter = 0;
    let extraItems = 0;
    optionList.forEach(item => {
      if (item.isChecked) {
        if (checkedItemsCounter < NUMBER_OF_DISPLAYED_VALUES) {
          if (!composedValue) {
            composedValue = item.fieldValue;
          } else {
            composedValue += `, ${item.fieldValue}`;
          }
        } else {
          extraItems += 1;
        }
        checkedItemsCounter += 1;
      }
    });
    return `${composedValue}${extraItems > 0 ? ` +${extraItems}` : ''}`;
  }
};

export const renderDropDownList = (optionsList, callback, extendedStyle) => {
  let mappedOptions = [];

  if (optionsList && optionsList.length) {
    mappedOptions = optionsList.map((option, index) => (
      <ListItem
        key={option.key}
        extendDropDownListItem={extendedStyle.extendDropDownListItem}
        onClick={() => {
          callback(option, index);
        }}
        isMultipleSelection
      >
        <ItemContentContainer>
          <CheckBox type="checkbox" checked={option.isChecked} />
          <OptionItemContent withOutDesciption={!option.description}>
            <ItemLabel>{option.fieldValue}</ItemLabel>
            {option.description && <ItemDescription>{option.description}</ItemDescription>}
          </OptionItemContent>
        </ItemContentContainer>
      </ListItem>
    ));
  }

  return mappedOptions;
};
