import React from 'react';
import { Text } from 'react-native';

const StandardText = (props) => {
  const { textStyle } = styles;

  return (
    <Text style={textStyle}>{props.children}</Text>
  );
};

const styles = {
  textStyle: {
    fontFamily: 'Helvetica Neue',
    fontSize: 13,
    letterSpacing: 0,
    lineHeight: 18,
    color: '#424242'
  }
};
export { StandardText };
