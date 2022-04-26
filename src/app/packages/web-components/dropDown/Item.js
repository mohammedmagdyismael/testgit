/* eslint jsx-a11y/no-noninteractive-element-interactions: 0 */

import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import ClassNames from 'classnames';

import Text from '../text/Text';
import Icon, { iconPropTypes } from '../icon/Icon';
import Separator from '../separator/Separator';
import Colors from '../shared/Colors';

class Item extends Component {
  static propTypes = {
    icon: iconPropTypes,
    image: PropTypes.string,
    text: PropTypes.string,
    onClick: PropTypes.func,
    disabled: PropTypes.bool,
    component: PropTypes.any, // eslint-disable-line
    isDivider: PropTypes.bool,
    isHighlighted: PropTypes.bool,
  };

  static defaultProps = {
    icon: undefined,
    image: undefined,
    text: undefined,
    isDivider: false,
    disabled: false,
    onClick: undefined,
    isHighlighted: false,
  };

  state = {
    iconColor: Colors.defaultGrey,
  };

  onHover = () => {
    this.setState({
      iconColor: '#fff',
    });
  };

  render() {
    const { icon, image, text, disabled, component, isDivider, isHighlighted } = this.props;
    let { onClick } = this.props;
    const { iconColor } = this.state;
    const isItemClickable = onClick;

    // Add empty arrow function to prevent passing `false` to onClick
    onClick = onClick && !disabled ? onClick : () => {};

    if (isDivider) {
      return <Separator />;
    }

    return (
      <li
        className={ClassNames('item', {
          'item--disabled': disabled,
          'item--not-clickable': !isItemClickable,
          'item--grid': !component,
          'item--highlighted': isHighlighted,
        })}
        onClick={onClick}
        onKeyDown={onClick}
      >
        {component || (
          <Fragment>
            <div className="icon--container center">
              {icon && <Icon icon={icon} width={15} color={iconColor} />}
              {image && <img src={image} alt="desc" width="15px" />}
            </div>
            <Text className="item--text">{text}</Text>
          </Fragment>
        )}
      </li>
    );
  }
}

export default Item;
