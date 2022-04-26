import styled from 'styled-components';
import { space, minHeight, width, height } from 'styled-system';

import { COLORS, COLORS_VALUES } from '../base/Colors';
import withDisplayName from '../WithDisplayName';

const Card = styled.div`
  background: ${COLORS_VALUES[COLORS.WHITE]};
  box-shadow: 0 1px 1px rgba(24, 24, 24, 0.1);
  border-radius: 4px;
  position: relative;
  overflow: ${props => props.overflow};
  ${space};
  ${minHeight};
  ${width};
  ${height};
`;

export default withDisplayName(Card, 'Card');
