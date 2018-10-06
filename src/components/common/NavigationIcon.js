import React from 'react';
import { View, Image, Text } from 'react-native';

const NavigationIcon = ({ icon, label }) => {
  const { buttonStyle, imageStyle, labelStyle  } = styles;

  return (
    <View style={buttonStyle}>
      <Image source={icon} style={imageStyle}/>
      <Text style={labelStyle}>{label.toLowerCase()}</Text>
    </View >
  );
};


const styles = {
  buttonStyle: {
    backgroundColor: '#fff',
    alignSelf: 'center',
    alignItems: 'center'
  },
  imageStyle: {
    height: 20,
    width: 20,
    resizeMode: 'contain',
    alignSelf: 'center'
  },
  labelStyle: {
    fontSize: 9,
    color: '#424242',
    fontFamily: 'HelveticaNeue-Medium',
    alignSelf: 'center',
    letterSpacing: 0
  }
};

export { NavigationIcon };
