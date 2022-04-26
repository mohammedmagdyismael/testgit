/* eslint-disable react/forbid-prop-types */
import React from 'react';
import PropTypes from 'prop-types';
import Icon from '../icon/Icon';
import IconsStore from './IconsStore';
import { BarContainer, IconContainer } from './NotificationBar.style';

const NotificationBar = ({
  isShowed,
  extendBarContainer,
  iconName,
  iconSize,
  iconColor,
  notificationMessage,
}) => (
  <div style={{ display: isShowed ? 'block' : 'none' }}>
    <BarContainer extendBarContainer={extendBarContainer}>
      <IconContainer>
        {iconName && (
          <Icon
            className="icon"
            icon={IconsStore.getIcon(iconName)}
            width={iconSize}
            color={iconColor}
          />
        )}
      </IconContainer>
      <div style={{ padding: '0px 10px' }}>
        <p>{notificationMessage}</p>
      </div>
    </BarContainer>
  </div>
);

NotificationBar.propTypes = {
  extendBarContainer: PropTypes.object,
  iconName: PropTypes.string,
  iconColor: PropTypes.string,
  notificationMessage: PropTypes.string,
  isShowed: PropTypes.bool,
  iconSize: PropTypes.number,
};

export default NotificationBar;
