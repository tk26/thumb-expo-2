import React from 'react';
import { Text } from 'react-native';

const Link1 = (props) => {
  const { textStyle } = styles;

  return (
    <Text style={textStyle} onPress={props.onPress}>{props.children}</Text>
  );
};

const styles = {
  textStyle: {
    fontFamily: 'Helvetica Neue',
    fontSize: 12,
    letterSpacing: 1.2,
    lineHeight: 16,
    color: '#343538',
    textDecorationLine: 'underline',
    textDecorationColor: '#343538'
  }
};
export { Link1 };
