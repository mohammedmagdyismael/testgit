import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ClassNames from 'classnames';
import Icons from '../../icons';

import Item from './Item';
import Icon from '../icon/Icon';
import IconsStore from '../icon/IconsStore';
import Colors from '../shared/Colors';
import withDisplayName from '../WithDisplayName';
import './DropDown.scss';

const MENU_ALIGNMENT = {
  LEFT: 'LEFT',
  RIGHT: 'RIGHT',
};

class DropDown extends Component {
  static propTypes = {
    items: PropTypes.arrayOf(
      PropTypes.shape({
        image: PropTypes.string,
        icon: PropTypes.object,
        text: PropTypes.string,
        onClick: PropTypes.func,
        disabled: PropTypes.bool,
        component: PropTypes.any,
        isDivider: PropTypes.bool,
      }),
    ).isRequired,
    onChange: PropTypes.func,
    component: PropTypes.node.isRequired,
    arrowColor: PropTypes.string,
    menuAlignment: PropTypes.oneOf([MENU_ALIGNMENT.RIGHT, MENU_ALIGNMENT.LEFT]),
    disabled: PropTypes.bool,
    className: PropTypes.string,
  };

  static defaultProps = {
    arrowColor: Colors.vezeetaBlue,
    menuAlignment: MENU_ALIGNMENT.RIGHT,
    onChange: undefined,
    disabled: false,
    className: undefined,
  };

  state = {
    isOpen: false,
  };

  componentDidMount() {
    document.addEventListener('mousedown', this.hideMenu);
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.hideMenu);
  }

  showMenu = () => {
    const { disabled } = this.props;
    this.setState(prevState => ({
      isOpen: !disabled && !prevState.isOpen,
    }));
  };

  hideMenu = event => {
    if (this.containerRef && !this.containerRef.contains(event.target) && this.state.isOpen) {
      this.setState({
        isOpen: false,
      });
    }
  };

  renderList = () => {
    const { items } = this.props;
    return items.map((item, index) => (
      <Item
        key={item.text || index}
        icon={item.icon}
        image={item.image}
        text={item.text}
        onClick={item.onClick || this.props.onChange}
        disabled={item.disabled}
        component={item.component}
        isDivider={item.isDivider}
        isHighlighted={item.isHighlighted}
      />
    ));
  };

  render() {
    const { component, arrowColor, menuAlignment, disabled, className } = this.props;
    const { isOpen } = this.state;

    return (
      <div
        className={ClassNames('drop-down--container', className)}
        onClick={this.showMenu}
        ref={div => {
          this.containerRef = div;
        }}
        onKeyDown={() => {}}
      >
        <div
          className={ClassNames('view--container', 'center--vertical', {
            'view--container__disabled': disabled,
          })}
        >
          {component}
          {!disabled && (
            <div className={ClassNames('icon--container', { 'icon--container__up': isOpen })}>
              <Icon
                icon={new IconsStore(Icons).getIcon('dropdown')}
                width={20}
                color={arrowColor}
              />{' '}
            </div>
          )}
        </div>
        <ul
          className={ClassNames('menu--container', {
            'menu--container__left': menuAlignment === MENU_ALIGNMENT.LEFT,
            'menu--container__open': isOpen,
          })}
        >
          {this.renderList()}
        </ul>
      </div>
    );
  }
}

export { MENU_ALIGNMENT };
export default withDisplayName(DropDown, 'DropDown');
