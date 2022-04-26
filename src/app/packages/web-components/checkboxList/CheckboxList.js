import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ClassNames from 'classnames';
import _ from 'lodash';

import Checkbox from '../checkbox/Checkbox';
import withDisplayName from '../WithDisplayName';
import './CheckboxList.scss';

class CheckboxList extends Component {
  constructor(props) {
    super(props);

    const { items, selectedIds, isAllSelected } = this.props;
    this.state = {
      isAllSelected,
      selectedIds: isAllSelected ? this.getSelectableIds(items) : selectedIds || [],
    };
  }

  /**
   * Updates state isAllSelected and selectedIds values based on received props
   * @param {object} nextProps
   */
  componentWillReceiveProps(nextProps) {
    if (
      !_.isEqual(this.props.items, nextProps.items) ||
      this.props.isAllSelected !== nextProps.isAllSelected
    ) {
      this.setState(state => {
        const nextState = {
          ...state,
        };

        nextState.isAllSelected = nextProps.isAllSelected || state.isAllSelected;
        nextState.selectedIds = nextState.isAllSelected
          ? this.getSelectableIds(nextProps.items)
          : nextProps.selectedIds ||
            state.selectedIds.filter(id => this.getSelectableIds(nextProps.items).includes(id));

        return nextState;
      });
    }
  }

  /**
   * Gets all selectable ids of items
   * @param {array} items
   * @returns {array} selectable ids
   */
  getSelectableIds = items => items.filter(item => !item.isAllCheckbox).map(item => item.id);

  /**
   * Gets selected ids values with updated checkbox value
   * @param {object} changedItem
   * @param {bool} isChecked
   * @returns {array} selected ids
   */
  getSelectedIds = (changedItem, isChecked) => {
    if (changedItem.isAllCheckbox) {
      if (isChecked) {
        return this.getSelectableIds(this.props.items);
      }
      return [];
    }

    if (isChecked) {
      if (this.state.isAllSelected) {
        return [changedItem.id];
      }
      return this.state.selectedIds.concat(changedItem.id);
    }
    return this.state.selectedIds.filter(id => id !== changedItem.id);
  };

  /**
   * Handles checkbox change
   * @param {object} changedItem
   * @param {bool} isChecked
   */
  handleCheckboxChange = (changedItem, isChecked) => {
    const selectableIds = this.getSelectableIds(this.props.items);
    const selectedIds = this.getSelectedIds(changedItem, isChecked);
    const isAllIdsSelected = selectableIds.every(id => selectedIds.includes(id));
    const isAllSelected = changedItem.isAllCheckbox ? isChecked : isAllIdsSelected;

    this.setState(
      {
        isAllSelected,
        selectedIds,
      },
      () => {
        if (this.props.onChange) {
          this.props.onChange(selectedIds);
        }
      },
    );
  };

  render() {
    const { isAllSelected, selectedIds } = this.state;
    const { items, className, renderAsRows, isArabic, isFilterChanged } = this.props;
    let displayedItems;
    if (!isFilterChanged) {
      if (isAllSelected) {
        displayedItems = items.map(item => ({ ...item, isChecked: true }));
      } else {
        displayedItems = items.map(
          item =>
            selectedIds.includes(item.id)
              ? { ...item, isChecked: true }
              : { ...item, isChecked: false },
        );
      }
    } else {
      displayedItems = items.map(item => ({ ...item, isChecked: false }));
    }

    if (this.props.hideNotSelected) {
      displayedItems = displayedItems.filter(item => item.isChecked);
    }
    return (
      <div
        className={ClassNames('checkbox-list-container', className, {
          'checkbox-list--row': renderAsRows,
          'checkbox-list--arabic': isArabic,
        })}
      >
        {displayedItems.map(item => (
          <Checkbox
            key={item.id || item.label}
            label={item.label}
            isChecked={item.isChecked}
            onChange={isChecked => this.handleCheckboxChange(item, isChecked)}
            htmlFor={item.id}
          />
        ))}
      </div>
    );
  }
}

CheckboxList.propTypes = {
  className: PropTypes.string,
  items: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string,
      isChecked: PropTypes.bool,
      id: PropTypes.string,
      isAllCheckbox: PropTypes.bool,
    }),
  ).isRequired,
  selectedIds: PropTypes.arrayOf(PropTypes.string),
  onChange: PropTypes.func,
  hideNotSelected: PropTypes.bool,
  isAllSelected: PropTypes.bool,
  renderAsRows: PropTypes.bool,
  isArabic: PropTypes.bool,
  isFilterChanged: PropTypes.bool,
};

CheckboxList.defaultProps = {
  className: undefined,
  selectedIds: [],
  onChange: () => {},
  hideNotSelected: false,
  isAllSelected: false,
  renderAsRows: false,
  isArabic: false,
  isFilterChanged: false,
};

export default withDisplayName(CheckboxList, 'CheckboxList');
