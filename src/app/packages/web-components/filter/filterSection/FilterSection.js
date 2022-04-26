import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Icons from '../../../icons';

import Icon from '../../icon/Icon';
import IconsStore from '../../icon/IconsStore';
import Text from '../../text/Text';
import Select from '../../select/Select';
import CheckboxList from '../../checkboxList/CheckboxList';
import RadioButton from '../../radioButton/RadioButton';
import { FONT_TYPES } from '../../base/Typography';
import Colors from '../../shared/Colors';
import withDisplayName from '../../WithDisplayName';
import './FilterSection.scss';

class FilterSection extends Component {
  static propTypes = {
    placeholder: PropTypes.string,
    name: PropTypes.string,
    filters: PropTypes.array.isRequired, // eslint-disable-line
    type: PropTypes.string.isRequired,
    icon: PropTypes.string.isRequired,
    onChange: PropTypes.func,
    isAllSelected: PropTypes.bool,
    noSearch: PropTypes.bool,
    selectFirst: PropTypes.bool,
    selectedIds: PropTypes.arrayOf(PropTypes.string),
    selectedValue: PropTypes.string,
    language: PropTypes.string.isRequired,
    emptyStateMessage: PropTypes.string.isRequired,
    isFilterChanged: PropTypes.bool,
  };

  static defaultProps = {
    placeholder: undefined,
    name: undefined,
    onChange: () => {},
    isAllSelected: false,
    noSearch: false,
    selectFirst: false,
    selectedIds: [],
    selectedValue: undefined,
    isFilterChanged: false,
  };

  state = {
    hideNotSelected: false,
  };

  /**
   * Gets section with Select
   * @returns {object} section
   */
  getComboSection = () => {
    const {
      filters,
      placeholder,
      selectedValue,
      noSearch,
      selectFirst,
      icon,
      language,
      emptyStateMessage,
    } = this.props;
    return (
      <div className="filter-section">
        <Text tag="h3" type={FONT_TYPES.SUBHEADING} className="filter-placeholder bold">
          {placeholder}
        </Text>
        <Select
          items={filters}
          placeholder={placeholder}
          onChange={this.handleFilterItemChange}
          select={selectedValue}
          noSearch={noSearch || false}
          selectFirst={selectFirst || false}
          icon={this.iconsStore.getIcon(icon)}
          iconWidth={12}
          hideErrorMessage
          noBottomBorder
          reverse={language === 'ar'}
          emptyStateMessage={emptyStateMessage}
          language={language}
        />
      </div>
    );
  };

  /**
   * Gets section with CheckboxList
   * @returns {object} section
   */
  getCheckListSection = () => {
    const result = [];
    const {
      filters,
      isAllSelected,
      selectedIds,
      placeholder,
      language,
      isFilterChanged,
    } = this.props;
    result.push(
      <CheckboxList
        key="checkList"
        items={filters}
        onChange={this.handleFilterItemChange}
        hideNotSelected={this.state.hideNotSelected}
        isAllSelected={isAllSelected}
        selectedIds={selectedIds}
        isArabic={language === 'ar'}
        isFilterChanged={isFilterChanged}
      />,
    );
    const hideNotSelectedIconClass = `icon-container icon--${
      this.state.hideNotSelected ? 'up' : 'down'
    }`;

    return (
      <div className="filter-section">
        <div
          className="filter-section-title"
          onClick={() => {
            this.setState(state => ({
              hideNotSelected: !state.hideNotSelected,
            }));
          }}
          onKeyPress={() => {}}
        >
          <Text tag="h3" type={FONT_TYPES.SUBHEADING} className="filter-placeholder bold">
            {placeholder}
          </Text>
          <div className={hideNotSelectedIconClass}>
            <Icon
              icon={this.iconsStore.getIcon('dropdown')}
              width={18}
              color={Colors.vezeetaBlue}
            />
          </div>
        </div>

        {result}
      </div>
    );
  };

  /**
   * Gets section with RadioButton
   * @returns {object} section
   */
  getRadioButtonsSection = () => {
    const result = [];
    const { filters, selectedValue, placeholder } = this.props;
    result.push(
      <RadioButton
        key="radioButton"
        options={filters}
        onChange={this.handleFilterItemChange}
        select={selectedValue}
        listAlignment="flex-col"
      />,
    );

    return (
      <div className="filter-section">
        <Text tag="h3" type={FONT_TYPES.SUBHEADING} className="filter-placeholder bold">
          {placeholder}
        </Text>
        {result}
      </div>
    );
  };

  iconsStore = new IconsStore(Icons);

  /**
   * Handles change in filter section
   * @param {object} filterValue
   */
  handleFilterItemChange = filterValue => {
    const { onChange, name } = this.props;
    if (onChange) {
      onChange({
        name,
        data: filterValue,
      });
    }
  };

  render() {
    const { type } = this.props;
    if (type === 'combo') {
      return this.getComboSection();
    } else if (type === 'check') {
      return this.getCheckListSection();
    } else if (type === 'radio') {
      return this.getRadioButtonsSection();
    }
    return null;
  }
}

export default withDisplayName(FilterSection, 'FilterSection');
