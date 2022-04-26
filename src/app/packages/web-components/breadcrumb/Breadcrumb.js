import React, { Component } from 'react';
import { Flex } from 'grid-styled';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import Icons from '../../icons';
import styled, { css } from 'styled-components';

import { COLORS, COLORS_VALUES } from '../base/Colors';
import Icon from '../icon/Icon';
import IconsStore from '../icon/IconsStore';
import Text from '../text/Text';
import Space from '../base/Space';
import { FONT_TYPES } from '../base/Typography';

const Step = styled(Text)`
  border-radius: 4px;
  cursor: ${props => props.cursor};
  padding: ${Space[2]}px ${Space[3]}px;
  &:hover {
    background-color: ${props => COLORS_VALUES[props.hover]}};
  }
  ${props => (props.extendStepTab ? props.extendStepTab : '')};
`;

const extendStepTab = css`
  font-weight: bold;
`;

class Breadcrumb extends Component {
  static propTypes = {
    stepsArray: PropTypes.arrayOf(
      PropTypes.arrayOf(
        PropTypes.shape({
          name: PropTypes.string,
          pathname: PropTypes.path,
        }),
      ),
    ).isRequired,
    location: PropTypes.object.isRequired, // eslint-disable-line
    history: PropTypes.object.isRequired, // eslint-disable-line
    fontType: PropTypes.string,
    arrowWidth: PropTypes.number,
    alertMessage: PropTypes.string,
    validationElementName: PropTypes.string,
    reverse: PropTypes.bool,
  };

  static defaultProps = {
    fontType: FONT_TYPES.BODY,
    arrowWidth: 6,
    validationElementName: undefined,
    alertMessage: 'Data will be lost, are you sure you want to proceed?',
    reverse: false,
  };

  state = {
    activeStepIndex: [0, 0],
    pathname: undefined,
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.location.pathname !== prevState.pathname) {
      const { stepsArray } = nextProps;
      const { pathname } = nextProps.location;

      let i = 0;
      let { activeStepIndex } = prevState;
      stepsArray.forEach(array => {
        const isActiveArray = array.some(
          step => step.pathname && !step.enableBackLink === pathname,
        );
        if (isActiveArray) {
          const activeStep = array.findIndex(step => step.pathname === pathname);
          activeStepIndex = [i, activeStep];
        }
        i += 1;
      });

      return {
        activeStepIndex,
        pathname: nextProps.location.pathname,
      };
    }

    return null;
  }

  /**
   * Change pathname by using history from react-router-dom
   * @param {string} pathname
   */
  changeRoute = (pathname, isLatest) => {
    // If the step is the last or the only one, we don't redirect
    if (isLatest) {
      return;
    }

    const { history, validationElementName, alertMessage } = this.props;
    const validationElement = document.querySelector(validationElementName);
    let couldRedirect = true;

    // Check if hidden input is exists
    if (validationElement) {
      // Check if field value is true
      couldRedirect = validationElement.value === 'true';
    }

    // Checks if user input is required
    if (!couldRedirect) {
      couldRedirect = window.confirm(alertMessage);
    }

    if (couldRedirect) {
      history.push(pathname);
    }
  };

  render() {
    const { stepsArray, fontType, arrowWidth, reverse } = this.props;
    const { activeStepIndex, pathname } = this.state;

    const content = [];
    stepsArray.map((array, index) => {
      const isActiveArray = index === activeStepIndex[0];
      const enableBackLink = array.filter(
        routeStep => routeStep.enableBackLink && routeStep.pathname === pathname,
      );
      const enableViewTitle = array.filter(
        routeStep => routeStep.isViewTitle && routeStep.pathname === pathname,
      );
      if (
        isActiveArray &&
        !((enableBackLink && enableBackLink[0]) || (enableViewTitle && enableViewTitle[0]))
      ) {
        array.map((step, stepIndex) => {
          const isLatest = stepIndex === activeStepIndex[1];
          const cursor = isLatest ? 'default' : 'pointer';
          const bg = isLatest ? COLORS.WHITE : COLORS.HOVER;

          if (stepIndex <= activeStepIndex[1]) {
            content.push(
              <Flex key={step.name} alignItems="center">
                <Step
                  cursor={cursor}
                  hover={bg}
                  type={fontType}
                  onClick={() => this.changeRoute(step.pathname, isLatest)}
                >
                  {step.name}
                </Step>
                {step.helpComponent ? step.helpComponent : null}
                {!isLatest && (
                  <Icon
                    icon={new IconsStore(Icons).getIcon(reverse ? 'arrow_left' : 'arrow_right')}
                    color={COLORS.HELP_TEXT}
                    width={arrowWidth}
                    mx={1}
                  />
                )}
              </Flex>,
            );
          }
          return null;
        });
      } else if (isActiveArray && enableBackLink && enableBackLink[0]) {
        content.push(
          <Flex key={enableBackLink[0].name} alignItems="center">
            <Step
              cursor="pointer"
              hover={COLORS.WHITE}
              type={fontType}
              onClick={() => this.changeRoute(enableBackLink[0].fallBack, false)}
              extendStepTab={extendStepTab}
            >
              {enableBackLink[0].name}
            </Step>
            {enableBackLink[0].helpComponent ? enableBackLink[0].helpComponent : null}
          </Flex>,
        );
      } else if (isActiveArray && enableViewTitle && enableViewTitle[0]) {
        content.push(
          <Flex key={enableViewTitle[0].name} alignItems="center">
            <Step
              cursor="default"
              hover={COLORS.WHITE}
              type={fontType}
              // onClick={() => this.changeRoute(enableBackLink[0].fallBack, false)}
              extendStepTab={extendStepTab}
            >
              {enableViewTitle[0].name}
            </Step>
            {enableViewTitle[0].helpComponent ? enableViewTitle[0].helpComponent : null}
          </Flex>,
        );
      }
      return null;
    });

    return <Flex alignItems="center">{content.map(step => step)}</Flex>;
  }
}

export default withRouter(Breadcrumb);
