import PropTypes from 'prop-types';
import { Flex } from 'grid-styled';
import { height } from 'styled-system';

const Container = Flex.extend`
  ${height};
  width: 100%;
  position: relative;
  flex-direction: column;
`;

Container.propTypes = {
  height: PropTypes.number,
};

Container.defaultProps = {
  height: 300,
};

export default Container;
