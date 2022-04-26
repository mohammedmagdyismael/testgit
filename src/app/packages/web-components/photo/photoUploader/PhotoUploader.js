import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ClassNames from 'classnames';
import styled from 'styled-components';

import PhotoInput from '../photoInput/PhotoInput';
import AttachInput from '../attachInput/AttachInput';
import PhotoCropper from '../photoCropper/PhotoCropper';
import ErrorMessage from './ErrorMessage';
import withDisplayName from '../../WithDisplayName';
import { COLORS } from '../../base/Colors';
import { FONT_TYPES } from '../../base/Typography';
import { PHOTO_FIELD_TYPE, PHOTO_VALIDATION, PHOTO_SHAPE } from '../constants';

// TODO: add action to showCropper prop

const Container = styled.div`
  position: relative;
  pointer-events: ${props => (props.disabled ? 'none' : 'initial')};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

class PhotoUploader extends Component {
  constructor(props) {
    super(props);

    this.imgPlaceholder = `${process.env.REACT_APP_CDN_URL}/assets/img-placeholder.png`;

    this.state = {
      preview: this.props.value || this.imgPlaceholder,
      crop: this.props.value || this.imgPlaceholder,
      isPhoto: this.props.value !== undefined,
      showCropper: false,
      isDanger: false,
    };
  }

  /**
   * When the image failed to load
   */
  onError = () => {
    this.updatePhoto({
      preview: this.imgPlaceholder,
      crop: this.imgPlaceholder,
      isPhoto: false,
      showCropper: false,
    });
  };

  /**
   * Returns the current value of the uploaded photo
   */
  getInputValue() {
    this.photoInput.getInputValue();
  }

  /**
   * Takes an object and updates it in the component's state
   * @param {object} newData
   */
  updatePhoto = newData => {
    const { onChange } = this.props;
    const { preview, crop, isPhoto, showCropper } = newData;

    this.setState(
      {
        preview,
        crop,
        isPhoto,
        showCropper,
      },
      () => {
        this.validate();
      },
    );

    const extension = crop.substring('data:image/'.length, crop.indexOf(';base64'));

    if (onChange) {
      if (isPhoto) {
        onChange(preview, extension);
      }
    }
  };

  loadPreview = (inputFile, callback) => {
    const input = inputFile;
    const { resize, language, overridePhotoValidationObject } = this.props;

    if (input.files && input.files[0]) {
      const img = new Image();
      const photo = input.files[0];
      const photoName = photo.name;

      img.src = window.URL.createObjectURL(photo);

      img.onload = () => {
        const photoSize = photo.size;
        // check if overridePhotoValidationObject prop is provided and not empty
        const { MAX_PHOTO_HEIGHT, MAX_PHOTO_WIDTH, MAX_PHOTO_SIZE_IN_BYTES } =
          overridePhotoValidationObject && Object.keys(overridePhotoValidationObject).length !== 0
            ? overridePhotoValidationObject
            : PHOTO_VALIDATION;
        const maxPhotSizeInMb = parseInt(MAX_PHOTO_SIZE_IN_BYTES) / 1048576;
        let { width, height } = img;

        window.URL.revokeObjectURL(img.src);

        if (photoSize > MAX_PHOTO_SIZE_IN_BYTES) {
          this.showErrorMessage(
            language === 'en'
              ? `Maximum allowed is ${maxPhotSizeInMb} MBs`
              : `الحد الأقصى المسموح به هو ${maxPhotSizeInMb.toLocaleString('ar-EG')} ميجابايت`,
          );
          this.onError();
        } else if (
          photo.type !== 'image/png' &&
          photo.type !== 'image/jpg' &&
          photo.type !== 'image/jpeg'
        ) {
          this.showErrorMessage(
            language === 'en'
              ? 'Only files with these extensions are allowed: jpg, jpeg, png'
              : 'jpg, jpeg, png نحن ندعم الصيغ التالية فقط',
          );
          this.onError();
        } else {
          const reader = new FileReader();
          reader.readAsDataURL(photo);
          reader.onloadend = () => {
            const canvas = document.createElement('canvas');
            let ctx = canvas.getContext('2d');

            if (resize) {
              if (width > height) {
                if (width > MAX_PHOTO_WIDTH) {
                  height *= MAX_PHOTO_WIDTH / width;
                  width = MAX_PHOTO_WIDTH;
                }
              } else if (height > MAX_PHOTO_HEIGHT) {
                width *= MAX_PHOTO_HEIGHT / height;
                height = MAX_PHOTO_HEIGHT;
              }
            }
            canvas.width = width;
            canvas.height = height;

            ctx.drawImage(img, 0, 0, width, height);
            ctx = canvas.getContext('2d');

            let resizedPhoto;
            ctx.canvas.toBlob(
              blob => {
                resizedPhoto = new File([blob], photoName, {
                  type: 'image/jpeg',
                  lastModified: Date.now(),
                });

                callback(resizedPhoto);
                this.hideErrorMessage();
              },
              'image/jpeg',
              1,
            );
          };
        }
      };

      img.onerror = () => {
        this.showErrorMessage(
          language === 'en'
            ? 'Only files with these extensions are allowed: jpg, jpeg, png'
            : 'jpg, jpeg, png نحن ندعم الصيغ التالية فقط',
        );
        this.onError();
      };
    }
  };

  focus = () => {};

  isValid = () => {
    const { isRequired, language } = this.props;
    const { isPhoto, isDanger } = this.state;

    if (isRequired) {
      if (!isPhoto || isDanger) {
        this.showErrorMessage(language === 'en' ? 'Photo required' : 'الصورة مطلوبة');
      }
      return isPhoto && !isDanger;
    }

    return true;
  };

  validate = () => {
    const { isRequired } = this.props;
    const { showCropper, isPhoto, isDanger } = this.state;

    if (isRequired) {
      if (!isPhoto && !isDanger && !showCropper) {
        this.showErrorMessage(this.props.language === 'en' ? 'Photo required' : 'الصورة مطلوبة');
      } else if (!isDanger) {
        this.hideErrorMessage();
      }
    }
  };

  /**
   * Change the error message and change the isDanger state to true
   * @param {string} message
   */
  showErrorMessage = message => {
    this.setState({
      errorMessage: message,
      isDanger: true,
    });
  };

  /**
   * Change the idDanger state to false
   */
  hideErrorMessage = () => {
    this.setState({
      isDanger: false,
    });
  };

  render() {
    const {
      type,
      disabled,
      desc,
      isRequired,
      containerClassName,
      className,
      shape,
      language,
    } = this.props;
    const { preview, crop, isPhoto, showCropper, isDanger, errorMessage } = this.state;

    if (type === PHOTO_FIELD_TYPE.ATTACHMENT) {
      return (
        <Container disabled={disabled} className={ClassNames(containerClassName)}>
          <AttachInput
            photoPreview={preview}
            photoCrop={crop}
            isPhoto={isPhoto}
            showCropper={showCropper}
            updatePhoto={this.updatePhoto}
            loadPreview={this.loadPreview}
            isDanger={isDanger}
            errorMessage={errorMessage}
            ref={photoInput => {
              this.photoInput = photoInput;
            }}
            desc={desc}
            disabled={disabled}
            isRequired={isRequired}
            language={language}
          />
        </Container>
      );
    }
    return (
      <Container disabled={disabled} className={ClassNames(containerClassName)}>
        <PhotoInput
          photoPreview={preview}
          photoCrop={crop}
          isPhoto={isPhoto}
          showCropper={showCropper}
          updatePhoto={this.updatePhoto}
          loadPreview={this.loadPreview}
          ref={photoInput => {
            this.photoInput = photoInput;
          }}
          disabled={disabled}
          imgPlaceholder={this.imgPlaceholder}
        />
        <PhotoCropper
          rangeClassName={className}
          photoPreview={preview}
          photoCrop={crop}
          shape={shape}
          isPhoto={isPhoto}
          showCropper={showCropper}
          updatePhoto={this.updatePhoto}
          loadPreview={this.loadPreview}
          language={language}
        />
        {isDanger && (
          <ErrorMessage
            mt={2}
            textAlign="center"
            color={COLORS.PRIMARY_RED}
            type={FONT_TYPES.CAPTION}
          >
            {errorMessage}
          </ErrorMessage>
        )}
      </Container>
    );
  }
}

PhotoUploader.propTypes = {
  className: PropTypes.string,
  containerClassName: PropTypes.string,
  value: PropTypes.string,
  showCropper: PropTypes.bool, // eslint-disable-line
  shape: PropTypes.oneOf([PHOTO_SHAPE.CIRCLE, PHOTO_SHAPE.SQUARE]),
  onChange: PropTypes.func,
  isRequired: PropTypes.bool,
  type: PropTypes.oneOf([PHOTO_FIELD_TYPE.PERSONAL, PHOTO_FIELD_TYPE.ATTACHMENT]),
  desc: PropTypes.string,
  disabled: PropTypes.bool,
  resize: PropTypes.bool,
  language: PropTypes.string,
  overridePhotoValidationObject: PropTypes.object, // eslint-disable-line
};

PhotoUploader.defaultProps = {
  className: undefined,
  showCropper: true,
  containerClassName: undefined,
  value: undefined,
  isRequired: false,
  onChange: () => {},
  type: PHOTO_FIELD_TYPE.PERSONAL,
  desc: undefined,
  disabled: false,
  resize: true,
  language: 'en',
  overridePhotoValidationObject: {},
};

export { PHOTO_FIELD_TYPE };
export default withDisplayName(PhotoUploader, 'PhotoUploader');
