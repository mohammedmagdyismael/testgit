import React, { Component, Fragment } from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Flex } from 'grid-styled';
import { left, right } from 'styled-system';
import Icons from '../../icons';

import { COLORS } from '../base/Colors';
import IconsStore from '../icon/IconsStore';
import Icon from '../icon/Icon';
import Text from '../text/Text';
import ShimmerEffect from '../shimmerEffect/ShimmerEffect';
import { NoAnimationBox } from '../shimmerEffect/NoAnimationContainer';
import Rect from '../shimmerEffect/Rect';
import { FONT_TYPES } from '../base/Typography';
import withDisplayName from '../WithDisplayName';
import './Tabs.scss';

const FIRST_TAB = 0;
const ARROW = { LEFT: 'left', RIGHT: 'right' };

const ArrowContainer = styled(Flex)`
  ${left};
  ${right};
  position: absolute;
  cursor: pointer;
  width: 40px;
  height: 40px;
  z-index: 1;
  background-color: rgba(255, 255, 255, 0.8);
  box-shadow: 2px 10px 10px 2px rgba(255, 255, 255, 0.6);
`;

class Tabs extends Component {
  state = {
    selectedTabIndex: 0,
    shouldSwitchTabs: this.props.tabs.length > 1,
    scrollable: false,
    scrollReachLeft: false,
    scrollReachRight: false,
  };

  componentDidMount() {
    const { select, isLoading } = this.props;

    if (!select) {
      this.changeTab(FIRST_TAB);
    } else {
      this.changeTab(select);
    }

    if (!isLoading) {
      this.changeNavScrollableStatus();
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.select !== prevProps.select) {
      this.changeTab(this.props.select);
    }
  }

  onArrowClick = direction => {
    const scrollableWidth = this.tabsNav.scrollWidth - this.tabsNav.clientWidth;
    const distanceToScroll = this.tabsNav.scrollWidth / this.props.tabs.length;

    if (this.tabsNav.scrollLeft <= scrollableWidth && this.tabsNav.scrollLeft >= 0) {
      this.tabsNav.scrollBy({
        left: direction === 'left' ? -distanceToScroll : distanceToScroll,
        behavior: 'smooth',
      });
    }
  };

  getTabs = () => {
    const { tabs } = this.props;
    const { selectedTabIndex, scrollable, scrollReachLeft, scrollReachRight } = this.state;

    return (
      <Fragment>
        {scrollable && (
          <Fragment>
            {!scrollReachLeft && (
              <ArrowContainer
                justifyContent="center"
                alignItems="center"
                left="0"
                onClick={() => this.onArrowClick(ARROW.LEFT)}
              >
                <Icon
                  icon={this.iconsStore.getIcon('arrow_left')}
                  color={COLORS.PRIMARY_BLUE}
                  width={9}
                />
              </ArrowContainer>
            )}
            {!scrollReachRight && (
              <ArrowContainer
                justifyContent="center"
                alignItems="center"
                right="0"
                onClick={() => this.onArrowClick(ARROW.RIGHT)}
              >
                <Icon
                  icon={this.iconsStore.getIcon('arrow_right')}
                  color={COLORS.PRIMARY_BLUE}
                  width={9}
                />
              </ArrowContainer>
            )}
          </Fragment>
        )}

        {tabs.map((tab, index) => (
          <div
            className={classnames('tab', {
              'tab--active': selectedTabIndex === index,
            })}
            key={`tab-${tab.value}`}
            ref={tabRef => {
              this.tabs.set(index, tabRef);
            }}
            onClick={() => this.changeTab(index)}
            tabIndex={index}
            onKeyDown={() => {}}
          >
            {tab.icon && (
              <div
                className={classnames('tab-icon--container', {
                  'tab-icon--container_active': selectedTabIndex === index,
                })}
              >
                <Icon icon={tab.icon} color={COLORS.PRIMARY_BLUE} width={tab.iconWidth} />
              </div>
            )}
            <Text cursor="pointer" tag="h3" type={FONT_TYPES.SUBHEADING} className="text">
              {tab.name}
            </Text>
          </div>
        ))}
      </Fragment>
    );
  };

  getPages = () => {
    const { tabs, YScrollContent } = this.props;
    const { selectedTabIndex } = this.state;
    return tabs.map((tab, index) => (
      <div
        key={`content-${tab.value}`}
        className={classnames('tab-content', {
          'tab-content--show': selectedTabIndex === index,
          'tab-content--empty': !tab.component,
          scrollable: YScrollContent,
        })}
        ref={page => {
          this.pages.set(index, page);
        }}
      >
        {tab.component}
      </div>
    ));
  };

  handleTabsScroll = () => {
    const scrollableWidth = this.tabsNav.scrollWidth - this.tabsNav.clientWidth;
    let scrollReachLeft;
    let scrollReachRight;

    if (this.tabsNav.scrollLeft === 0) {
      if (this.tabsNav.scrollLeft === scrollableWidth) {
        scrollReachLeft = true;
        scrollReachRight = true;
      } else {
        scrollReachLeft = true;
        scrollReachRight = false;
      }
    } else if (this.tabsNav.scrollLeft !== 0) {
      if (this.tabsNav.scrollLeft === scrollableWidth) {
        scrollReachLeft = false;
        scrollReachRight = true;
      } else {
        scrollReachLeft = false;
        scrollReachRight = false;
      }
    }

    this.setState({ scrollReachLeft, scrollReachRight });
  };

  changeNavScrollableStatus = () => {
    if (this.tabsNav.scrollWidth > this.tabsNav.clientWidth) {
      this.setState({ scrollable: true, scrollReachLeft: true });
    }
  };

  tabs = new Map();
  pages = new Map();
  iconsStore = new IconsStore(Icons);

  changeTab = index => {
    if (this.state.selectedTabIndex !== index) {
      const { tabs } = this.props;
      const { selectedTabIndex, shouldSwitchTabs, scrollable } = this.state;

      const matchedTab = this.tabs.get(selectedTabIndex);
      const matchedPage = this.pages.get(selectedTabIndex);
      const newTab = this.tabs.get(index);
      const newPage = this.pages.get(index);

      this.setState(
        {
          selectedTabIndex: index,
        },
        () => {
          if (matchedTab) {
            matchedTab.classList.remove('tab--active');
            matchedPage.classList.remove('tab-content--show');
            this.props.onChange(tabs[index].value);
          }

          if (newPage) {
            if (shouldSwitchTabs) {
              newTab.classList.add('tab--active');

              // In case of the tabs are scrollable horizontally when you select new tab
              // the tabs will scroll to make the new tab visible to the user on the screen.
              if (scrollable) {
                const scrollableWidth = this.tabsNav.scrollWidth - this.tabsNav.clientWidth;
                this.tabsNav.scrollTo({
                  left: ((scrollableWidth + newTab.clientWidth) / tabs.length) * index,
                  behavior: 'smooth',
                });
              }
            }
            newPage.classList.add('tab-content--show');
          }
        },
      );
    }
  };

  renderLazyLoadingTabs = (tabsNumber = 2) => {
    const lazyLoading = index => (
      <ShimmerEffect key={index}>
        <NoAnimationBox className="tab-loading--container" key={index}>
          <Rect width={125} className="tab-loading--text" />
        </NoAnimationBox>
      </ShimmerEffect>
    );

    const loadingTabs = [];
    for (let counter = 0; counter < tabsNumber; counter += 1) {
      loadingTabs.push(lazyLoading(counter));
    }
    return loadingTabs;
  };

  render() {
    const { tabs, className, isLoading } = this.props;

    return (
      <div className={classnames('tabs-container', className)}>
        {isLoading ? (
          <div className="nav-container">{this.renderLazyLoadingTabs(tabs.length)}</div>
        ) : (
          <Fragment>
            {tabs.length !== 0 && (
              <div
                className="nav-container"
                ref={nav => {
                  this.tabsNav = nav;
                }}
                onScroll={this.handleTabsScroll}
              >
                {this.getTabs()}
              </div>
            )}
            <div className="tab-content-container">{this.getPages()}</div>
          </Fragment>
        )}
      </div>
    );
  }
}

// TODO: add a new prop called renderTopRightComponent to support `Modal` integration
// TODO: add a new prop called renderTabName to support showing
// non-active tab to support `Modal` integration
Tabs.propTypes = {
  className: PropTypes.string,
  tabs: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      value: PropTypes.any,
      icon: PropTypes.object,
      iconWidth: PropTypes.number,
      component: PropTypes.any,
    }),
  ).isRequired,
  select: PropTypes.number,
  isLoading: PropTypes.bool,
  onChange: PropTypes.func,
  YScrollContent: PropTypes.bool,
};

Tabs.defaultProps = {
  className: undefined,
  isLoading: false,
  select: undefined,
  onChange: () => {},
};

export default withDisplayName(Tabs, 'Tabs');
