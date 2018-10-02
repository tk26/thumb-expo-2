import React from 'react';
import { TouchableOpacity, Image } from 'react-native';
import images from '../../../assets/images/index';

const BackButton = ({ onPress }) => {
  const { buttonStyle, imageStyle  } = styles;

  return (
    <TouchableOpacity onPress={onPress} style={buttonStyle}>
      <Image source={images.icons.back_button} style={imageStyle}/>
    </TouchableOpacity>
  );
};


const styles = {
  buttonStyle: {
    flex: 1,
    alignSelf: 'stretch',
    backgroundColor: '#fff'
  },
  imageStyle: {
    height: 17, width: 10
  }
};

export { BackButton };
