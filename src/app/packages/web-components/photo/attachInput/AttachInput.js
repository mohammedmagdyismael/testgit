import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Icons from '../../../icons';
import { Flex } from 'grid-styled';
import styled from 'styled-components';
import { bgColor } from 'styled-system';

import Button from '../../buttons/Button';
import { COLORS } from '../../base/Colors';
import { FONT_WEIGHTS, FONT_TYPES } from '../../base/Typography';
import Icon from '../../icon/Icon';
import Text from '../../text/Text';
import IconsStore from '../../icon/IconsStore';
import withDisplayName from '../../WithDisplayName';

const previewRadius = 75;
const ImageContainer = Flex.extend`
  width: ${previewRadius}px;
  min-width: ${previewRadius}px;
  height: ${previewRadius}px;
  min-height: ${previewRadius}px;
  border-radius: 4px;
  overflow: hidden;
`;

const Image = styled.img`
  ${bgColor};
  object-fit: cover;
`;

class AttachInput extends Component {
  iconsStore = new IconsStore(Icons);

  /**
   * Returns the photo object
   */
  loadPreview = () => {
    const { loadPreview, updatePhoto, photoPreview } = this.props;

    loadPreview(this.input, photo => {
      const reader = new FileReader();
      reader.readAsDataURL(photo);
      reader.onloadend = () => {
        updatePhoto({
          preview: reader.result ? reader.result : photoPreview,
          crop: reader.result,
          isPhoto: true,
          showCropper: false,
        });
      };
    });
  };

  /**
   * Opens file dialog
   */
  openFileDialog = () => {
    this.input.click();
  };

  render() {
    const {
      desc,
      photoPreview,
      isPhoto,
      isRequired,
      disabled,
      isDanger,
      errorMessage,
      language,
    } = this.props;

    return (
      <Flex alignItems="center">
        <input
          type="file"
          ref={input => {
            this.input = input;
          }}
          accept=".png, .jpg, .jpeg"
          onChange={this.loadPreview}
          hidden
          autoComplete="off"
        />
        <ImageContainer alignItems="center" justifyContent="center" bg={COLORS.PAGE_BACKGROUND}>
          {photoPreview && isPhoto ? (
            <Image
              src={photoPreview}
              ref={img => {
                this.img = img;
              }}
              alt="attachment"
              width={previewRadius}
              height={previewRadius}
            />
          ) : (
            <Icon
              icon={this.iconsStore.getIcon('camera')}
              width={22}
              color={disabled ? COLORS.DISABLED : COLORS.PRIMARY_BLUE}
            />
          )}
        </ImageContainer>
        <Flex flexDirection="column" m={language === 'en' ? '0 0 0 12px' : '0 12px 0 0'}>
          <Flex alignItems="center">
            <Text fontWeight={FONT_WEIGHTS.SEMI_BOLD}>{`${desc}${isRequired ? '*' : ''}`}</Text>
            {isDanger && (
              <Text ml={2} color={COLORS.PRIMARY_RED} type={FONT_TYPES.CAPTION}>
                {errorMessage}
              </Text>
            )}
          </Flex>

          <Button primary={false} mt={2} onClick={this.openFileDialog} color={COLORS.PRIMARY_BLUE}>
            {language === 'en' ? 'Upload' : 'رفع'}
          </Button>
        </Flex>
      </Flex>
    );
  }
}

AttachInput.propTypes = {
  desc: PropTypes.string.isRequired,
  updatePhoto: PropTypes.func.isRequired,
  loadPreview: PropTypes.func.isRequired,
  isDanger: PropTypes.bool.isRequired,
  isPhoto: PropTypes.bool,
  errorMessage: PropTypes.string,
  isRequired: PropTypes.bool.isRequired,
  photoPreview: PropTypes.string,
  disabled: PropTypes.bool,
  language: PropTypes.string.isRequired,
};

AttachInput.defaultProps = {
  errorMessage: '',
  isPhoto: false,
  photoPreview: undefined,
  disabled: false,
};

export default withDisplayName(AttachInput, 'PhotoInput');
