import styled from 'styled-components';
import { textAlign, space } from 'styled-system';

import Text from '../../text/Text';

const ErrorMessage = styled(Text)`
  width: 100%;
  ${textAlign};
  ${space};
`;

export default ErrorMessage;
