/* eslint-disable react/require-default-props */
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Icons from '../../icons';
import Icon from '../icon/Icon';
import IconsStore from '../icon/IconsStore';
import { FONT_TYPES, FONT_WEIGHTS } from '../base/Typography';
import { SnackBarContainer, SnackBarMessage, SnackBarWindow } from './SnackBar.style';

const iconsStore = new IconsStore(Icons);
const SnackBar = ({ snackBarSettings, onHide }) => {
  const { message, show, color, backgroundColor, icon } = snackBarSettings;
  const [notificationMessage, setMessage] = useState();
  const [textColor, setColor] = useState();
  const [barBackgroundColor, setBackgroundColor] = useState();
  const [iconName, setIconName] = useState('');
  const [showBar, toggleBar] = useState(false);

  useEffect(
    () => {
      if (show) {
        setMessage(message);
        setColor(color);
        setBackgroundColor(backgroundColor);
        setIconName(icon);
        toggleBar(true);
        setTimeout(() => {
          toggleBar(false);
          onHide();
        }, 4000);
      }
    },
    [message, show, color, icon, backgroundColor],
  );

  return (
    <SnackBarWindow>
      <SnackBarContainer barBackgroundColor={barBackgroundColor} show={showBar}>
        {iconName && <Icon icon={iconsStore.getIcon(iconName)} width={14} color="#fff" />}
        <SnackBarMessage
          textColor={textColor}
          tag="h3"
          type={FONT_TYPES.SUBHEADING}
          fontWeight={FONT_WEIGHTS.NORMAL}
          className="message-text"
        >
          {notificationMessage}
        </SnackBarMessage>
      </SnackBarContainer>
    </SnackBarWindow>
  );
};

SnackBar.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  snackBarSettings: PropTypes.object,
  onHide: PropTypes.func,
};

export default SnackBar;
