import React from 'react';
import { Image } from 'react-native';
import images from '../../../assets/images/index';

const Logo = ({ size, includeText }) => {
  const text = includeText ? 'withtext_' : '';
  const logos = images.logos;
  const imageSource = 'logo_' + text + size;
  const imageStyle = styles[imageSource];
  return (
    <Image style={imageStyle}  source={logos[imageSource]}/>
  );
};

const styles = {
  logo_small: {
    width: 60, height: 60, resizeMode: 'contain'
  },
  logo_medium: {
    width: 120, height: 120, resizeMode: 'contain'
  },
  logo_large: {
    width: 180, height: 180, resizeMode: 'contain'
  },
  logo_withtext_small: {
    width: 60, height: 80, resizeMode: 'contain'
  },
  logo_withtext_medium: {
    width: 124, height: 158, resizeMode: 'contain'
  },
  logo_withtext_large: {
    width: 186, height: 236, resizeMode: 'contain'
  },
}

export { Logo };
