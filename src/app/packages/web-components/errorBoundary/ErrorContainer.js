import { Flex } from 'grid-styled';

const ErrorContainer = Flex.extend`
  background: white;
  height: 100vh;
  overflow: hidden;
  position: absolute;
  z-index: 100000;
`;

export default ErrorContainer;
