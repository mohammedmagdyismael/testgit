import React from 'react';
import PropTypes from 'prop-types';
import Icons from '../../icons';
import { Flex } from 'grid-styled';

import Text from '../text/Text';
import IconsStore from '../icon/IconsStore';
import Icon from '../icon/Icon';
import { COLORS, COLORS_VALUES } from '../base/Colors';
import { FONT_WEIGHTS, FONT_TYPES } from '../base/Typography';

const circleRadius = 26;

const Circle = Flex.extend`
  min-height: ${circleRadius}px;
  height: ${circleRadius}px;
  min-width: ${circleRadius}px;
  width: ${circleRadius}px;
  border: 1px solid;
  border-radius: 50%;
  border-color: ${props => COLORS_VALUES[props.border]};
`;

const Step = ({ title, isActive, isVisited, number, defaultColor, activeColor }) => {
  let textColor;
  let stepColor;
  let border;
  let bg;

  if (isActive) {
    textColor = activeColor;
    stepColor = activeColor;
    border = activeColor;
    bg = COLORS.TRANSPARENT;
  } else if (isVisited) {
    textColor = activeColor;
    stepColor = COLORS.WHITE;
    border = activeColor;
    bg = activeColor;
  } else {
    textColor = defaultColor;
    stepColor = defaultColor;
    border = defaultColor;
    bg = COLORS.TRANSPARENT;
  }

  return (
    <Flex key={title} alignItems="center">
      <Circle alignItems="center" justifyContent="center" bg={bg} border={border}>
        {isVisited && !isActive ? (
          <Icon icon={new IconsStore(Icons).getIcon('success')} width={12} color={COLORS.WHITE} />
        ) : (
          <Text fontWeight={FONT_WEIGHTS.SEMI_BOLD} color={stepColor}>
            {number}
          </Text>
        )}
      </Circle>
      <Text fontWeight={FONT_WEIGHTS.NORMAL} type={FONT_TYPES.SUBHEADING} color={textColor} ml={2}>
        {title}
      </Text>
    </Flex>
  );
};

Step.propTypes = {
  title: PropTypes.string.isRequired,
  isActive: PropTypes.bool.isRequired,
  isVisited: PropTypes.bool.isRequired,
  number: PropTypes.number.isRequired,
  activeColor: PropTypes.string.isRequired,
  defaultColor: PropTypes.string.isRequired,
};

export default Step;
