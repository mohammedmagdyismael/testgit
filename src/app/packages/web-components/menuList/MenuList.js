/* eslint-disable */
import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import _ from 'lodash';

import MenuItem from './MenuItem';
import withDisplayName from '../WithDisplayName';
import ShimmerEffect from '../shimmerEffect/ShimmerEffect';
import Rect from '../shimmerEffect/Rect';

// TODO: Use this in ComboBox
let counter = 0;
const UP_ARROW = 38;
const DOWN_ARROW = 40;
const ENTER = 13;
const ESCAPE = 27;

const SUPPORTED_SHORTCUTS = [UP_ARROW, DOWN_ARROW, ENTER, ESCAPE];

class MenuList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      items: this.props.items,
      disabledItems: this.props.disabledItems,
      itemsRefs: new Map(),
      isLoading: !this.props.items,
    };
  }

  componentWillMount() {
    // if (this.props.disabledItems) {
    //   this.disableItems(this.props.disabledItems);
    // }

    if (this.props.toggleShow) {
      this.showMenuList();
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.items && !_.isEqual(nextProps.items, this.props.items)) {
      this.setState({
        items: nextProps.items,
        isLoading: false,
      });
    }
    // if (nextProps.disabledItems !== this.props.disabledItems) {
    //   this.disableItems(nextProps.disabledItems);
    // }

    if (nextProps.show) {
      this.showMenuList();
    } else {
      this.hideMenuList();
    }
  }

  /**
   * Show/hide menu list
   */
  toggleMenu = () => {
    if (!this.props.disabled) {
      if (this.state.isMenuOpened) {
        this.hideMenuList();
      } else {
        this.showMenuList();
      }
    }
  };

  /**
   * Shows/hides the menu list
   */
  showMenuList = () => {
    this.setState(
      {
        isMenuOpened: true,
      },
      () => {
        this.menu.style.display = 'block';
      },
    );
  };

  /**
   * Hides the list
   */
  hideMenuList = () => {
    this.setState(
      {
        isMenuOpened: false,
      },
      () => {
        this.menu.style.display = 'none';
      },
    );
  };

  render() {
    let items;
    if (this.state.isLoading) {
      items = (
        <ShimmerEffect>
          <Rect />
          <Rect />
          <Rect />
          <Rect />
        </ShimmerEffect>
      );
    } else {
      items = this.state.items.map((item, index) => {
        return (
          <MenuItem
            key={counter++}
            index={index}
            onClick={(index, value, fieldValue) => {
              if (this.props.onClick) {
                this.props.onClick(index, value, fieldValue);
              }
              this.hideMenuList();
            }}
            onMouseEnter={this.props.onMouseEnter}
            onFocus={this.props.onFocus}
            value={item.value}
            fieldValue={item.fieldValue}
            disable={item.disable}
            ref={menuItem => this.state.itemsRefs.set(index, menuItem)}
          >
            {item.children}
          </MenuItem>
        );
      });
    }

    return (
      <ul
        className="menu"
        ref={ul => {
          this.menu = ul;
        }}
        onKeyDown={this.navigateWithKeyboard}
        tabIndex={0}
      >
        {items}
      </ul>
    );
  }
}

MenuList.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      children: PropTypes.any,
      value: PropTypes.any,
      fieldValue: PropTypes.string,
      disable: PropTypes.bool,
    }),
  ),
  disabledItems: PropTypes.array,
  toggleShow: PropTypes.bool,
  show: PropTypes.bool,
  select: PropTypes.any,
  onClick: PropTypes.func,
  onMouseEnter: PropTypes.func,
  onMouseLeave: PropTypes.func,
  onFocus: PropTypes.func,
};

export default withDisplayName(MenuList, 'MenuList');
