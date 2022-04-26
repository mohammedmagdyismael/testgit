import { Flex } from 'grid-styled';
import { borderColor, width, space } from 'styled-system';

const FieldContainer = Flex.extend`
  border-bottom: 1px solid;
  position: relative;
  ${borderColor};
  ${width};
  ${space};
`;

export default FieldContainer;
