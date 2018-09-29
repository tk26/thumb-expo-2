import React from 'react';
import { Image } from 'react-native';
import images from '../../../assets/images/index';

const Logo = ({ size, includeText }) => {
  const text = includeText ? 'withtext_' : '';
  const logos = images.logos;
  let imageSource = 'logo_' + text + size;
  let imageStyle;
  switch(size){
    case 'small':
      imageStyle = styles.smallLogo;
      break;
    case 'medium':
      imageStyle = styles.mediumLogo;
      break;
    default:
      imageStyle = styles.largeLogo;
      break;
  }
  return (
    <Image style={imageStyle}  source={logos[imageSource]}/>
  );
};

const styles = {
  smallLogo: {
    width: 60, height: 60, resizeMode: 'contain'
  },
  mediumLogo: {
    width: 120, height: 120, resizeMode: 'contain'
  },
  largeLogo: {
    width: 180, height: 180, resizeMode: 'contain'
  }
}

export { Logo };
