import React from 'react';
import PropTypes from 'prop-types';
import { Flex } from 'grid-styled';
import Icons from '../../icons';

import { COLORS } from '../base/Colors';
import Text from '../text/Text';
import Icon from '../icon/Icon';
import IconsStore from '../icon/IconsStore';
import { FONT_WEIGHTS } from '../base/Typography';

const CautionContainer = Flex.extend`
  border-radius: 4px;
  overflow: hidden;
`;

const Caution = ({ bgColor, textColor, children, ...otherProps }) => (
  <CautionContainer width={1} {...otherProps} alignItems="center" bg={bgColor} p={2}>
    <Icon icon={new IconsStore(Icons).getIcon('warning')} color={textColor} width={12} />
    <Text ml={1} color={textColor} fontWeight={FONT_WEIGHTS.SEMI_BOLD}>
      {children}
    </Text>
  </CautionContainer>
);

Caution.propTypes = {
  bgColor: PropTypes.string,
  textColor: PropTypes.string,
  children: PropTypes.string.isRequired,
};

Caution.defaultProps = {
  bgColor: COLORS.ILLUSTRATION_BACKGROUND,
  textColor: COLORS.PRIMARY_BLUE,
};

export default Caution;
