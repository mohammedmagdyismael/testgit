import React from 'react';
import Icon from '../icon/Icon';
import IconsStore from './IconsStore';
import {
  ListItem,
  ItemLabel,
  ItemDescription,
  ItemContentContainer,
  CheckBox,
  ItemImage,
  AddItemIconContainer,
  AddItemIconWrapper,
} from './DropDown.style';

export const dropDownListToggler = (optionsList, componentName) => {
  if (optionsList && optionsList.length) {
    const list = document.getElementById(`dropdown-list-${componentName}`);
    if (list.style.display === 'none') {
      list.style.display = 'block';
      if (document.getElementById(`dropdown-list-items-${componentName}`))
        document.getElementById(`dropdown-list-items-${componentName}`).focus();
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
  componentName,
  language,
) => {
  let mappedOptions = [];

  if (optionsList && optionsList.length) {
    mappedOptions = optionsList.map(option => (
      <ListItem
        extendDropDownListItem={extendedStyle.extendDropDownListItem}
        /* onClick={() => {
          if (option.onClickItemAction) {
            option.onClickItemAction();
            dropDownListToggler(optionsList, `dropdown-list-${componentName}`);
          } else {
            callback(option);
          }
        }} */
        onClick={() => {
          callback(option);
        }}
        isMultipleSelection={isMultipleSelection}
      >
        <ItemImage src={option.itemImage} />
        <ItemContentContainer>
          {isMultipleSelection && <CheckBox type="checkbox" checked={option.isChecked} />}
          <div style={{ margin: '0px 10px', display: 'flex', flexDirection: 'column' }}>
            <ItemLabel>{option.fieldValue}</ItemLabel>
            {option.description && (
              <ItemDescription language={language}>{option.description}</ItemDescription>
            )}
          </div>
        </ItemContentContainer>
        <AddItemIconContainer
          onClick={() => {
            callback(option);
          }}
        >
          <AddItemIconWrapper>
            <Icon className="icon" icon={IconsStore.getIcon('plus')} width={14} color="#0070CD" />
          </AddItemIconWrapper>
        </AddItemIconContainer>
      </ListItem>
    ));
  }

  return mappedOptions;
};
