import styled from 'styled-components'
import { COLORS, COLORS_VALUES } from '../base/Colors';

export const BlockBorder = styled.div`
  display: flex;
  border: 1px solid ${COLORS_VALUES[COLORS.BORDER]};
  border-radius: 4px;
`;

export const HeaderContainer = styled.div`
  display: flex;
  min-height: 52px;
  justify-content: space-between;
`;
