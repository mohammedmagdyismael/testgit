import React from 'react';
import PropTypes from 'prop-types';
import Icons from '../../icons';
import Text from '../text/Text';
import Icon from '../icon/Icon';
import IconsStore from '../icon/IconsStore';
import Colors from '../shared/Colors';
import withDisplayName from '../WithDisplayName';
import { FONT_TYPES } from '../base/Typography';
import './SignupStep.scss';

function SignupStep(props) {
  return (
    <div className="signup-step">
      {(!props.hideBackButton || props.hideBackButton === false) && (
        <div className="back-container">
          <button className="back-btn" onClick={props.backBtnAction}>
            <Icon
              icon={new IconsStore(Icons).getIcon('back_arrow')}
              width={14}
              color={Colors.vezeetaBlue}
            />
          </button>
        </div>
      )}
      <div className="content-container">
        <Text tag="h1" type={FONT_TYPES.TITLE} className="title">
          {props.title}
        </Text>
        <Text tag="h3" type={FONT_TYPES.SUBHEADING} className="subheading">
          {props.desc}
        </Text>
      </div>
    </div>
  );
}

SignupStep.propTypes = {
  title: PropTypes.string.isRequired,
  desc: PropTypes.string.isRequired,
  hideBackButton: PropTypes.bool,
  backBtnAction: PropTypes.func,
};

SignupStep.defaultProps = {
  hideBackButton: false,
  backBtnAction: () => {},
};

export default withDisplayName(SignupStep, 'SignupStep');
