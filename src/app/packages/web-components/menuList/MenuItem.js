import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import withDisplayName from '../WithDisplayName';
import './MenuItem.scss';

class MenuItem extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selected: false,
      hovered: false,
    };
  }

  onMouseEnter = () => {
    if (this.props.onMouseEnter) {
      this.props.onMouseEnter(this.props.index, this.props.value, this.props.fieldValue);
    }
  };

  onClick = () => {
    if (this.props.onClick) {
      this.props.onClick(this.props.index, this.props.value, this.props.fieldValue);
    }
  };

  render() {
    if (this.props.disable) {
      return <li className="disabled">{this.props.children}</li>;
    }

    return (
      <li
        className={classnames({ selected: this.state.selected }, { hover: this.state.hovered })}
        onMouseDown={this.onClick}
        onMouseEnter={this.onMouseEnter}
        ref={item => {
          this.item = item;
        }}
        tabIndex={0}
        role="button" // eslint-disable-line
      >
        {this.props.children}
      </li>
    );
  }
}

MenuItem.propTypes = {
  onClick: PropTypes.func,
  onMouseEnter: PropTypes.func,
  children: PropTypes.element.isRequired,
  value: PropTypes.any, // eslint-disable-line
  fieldValue: PropTypes.string,
  disable: PropTypes.bool,
  index: PropTypes.number.isRequired,
};

MenuItem.defaultProps = {
  onClick: () => {},
  onMouseEnter: () => {},
  disable: false,
  value: undefined,
  fieldValue: undefined,
};

export default withDisplayName(MenuItem, 'MenuItem');
