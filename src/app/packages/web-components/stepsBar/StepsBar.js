import React, { Component } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Flex } from 'grid-styled';
import { bgColor, space } from 'styled-system';

import Step from './Step';
import { COLORS } from '../base/Colors';

const dots = [1, 2, 3, 4];
const dotRadius = 2;
const Dot = styled.div`
  min-height: ${dotRadius}px;
  height: ${dotRadius}px;
  min-width: ${dotRadius}px;
  width: ${dotRadius}px;
  border-radius: 50%;
  ${bgColor};
  ${space};
`;

const StepsBarContainer = Flex.extend`
  height: min-content;
`;

class StepsBar extends Component {
  static propTypes = {
    steps: PropTypes.arrayOf(PropTypes.string).isRequired,
    currentStep: PropTypes.number.isRequired,
    activeColor: PropTypes.string,
    defaultColor: PropTypes.string,
  };

  static defaultProps = {
    activeColor: COLORS.PRIMARY_BLUE,
    defaultColor: COLORS.HELP_TEXT,
  };

  state = {
    currentStep: this.props.currentStep,
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    if (prevState.currentStep !== nextProps.currentStep) {
      return {
        currentStep: nextProps.currentStep,
      };
    }

    return null;
  }

  render() {
    const { steps, activeColor, defaultColor } = this.props;
    const { currentStep } = this.state;

    return (
      <StepsBarContainer width={1} alignItems="center" justifyContent="space-between">
        {steps.map((step, index) => (
          <React.Fragment key={`dot-c-${step}-${index}`} /* eslint-disable-line */>
            {index !== 0 && (
              <Flex alignItems="center">
                {dots.map((_, dotIndex) => (
                  <Dot
                    key={`dot-c-${step}-${dotIndex}`} // eslint-disable-line
                    mx="2px"
                    bg={index === currentStep ? COLORS.PRIMARY_BLUE : COLORS.TEXT}
                  />
                ))}
              </Flex>
            )}
            <Step
              key={step}
              title={step}
              number={index + 1}
              isActive={currentStep === index}
              isVisited={currentStep >= index}
              activeColor={activeColor}
              defaultColor={defaultColor}
            />
          </React.Fragment>
        ))}
      </StepsBarContainer>
    );
  }
}

export default StepsBar;
