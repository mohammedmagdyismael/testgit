import styled from 'styled-components';
import { fontSize, lineHeight, fontWeight, height } from 'styled-system';

import { COLORS, COLORS_VALUES } from '../base/Colors';

const Input = styled.input`
  background: ${COLORS_VALUES[COLORS.TRANSPARENT]};
  border: 0;
  outline: none;
  width: 100%;
  ${fontSize};
  ${lineHeight};
  ${fontWeight};
  ${height};

  &::-webkit-input-placeholder {
    color: ${COLORS_VALUES[COLORS.HELP_TEXT]};
  }
`;

export default Input;
