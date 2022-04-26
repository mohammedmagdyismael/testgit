import { Flex } from 'grid-styled';

import { shimmerEffect } from '../base/Animations';
import { COLORS_VALUES, COLORS } from '../base/Colors';

const ShimmerEffect = Flex.extend`
  div {
    animation-duration: 1.3s;
    animation-fill-mode: forwards;
    animation-iteration-count: infinite;
    animation-name: ${shimmerEffect};
    animation-timing-function: linear;

    background: ${COLORS_VALUES[COLORS.SHIMMER_BACKGROUND]};
    background-attachment: fixed;
    background-image: linear-gradient(
      to right,
      ${COLORS_VALUES[COLORS.SHIMMER_BACKGROUND]} 0%,
      ${COLORS_VALUES[COLORS.SHIMMER_EFFECT]} 40%,
      ${COLORS_VALUES[COLORS.SHIMMER_BACKGROUND]} 60%,
      ${COLORS_VALUES[COLORS.SHIMMER_BACKGROUND]} 100%
    );
    background-repeat: no-repeat;
    background-size: 250%;
  }
`;

export default ShimmerEffect;
