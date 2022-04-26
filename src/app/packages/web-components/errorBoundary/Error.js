import React from 'react';
import PropTypes from 'prop-types';
import { Flex } from 'grid-styled';
import Icons from '../../icons';

import ErrorContainer from './ErrorContainer';
import Text from '../text/Text';
import Button from '../buttons/Button';
import IconsStore from '../icon/IconsStore';
import { FONT_TYPES, FONT_WEIGHTS } from '../base/Typography';
import { COLORS } from '../base/Colors';

const Error = ({ title, smallTitle, desc, buttonText, buttonIcon, callbackAction, imageUrl }) => (
  <ErrorContainer width={1}>
    <Flex
      width={1}
      bg={COLORS.ILLUSTRATION_BACKGROUND}
      flexDirection="column"
      alignItems="center"
      justifyContent="space-around"
    >
      <Flex alignItems="center" justifyContent="center" width={0.7} height={0.7}>
        <Flex flexDirection="column" mr={40}>
          <Text tag="h1" type={FONT_TYPES.MEGA_TITLE} mb={8}>
            {title}
          </Text>
          <Text tag="h3" type={FONT_TYPES.SUPER_TITLE} mb={2}>
            {smallTitle}
          </Text>
          <Text
            tag="h5"
            type={FONT_TYPES.TITLE}
            width={350}
            fontWeight={FONT_WEIGHTS.LIGHT}
            color={COLORS.HELP_TEXT}
            mb={8}
          >
            {desc}
          </Text>
          <Flex alignItems="center" justifyContent="center">
            <Button
              color={COLORS.PRIMARY_BLUE}
              onClick={() => {
                window.location.reload();
              }}
              icon={new IconsStore(Icons).getIcon('dash')}
              iconWidth={12}
              mr={4}
            >
              Refresh Page
            </Button>
            {buttonText !== null && (
              <Button
                color={COLORS.PRIMARY_BLUE}
                onClick={callbackAction}
                icon={new IconsStore(Icons).getIcon(buttonIcon)}
                iconWidth={12}
                primary
              >
                {buttonText}
              </Button>
            )}
          </Flex>
        </Flex>
        <img src={imageUrl} width="300" alt="robot" />
      </Flex>
      <Flex alignItems="center" justifyContent="center" width={1} height={0.3}>
        <img src={`${process.env.REACT_APP_CDN_URL}/assets/logo-blue.png`} width="150" alt="logo" />
      </Flex>
    </Flex>
  </ErrorContainer>
);

Error.propTypes = {
  title: PropTypes.string,
  smallTitle: PropTypes.string,
  desc: PropTypes.string,
  buttonText: PropTypes.string,
  buttonIcon: PropTypes.string,
  callbackAction: PropTypes.func.isRequired,
  imageUrl: PropTypes.string.isRequired,
};

Error.defaultProps = {
  title: 'Oops!',
  smallTitle: 'Looks like something went wrong!',
  desc: 'Our engineering team is working on it. If you have any issues please call 16676',
};

export default Error;
