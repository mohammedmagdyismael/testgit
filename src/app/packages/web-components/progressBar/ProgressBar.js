import React, { Component } from 'react';
import styled from 'styled-components';
import { width, borderRadius } from 'styled-system';
import Color from 'color';
import ColorString from 'color-string';
import PropTypes from 'prop-types';

import { COLORS, COLORS_VALUES } from '../base/Colors';
import withDisplayName from '../WithDisplayName';

const ProgressBarContainer = styled.div`
  background: ${ColorString.to.rgb(
    Color(COLORS_VALUES[COLORS.PRIMARY_BLUE])
      .alpha(0.3)
      .rgb()
      .array(),
  )};
  border: 0;
  box-shadow: none;
  height: 6px;
  outline: none;
  width: 100%;
  overflow: hidden;
  ${borderRadius};
`;

const Indicator = styled.div`
  transition: width 150ms ease-out;
  background-color: ${COLORS_VALUES[COLORS.PRIMARY_BLUE]};
  height: 100%;
  ${width};
`;

class ProgressBar extends Component {
  static propTypes = {
    currentStep: PropTypes.number.isRequired,
    totalSteps: PropTypes.number.isRequired,
  };

  state = {
    widthPercentage: 0,
  };

  componentDidMount() {
    const { currentStep } = this.props;
    this.updateProgress(currentStep);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.currentStep !== this.props.currentStep) {
      const { currentStep } = this.props;
      this.updateProgress(currentStep);
    }
  }

  /**
   * Takes the current function and generate the percentage then change the
   * indicator width
   * @param {number} currentStep
   */
  updateProgress = currentStep => {
    const { totalSteps } = this.props;
    const widthPercentage = currentStep / totalSteps;
    this.setState({
      widthPercentage,
    });
  };

  render() {
    const { widthPercentage } = this.state;

    return (
      <ProgressBarContainer {...this.props}>
        <Indicator width={widthPercentage} />
      </ProgressBarContainer>
    );
  }
}

export default withDisplayName(ProgressBar, 'ProgressBar');
