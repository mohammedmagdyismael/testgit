import React from 'react';
import PropTypes from 'prop-types';
import { width } from 'styled-system';
import { Flex } from 'grid-styled';
import styled from 'styled-components';

import Text from '../text/Text';
import { iconPropTypes } from '../icon/Icon';
import { FONT_TYPES } from '../base/Typography';
import Button from '../buttons/Button';
import withDisplayName from '../WithDisplayName';
import { COLORS } from '../base/Colors';

const Image = styled.img`
  object-fit: cover;
  height: auto;
  ${width};
`;

const EmptyState = ({
  text,
  image,
  imageWidth,
  buttonText,
  buttonIcon,
  buttonIconWidth,
  buttonOnClick,
}) => (
  <Flex flexDirection="column" alignItems="center">
    {image && <Image width={imageWidth} src={image} />}
    <Text
      textAlign="center"
      width={imageWidth + (imageWidth * 3) / 4}
      tag="h3"
      mt={4}
      mb={4}
      type={FONT_TYPES.HEADING}
    >
      {text}
    </Text>
    {buttonText && (
      <Button
        primary={false}
        color={COLORS.PRIMARY_BLUE}
        icon={buttonIcon}
        iconWidth={buttonIconWidth}
        onClick={buttonOnClick}
      >
        {buttonText}
      </Button>
    )}
  </Flex>
);

EmptyState.propTypes = {
  text: PropTypes.string.isRequired,
  image: PropTypes.string,
  buttonText: PropTypes.string,
  buttonIcon: iconPropTypes,
  buttonIconWidth: PropTypes.number,
  buttonOnClick: PropTypes.func,
  imageWidth: PropTypes.number,
};

EmptyState.defaultProps = {
  image: undefined,
  buttonText: undefined,
  buttonIcon: undefined,
  buttonIconWidth: undefined,
  buttonOnClick: () => {},
  imageWidth: 250,
};

export default withDisplayName(EmptyState, 'EmptyState');
