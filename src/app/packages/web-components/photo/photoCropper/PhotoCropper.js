import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ClassNames from 'classnames';
import AvatarEditor from 'react-avatar-editor';
import Icons from '../../../icons';

import Text from '../../text/Text';
import Button from '../../buttons/Button';
import Icon from '../../icon/Icon';
import IconsStore from '../../icon/IconsStore';
import Colors from '../../shared/Colors';
import { FONT_TYPES } from '../../base/Typography';
import withDisplayName from '../../WithDisplayName';
import './PhotoCropper.scss';
import { COLORS } from '../../base/Colors';
import { PHOTO_SHAPE } from '../constants';

class PhotoCropper extends Component {
  constructor(props) {
    super(props);

    this.iconsStore = new IconsStore(Icons);
    this.state = {
      zoomImage: 1.5,
    };
    this.photoOriginal = {
      value: this.props.photoCrop,
      zoom: this.state.zoomImage,
      styleRuleValue: 0.5,
    };
  }

  componentWillMount() {
    const value = 0.5;
    this.insertStyleRule(value);
  }

  /**
   * sets the cropped image value and preview it
   */
  setImage = () => {
    const { updatePhoto, photoCrop } = this.props;

    updatePhoto({
      preview: this.imageCropped.getImage().toDataURL(),
      crop: photoCrop,
      isPhoto: true,
      showCropper: false,
    });
    this.photoOriginal.value = photoCrop;
  };

  /**
   * sets the scale value and its' style
   */
  setZoomImageValue = () => {
    this.setState({ zoomImage: Number(this.zoomImageRange.value) });
    this.photoOriginal.zoom = Number(this.zoomImageRange.value);

    this.zoomImageRange.oninput = () => {
      const value =
        (this.zoomImageRange.value - this.zoomImageRange.min) /
        (this.zoomImageRange.max - this.zoomImageRange.min);
      this.photoOriginal.styleRuleValue = value;
      this.insertStyleRule(value);
    };

    this.zoomImageRange.onchange = () => {
      const value =
        (this.zoomImageRange.value - this.zoomImageRange.min) /
        (this.zoomImageRange.max - this.zoomImageRange.min);
      this.photoOriginal.styleRuleValue = value;
      this.insertStyleRule(value);
    };
  };

  insertStyleRule = value => {
    const { rangeClassName } = this.props;

    if (global.window) {
      let prefixBrowser = null;

      if (
        navigator.userAgent.toLowerCase().indexOf('chrome') > -1 ||
        navigator.userAgent.toLowerCase().indexOf('safari') > -1
      ) {
        prefixBrowser = '::-webkit-slider-runnable-track';
      } else if (navigator.userAgent.toLowerCase().indexOf('firefox') > -1) {
        prefixBrowser = '::-moz-range-track';
      } else {
        prefixBrowser = '::-ms-track';
      }

      const style = (() => {
        const cssStyle = document.createElement('style');
        cssStyle.appendChild(document.createTextNode(''));
        document.head.appendChild(cssStyle);
        return cssStyle;
      })();

      style.sheet.insertRule(
        `input.${rangeClassName}[type=range]${prefixBrowser} { background: -ms-linear-gradient(left, ${
          Colors.vezeetaBlue
        } ${value}, ${Colors.mediumGrey} ${value})!important;
              background: -moz-linear-gradient(left, ${Colors.vezeetaBlue} ${value}, ${
          Colors.mediumGrey
        } ${value})!important;
              background: -o-linear-gradient(left, ${Colors.vezeetaBlue} ${value}, ${
          Colors.mediumGrey
        } ${value})!important;
              background: -webkit-gradient(linear,left top,right top,color-stop(${value}, ${
          Colors.vezeetaBlue
        }),color-stop(${value}, ${Colors.mediumGrey}))!important;
              background: -webkit-linear-gradient(left, ${Colors.vezeetaBlue} ${value}, ${
          Colors.mediumGrey
        } ${value})!important;
              background: linear-gradient(to right, ${Colors.vezeetaBlue} ${value}, ${
          Colors.mediumGrey
        } ${value})!important; }`,
        0,
      );
    }
  };

  /**
   * Loads the image from local device and load a preview
   */
  loadPreview = () => {
    const { loadPreview, updatePhoto, photoPreview, isPhoto } = this.props;

    loadPreview(this.input, photo => {
      const reader = new FileReader();
      const value = 0.5;
      reader.readAsDataURL(photo);

      reader.onloadend = () => {
        updatePhoto({
          preview: photoPreview,
          crop: reader.result,
          isPhoto,
          showCropper: true,
        });
        this.input.value = null;
        this.setState({ zoomImage: 1.5 });
        this.insertStyleRule(value);
      };
    });
  };

  /**
   * Draws the guide line in the crop area
   */
  drawImageGuideLine = () => {
    const c = document.getElementById('image-guide-lines');
    const ctx = c.getContext('2d');

    ctx.beginPath();
    ctx.moveTo(85, 0);
    ctx.lineTo(85, 150);
    ctx.lineWidth = 0.3;
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(215, 0);
    ctx.lineTo(215, 150);
    ctx.lineWidth = 0.3;
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(0, 114.5);
    ctx.lineTo(300, 114.5);
    ctx.lineWidth = 0.15;
    ctx.stroke();
  };

  /**
   * Opens file dialog
   */
  openFileDialog = () => {
    this.input.click();
  };

  /**
   * Cancels the image that uploaded and doesn't crop it or preview it
   */
  cancelImage = () => {
    const { updatePhoto, photoPreview, isPhoto } = this.props;

    updatePhoto({
      preview: photoPreview,
      crop: this.photoOriginal.value,
      isPhoto,
      showCropper: false,
    });

    if (!isPhoto) {
      const value = 0.5;
      this.setState({ zoomImage: 1.5 });
      this.insertStyleRule(value);
    }

    this.setState({ zoomImage: this.photoOriginal.zoom });
    this.insertStyleRule(this.photoOriginal.styleRuleValue);
  };

  render() {
    const { showCropper, photoCrop, rangeClassName, shape, language } = this.props;
    const { zoomImage } = this.state;

    const { radius } = shape ? PHOTO_SHAPE[shape] : PHOTO_SHAPE.CIRCLE;

    return (
      <div className={ClassNames('crop-container', showCropper ? '' : 'hide')}>
        <div className="crop-image-tool-container">
          <input
            type="file"
            ref={input => {
              this.input = input;
            }}
            accept=".png, .jpg, .jpeg"
            onChange={this.loadPreview}
            autoComplete="off"
          />
          <div className="header flex-row">
            <div className="center">
              <Text tag="h1" type={FONT_TYPES.TITLE} className="title">
                {language === 'en' ? 'Upload Photo' : 'رفع صورة'}
              </Text>
            </div>
            <button className="close-btn" onClick={this.cancelImage}>
              <Icon icon={this.iconsStore.getIcon('close')} width={12} color={COLORS.TEXT} />
            </button>
          </div>
          <div className="crop-area-container">
            <canvas id="image-guide-lines" />

            <AvatarEditor
              ref={imageCropped => {
                this.imageCropped = imageCropped;
              }}
              image={photoCrop}
              width={200}
              height={200}
              border={50}
              borderRadius={radius}
              color={[0, 0, 0, 0.3]} // RGBA
              scale={zoomImage}
              rotate={0}
              onImageReady={this.drawImageGuideLine}
            />
          </div>
          <div className="zoom-range-container">
            <Text m={language === 'en' ? '0 16px 0 0' : '0 0 0 16px'}>
              {language === 'en' ? 'Zoom' : 'تكبير'}
            </Text>
            <input
              className={`track_range ${rangeClassName}`}
              type="range"
              step="0.01"
              min="1"
              max="2"
              name="scale"
              ref={zoomImageRange => {
                this.zoomImageRange = zoomImageRange;
              }}
              onChange={this.setZoomImageValue}
              value={zoomImage}
              autoComplete="off"
            />
          </div>
          <div className="btns-container">
            <div className="button-container">
              <Button primary={false} onClick={this.openFileDialog}>
                {language === 'en' ? 'Change Photo' : 'تغيير الصورة'}
              </Button>
            </div>
            <div className="button-container">
              <Button primary={false} color={COLORS.PRIMARY_BLUE} onClick={this.setImage}>
                {language === 'en' ? 'Save And Crop' : 'حفظ'}
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

PhotoCropper.propTypes = {
  rangeClassName: PropTypes.string.isRequired,
  photoPreview: PropTypes.string,
  photoCrop: PropTypes.string,
  isPhoto: PropTypes.bool,
  showCropper: PropTypes.bool,
  updatePhoto: PropTypes.func.isRequired,
  loadPreview: PropTypes.func.isRequired,
  shape: PropTypes.oneOf(['CIRCLE', 'SQUARE']),
  language: PropTypes.string.isRequired,
};

PhotoCropper.defaultProps = {
  photoPreview: undefined,
  photoCrop: undefined,
  isPhoto: false,
  showCropper: false,
  shape: 'CIRCLE',
};

export default withDisplayName(PhotoCropper, 'PhotoCropper');
