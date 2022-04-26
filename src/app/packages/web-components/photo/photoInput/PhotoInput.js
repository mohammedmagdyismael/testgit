import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Icons from '../../../icons';

import Icon from '../../icon/Icon';
import IconsStore from '../../icon/IconsStore';
import { COLORS } from '../../base/Colors';
import withDisplayName from '../../WithDisplayName';
import './PhotoInput.scss';

class PhotoInput extends Component {
  constructor(props) {
    super(props);

    this.iconsStore = new IconsStore(Icons);
  }

  /**
   * Returns the photo object
   */
  getInputValue() {
    return this.img.src;
  }

  /**
   * Opens file dialog
   */
  openFileDialog = () => {
    this.input.click();
  };

  /**
   * Loads the image from local device and load a preview
   */
  loadPreview = () => {
    const { loadPreview, photoPreview, isPhoto } = this.props;

    loadPreview(this.input, photo => {
      const reader = new FileReader();
      reader.readAsDataURL(photo);

      reader.onloadend = () => {
        this.props.updatePhoto({
          preview: photoPreview,
          crop: reader.result,
          isPhoto,
          showCropper: true,
        });
        this.input.value = null;
      };
    });
  };

  /**
   * Check if open file dialog or image cropper tool
   */
  uploadPhoto = () => {
    const { updatePhoto, photoPreview, photoCrop, isPhoto } = this.props;

    if (isPhoto) {
      updatePhoto({
        preview: photoPreview,
        crop: photoCrop,
        isPhoto,
        showCropper: true,
      });
    } else {
      this.input.click();
    }
  };

  render() {
    const { isPhoto, photoPreview, disabled } = this.props;
    let icon;

    if (isPhoto) {
      icon = '';
    } else {
      icon = (
        <Icon
          icon={this.iconsStore.getIcon('camera')}
          width={30}
          color={disabled ? COLORS.DISABLED : COLORS.PRIMARY_BLUE}
        />
      );
    }

    return (
      <div className="upload-photo-container">
        <div className="upload-photo" onClick={this.uploadPhoto} onKeyDown={() => {}}>
          <img
            src={photoPreview}
            ref={img => {
              this.img = img;
            }}
            alt="doctor"
            onError={this.onError}
          />
          {icon}
          <input
            autoComplete="off"
            className="hide"
            type="file"
            ref={input => {
              this.input = input;
            }}
            accept=".png, .jpg, .jpeg"
            onChange={this.loadPreview}
          />
        </div>
      </div>
    );
  }
}

PhotoInput.propTypes = {
  photoPreview: PropTypes.string.isRequired,
  photoCrop: PropTypes.string.isRequired,
  isPhoto: PropTypes.bool.isRequired,
  updatePhoto: PropTypes.func.isRequired,
  loadPreview: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
};

PhotoInput.defaultProps = {
  disabled: false,
};

export default withDisplayName(PhotoInput, 'PhotoInput');
