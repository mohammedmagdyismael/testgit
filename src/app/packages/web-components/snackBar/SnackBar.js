import React, { Component } from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import Icons from '../../icons';

import Icon from '../icon/Icon';
import IconsStore from '../icon/IconsStore';
import Text from '../text/Text';
import withDisplayName from '../WithDisplayName';
import { FONT_TYPES, FONT_WEIGHTS } from '../base/Typography';
import './SnackBar.scss';

const LOADING = 'loading';
const NOTIFICATIONS = 'notifications';

class SnackBar extends Component {
  constructor(props) {
    super(props);

    this.iconsStore = new IconsStore(Icons);
    this.state = {
      message: this.props.message,
      messageType: this.props.messageType,
    };
  }

  componentDidMount() {
    if (this.props.show === true) {
      this.showSnackBar(this.props.message, NOTIFICATIONS);
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.show !== this.props.show && nextProps.show === true) {
      this.showSnackBar(nextProps.message, NOTIFICATIONS);
    }
  }

  /**
   * Change state between show/hide snackBar
   * @param {bool} newState, true = show, false = hide
   * @param {string} message, message that will be displayed
   * @param {string} messageType, notifications or loading
   */
  toggleSnackBar = (newState, message, messageType = NOTIFICATIONS) => {
    if (newState === true) {
      this.showSnackBar(message, messageType);
    } else {
      this.hideSnackBar();
    }
  };

  /**
   * Show the snack-bar
   * @param {string} message, the message that will be displayed
   * @param {string} messageType, notifications or loading
   */
  showSnackBar = (message, messageType = NOTIFICATIONS) => {
    this.setState(
      {
        message: messageType === NOTIFICATIONS ? message : `${message}...`,
      },
      () => {
        if (this.snackBar) {
          this.snackBar.style.marginBottom = '40px';
        }

        // Auto hide the snack-bar after set of time
        // Default autoHide = true
        // Default timeout = 5000ms
        if (this.props.autoHide) {
          setTimeout(() => {
            this.hideSnackBar();
          }, this.props.autoHideTime);
        }
      },
    );
  };

  /**
   * Hide the snack-bar
   */
  hideSnackBar = () => {
    if (this.snackBar) {
      this.snackBar.style.marginBottom = '-90px';
    }

    if (this.props.onHide) {
      this.props.onHide();
    }
  };

  render() {
    return (
      <div className="snack-bar-window">
        <div
          className={classnames('snack-bar-container', {
            'snack-bar-container--danger': this.state.isDanger,
            'snack-bar-container--success': !this.state.isDanger,
          })}
          ref={snackBar => {
            this.snackBar = snackBar;
          }}
        >
          <Text
            tag="h3"
            type={FONT_TYPES.SUBHEADING}
            fontWeight={FONT_WEIGHTS.NORMAL}
            className="message-text"
          >
            {this.state.message}
          </Text>
          {this.state.messageType === NOTIFICATIONS && (
            <button className="close-btn" onClick={this.hideSnackBar}>
              <Icon
                className="close-icon"
                icon={this.iconsStore.getIcon('close')}
                width={14}
                color="#fff"
              />
            </button>
          )}
        </div>
      </div>
    );
  }
}

SnackBar.propTypes = {
  onHide: PropTypes.func,
  autoHide: PropTypes.bool,
  autoHideTime: PropTypes.number,
  show: PropTypes.bool,
  message: PropTypes.string,
  messageType: PropTypes.oneOf([NOTIFICATIONS, LOADING]),
};

SnackBar.defaultProps = {
  autoHide: true,
  autoHideTime: 5000,
  show: false,
  message: '',
  messageType: NOTIFICATIONS,
  onHide: () => {},
};

export default withDisplayName(SnackBar, 'SnackBar');
