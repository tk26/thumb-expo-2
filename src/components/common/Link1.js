import React from 'react';
import { Text } from 'react-native';
import { fontColors } from './BaseStyles';

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
    color: fontColors.lightBlack,
    textDecorationLine: 'underline',
    textDecorationColor: fontColors.lightBlack
  }
};
export { Link1 };
