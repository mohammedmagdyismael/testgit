import styled from 'styled-components';
import { bgColor, borderColor, hover, space, minWidth, flexDirection } from 'styled-system';

import Space from '../base/Space';

const ButtonBase = styled.button`
  direction: ltr;
  display: flex;
  align-items: center;
  border: 1px solid;
  justify-content: center;
  border-radius: 4px;
  height: 36px;
  padding: 0 ${Space[5]}px;
  transition: all 100ms ease-out;
  outline: none;
  position: relative;
  max-width: max-content;
  ${minWidth};
  ${bgColor};
  ${borderColor};
  ${hover};
  ${space};
  ${flexDirection};

  &:not(:disabled) {
    cursor: pointer;
  }
`;

export default ButtonBase;
