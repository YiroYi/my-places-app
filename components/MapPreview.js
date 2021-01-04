import React from 'react';
import { View, Image, StyleSheet, TouchableOpacity } from 'react-native';

import ENV from '../env';

const MapPreview = props => {
  console.log(props.location)
  let imagePreviewUrl;

  if (props.location) {
    imagePreviewUrl = `https://maps.geoapify.com/v1/staticmap?style=osm-carto&width=600&height=400&center=lonlat:${props.location.lng},${props.location.lat}&zoom=16&apiKey=${ENV.googleApiKey}`
  }
  console.log(imagePreviewUrl);

  return (
    <TouchableOpacity onPress={props.onPress} style={{ ...styles.mapPreview, ...props.style }}>
      {props.location ? (
        <Image style={styles.mapImage} source={{ uri: imagePreviewUrl }} />
      ) : (
        props.children
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  mapPreview: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  mapImage: {
    width: '100%',
    height: '100%'
  }
});

export default MapPreview;
