import React from 'react';
import PropTypes from 'prop-types';
import { compose, lifecycle, withProps } from 'recompose';
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from 'react-google-maps';
import _ from 'lodash';
import { SearchBox } from 'react-google-maps/lib/components/places/SearchBox';
import Icons from '../../icons';
import { Flex } from 'grid-styled';

import Container from './Container';
import Loading from './Loading';
import Text from '../text/Text';
import Space from '../base/Space';
import IconsStore from '../icon/IconsStore';
import Button from '../buttons/Button';
import { COLORS } from '../base/Colors';
import { FONT_WEIGHTS } from '../base/Typography';

const onChangeMiddleware = ({ lat, lng }) => ({
  lat: lat(),
  lng: lng(),
});

const GoogleMaps = compose(
  withProps(props => ({
    googleMapURL: `https://maps.googleapis.com/maps/api/js?key=${
      process.env.REACT_APP_GOOGLE_MAPS_KEY
    }&v=3.exp&libraries=geometry,drawing,places`,
    loadingElement: <Loading height={props.height} radius={props.radius} />,
    containerElement: <Container height={props.height} />,
    mapElement: <div style={{ height: '100%', width: '100%' }} />,
  })),
  lifecycle({
    componentWillReceiveProps(nextProps) {
      if (nextProps.lat !== this.props.lat || nextProps.lng !== this.props.lng) {
        this.setState({
          center: {
            lat: nextProps.lat,
            lng: nextProps.lng,
          },
        });
      }
    },
    componentWillMount() {
      const refs = {};
      const { lat, lng, onChange } = this.props;

      this.setState({
        bounds: null,
        center: {
          lat,
          lng,
        },
        markers: [],
        onMapMounted: ref => {
          refs.map = ref;
        },
        onBoundsChanged: () => {
          this.setState({
            bounds: refs.map.getBounds(),
            center: refs.map.getCenter(),
          });
        },
        onSearchBoxMounted: ref => {
          refs.searchBox = ref;
        },
        onPlacesChanged: () => {
          const places = refs.searchBox.getPlaces();
          const bounds = new window.google.maps.LatLngBounds();

          places.forEach(place => {
            if (place.geometry.viewport) {
              bounds.union(place.geometry.viewport);
            } else {
              bounds.extend(place.geometry.location);
            }
          });
          const nextMarkers = places.map(place => ({
            position: place.geometry.location,
          }));

          const nextCenter = _.get(nextMarkers, '0.position', this.state.center);

          this.setState(
            {
              center: nextCenter,
              markers: nextCenter,
            },
            () => {
              onChange(onChangeMiddleware(nextCenter));
            },
          );
        },
        getCurrentLocation: () => {
          if ('geolocation' in navigator) {
            this.setState({
              isGettingLocation: true,
            });

            navigator.geolocation.getCurrentPosition(location => {
              this.setState({
                isGettingLocation: false,
                center: {
                  lat: location.coords.latitude,
                  lng: location.coords.longitude,
                },
              });
            });
          }
        },
      });
    },
  }),
  withScriptjs,
  withGoogleMap,
)(props => {
  const {
    center,
    isMarkerDraggable,
    onChange,
    defaultZoom,
    onSearchBoxMounted,
    bounds,
    onPlacesChanged,
    getCurrentLocation,
    isGettingLocation,
    showGetCurrentLocation,
    options,
    searhText,
    permissionText,
    getLocationText,
  } = props;

  return (
    <Flex flexDirection="column" width={1}>
      <GoogleMap
        clickableIcons={false}
        defaultZoom={defaultZoom}
        defaultCenter={center}
        center={center}
        options={options}
      >
        <Marker
          onDragEnd={location => {
            onChange(onChangeMiddleware(location.latLng));
          }}
          position={center}
          draggable={isMarkerDraggable}
        />
        {props.showSearch && (
          <SearchBox
            ref={onSearchBoxMounted}
            bounds={bounds}
            controlPosition={window.google.maps.ControlPosition.TOP_CENTER}
            onPlacesChanged={onPlacesChanged}
          >
            <input
              autoComplete="off"
              type="text"
              placeholder={searhText}
              style={{
                boxSizing: 'border-box',
                border: '1px solid transparent',
                width: '70%',
                height: '34px',
                marginTop: `${Space[3]}px`,
                padding: `0 ${Space[4]}px`,
                borderRadius: '4px',
                boxShadow: '0 2px 6px rgba(0, 0, 0, 0.3)',
                fontSize: '13px',
                outline: 'none',
                textOverflow: 'ellipses',
              }}
            />
          </SearchBox>
        )}
      </GoogleMap>

      {showGetCurrentLocation && (
        <Flex
          p={3}
          width={1}
          alignItems="center"
          justifyContent="space-between"
          bg={COLORS.PAGE_BACKGROUND}
        >
          <Text fontWeight={FONT_WEIGHTS.SEMI_BOLD} width={0.5}>
            {permissionText}
          </Text>
          <Button
            primary={false}
            icon={new IconsStore(Icons).getIcon('gps')}
            iconWidth={14}
            color={COLORS.PRIMARY_BLUE}
            onClick={getCurrentLocation}
            disabled={isGettingLocation}
          >
            {getLocationText}
          </Button>
        </Flex>
      )}
    </Flex>
  );
});

GoogleMaps.propTypes = {
  lat: PropTypes.number.isRequired,
  lng: PropTypes.number.isRequired,
  defaultZoom: PropTypes.number,
  showSearch: PropTypes.bool,
  isMarkerDraggable: PropTypes.bool,
  showGetCurrentLocation: PropTypes.bool,
  onChange: PropTypes.func,
  options: PropTypes.any, // eslint-disable-line
  getLocationText: PropTypes.string,
  permissionText: PropTypes.string,
  searhText: PropTypes.string,
};

GoogleMaps.defaultProps = {
  height: 300,
  defaultZoom: 14,
  showSearch: false,
  isMarkerDraggable: false,
  showGetCurrentLocation: true,
  onChange: () => {},
  getLocationText: 'Get my Location',
  permissionText: 'Vezeeta needs permission to detect your location.',
  searhText: 'Search',
};

export default GoogleMaps;
