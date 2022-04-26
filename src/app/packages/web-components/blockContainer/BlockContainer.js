// @flow

import React from 'react';
import { Flex } from 'grid-styled';
import PropType from 'prop-types';
import Icons from '../../icons';

import Button from '../buttons/Button';
import Separator from '../separator/Separator';
import Icon from '../icon/Icon';
import Text from '../text/Text';
import { COLORS } from '../base/Colors';
import { FONT_TYPES } from '../base/Typography';
import IconsStore from '../icon/IconsStore';
import { BlockBorder, HeaderContainer } from './BlockContainer.style';

const BlockContainer = ({ ...props }) => {
  const {
    name,
    icon,
    iconWidth,
    children,
    buttonText,
    buttonIcon,
    buttonIconWidth,
    onClick,
    disabled,
    hideButton,
    reverse,
  } = props;

  let containerPaddingProps;
  let iconPaddingProps;
  if (reverse) {
    containerPaddingProps = {
      pr: 5,
      pl: 2,
    };
    iconPaddingProps = {
      ml: 3,
    };
  } else {
    containerPaddingProps = {
      pl: 5,
      pr: 2,
    };
    iconPaddingProps = {
      mr: 3,
    };
  }
  return (
    <BlockBorder width={1} flexDirection="column">
      <HeaderContainer
        alignItems="center"
        justifyContent="space-between"
        {...containerPaddingProps}
        py={2}
      >
        <Flex alignItems="center" justifyContent="flex-start">
          <Icon
            icon={new IconsStore(Icons).getIcon(icon)}
            width={iconWidth}
            color={COLORS.TEXT}
            {...iconPaddingProps}
          />
          <Text type={FONT_TYPES.SUBHEADING}>{name}</Text>
        </Flex>
        {!hideButton && (
          <Button
            primary={false}
            color={COLORS.PRIMARY_BLUE}
            icon={new IconsStore(Icons).getIcon(buttonIcon)}
            iconWidth={buttonIconWidth}
            onClick={onClick}
            disabled={disabled}
            reverse={reverse}
          >
            {buttonText}
          </Button>
        )}
      </HeaderContainer>
      <Separator />
      <Flex width={1} height="max-content">
        {children}
      </Flex>
    </BlockBorder>
  );
};


BlockContainer.propType = {
  name: PropType.string,
  icon: PropType.string,
  iconWidth: PropType.number,
  children: PropType.node,
  buttonText: PropType.string,
  buttonIcon: PropType.string,
  buttonIconWidth: PropType.number,
  disabled: PropType.bool,
  hideButton: PropType.bool,
  onClick: PropType.func,
  reverse: PropType.bool,
};

export default BlockContainer;
