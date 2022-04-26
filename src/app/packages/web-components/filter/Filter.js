import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import Icons from '../../icons';
import styled from 'styled-components';
import { Flex } from 'grid-styled';

import FilterSection from './filterSection/FilterSection';
import Icon from '../icon/Icon';
import IconsStore from '../icon/IconsStore';
import Text from '../text/Text';
import withDisplayName from '../WithDisplayName';
import { FONT_TYPES } from '../base/Typography';
import { COLORS, COLORS_VALUES } from '../base/Colors';

const FilterTitleContainer = styled(Flex)`
  border-radius: 4px 4px 0 0;
  background-color: ${COLORS_VALUES[COLORS.PRIMARY_BLUE]};
  opacity: 0.6;
`;

class Filter extends Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    sections: PropTypes.array.isRequired, // eslint-disable-line
    onChange: PropTypes.func,
    language: PropTypes.string,
    emptyStateMessage: PropTypes.string.isRequired,
    otherProps: PropTypes.object, // eslint-disable-line
    isFilterChanged: PropTypes.bool,
  };

  static defaultProps = {
    onChange: () => {},
    otherProps: {},
    language: 'en',
    isFilterChanged: false,
  };

  state = {
    appliedFilters: {},
    sections: [],
  };

  /**
   * Resets marked sections applied filters
   * @param {object} nextProps
   * @param {object} prevState
   */
  static getDerivedStateFromProps(nextProps, prevState) {
    if (!_.isEqual(prevState.sections, nextProps.sections)) {
      const resetSections = {};
      nextProps.sections.filter(section => section.resetSection).forEach(section => {
        resetSections[section.name] = null;
      });

      return {
        appliedFilters: {
          ...prevState.appliedFilters,
          ...resetSections,
        },
        sections: nextProps.sections,
      };
    }
    return null;
  }

  /**
   * Gets list of sections
   * @returns {array} sections
   */
  getSections = () => {
    const { sections, language, emptyStateMessage, isFilterChanged } = this.props;
    const result = sections.map(section => (
      <FilterSection
        key={section.name}
        type={section.type}
        name={section.name}
        icon={section.icon}
        filters={section.filters}
        placeholder={section.placeholder}
        isAllSelected={section.isAllSelected}
        isFilterChanged={isFilterChanged}
        selectedIds={section.selectedIds}
        selectedValue={section.selectedValue}
        noSearch={section.noSearch}
        selectFirst={section.selectFirst}
        onChange={this.handleFilterSectionChange}
        language={language}
        emptyStateMessage={emptyStateMessage}
      />
    ));
    return result;
  };

  /**
   * Handles change in filter section
   * @param {object} filterSection
   */
  handleFilterSectionChange = filterSection => {
    const { onChange } = this.props;
    const appliedFilters = {
      ...this.state.appliedFilters,
      [filterSection.name]: filterSection.data,
    };

    this.setState(
      {
        appliedFilters,
      },
      () => {
        onChange(appliedFilters);
      },
    );
  };

  render() {
    const { title, otherProps } = this.props;
    const sections = this.getSections();
    return (
      <React.Fragment>
        <FilterTitleContainer width={1} px={5} py={2} alignItems="center">
          <Icon
            icon={new IconsStore(Icons).getIcon('filter')}
            width={14}
            color="#fff"
            {...otherProps}
          />
          <Text tag="h3" type={FONT_TYPES.SUBHEADING} color={COLORS.WHITE} m={0}>
            {title}
          </Text>
        </FilterTitleContainer>
        {sections}
      </React.Fragment>
    );
  }
}

export default withDisplayName(Filter, 'Filter');
