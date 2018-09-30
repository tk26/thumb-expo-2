import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

const Button = ({ onPress, children, size }) => {
  const { buttonStyle, textStyle, stripe } = styles;

  return (
    <TouchableOpacity onPress={onPress} style={buttonStyle}>
      <View style={stripe}></View>
      <Text style={textStyle}>
        {children}
      </Text>
    </TouchableOpacity>
  );
};


const styles = {
  stripe: {
    backgroundColor: '#98FB98',
    position: 'absolute',
    height: 8,
    top: 18,
    left: 0,
    right: 0,
    bottom: 0
  },
  textStyle: {
    alignSelf: 'center',
    color: '#424242',
    fontSize: 16,
    fontFamily: 'Helvetica Neue',
    fontWeight: '600',
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 15,
    paddingRight: 15
  },
  buttonStyle: {
    alignSelf: 'center',
    backgroundColor: '#fff',
    maxWidth: 150
  }
};

export { Button };
