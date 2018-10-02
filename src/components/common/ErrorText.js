import React from 'react';
import { Text } from 'react-native';
import { fontColors } from './BaseStyles';

const ErrorText = (props) => {
  const { textStyle } = styles;

  return (
    <Text style={textStyle}>{props.children}</Text>
  );
};

const styles = {
  textStyle: {
    fontFamily: 'HelveticaNeue-Bold',
    fontSize: 13,
    letterSpacing: 0,
    lineHeight: 18,
    color: fontColors.red
  }
};
export { ErrorText };
