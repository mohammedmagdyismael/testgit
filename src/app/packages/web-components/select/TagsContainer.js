import { Flex } from 'grid-styled';

const TagsContainer = Flex.extend`
  max-height: 84px;
  overflow-y: auto;
  width: calc(100% - 20px);
`;

export default TagsContainer;
