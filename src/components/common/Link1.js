import React from 'react';
import { Text } from 'react-native';

const Link1 = (props) => {
  const { textStyle } = styles;
  const { onPress, linkText } = props;

  return (
    <Text style={textStyle} onPress={onPress}>{linkText.toUpperCase()}</Text>
  );
};

const styles = {
  textStyle: {
    fontFamily: 'Helvetica Neue',
    fontSize: 12,
    letterSpacing: 1.2,
    lineHeight: 16,
    color: '#424242',
    textDecorationLine: 'underline',
    textDecorationColor: '#424242'
  }
};
export { Link1 };
