import React from 'react';
import { Image, View } from 'react-native';
import { primaryColors, fontColors } from './BaseStyles';

const ProfilePicture = ({ size, source }) => {
  const sizeStyle = styles[size];
  const imageStyle = {...styles.primary, width: sizeStyle.width, height: sizeStyle.height};
  return (
    <View style={styles.imageContainer}>
      <Image
        style={imageStyle}
        source={{uri: source}}
      />
    </View>
  );
};

const styles = {
  imageContainer: {
    height: 60
  },
  primary: {
    resizeMode: 'cover',
    borderColor: primaryColors.darkGrey,
    borderRadius: 100
  },
  small: {
    width: 50, height: 50,
  },
  medium: {
    width: 70, height: 70
  },
  large: {
    width: 90, height: 90
  },
  shadow: {
    position: 'absolute',
    top: 0, bottom: 0, left: 5, right: 5,
    borderRadius: 100,
    height: 45,
    width: 40
  }
}

export { ProfilePicture };
