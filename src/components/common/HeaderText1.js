import React from 'react';
import { Text } from 'react-native';
import { fontColors } from './BaseStyles';

const HeaderText1 = (props) => {
  const { textStyle } = styles;

  return (
    <Text style={textStyle}>{props.headerText}</Text>
  );
};

const styles = {
  textStyle: {
    fontFamily: 'HelveticaNeue-Bold',
    fontSize: 44,
    letterSpacing: 0,
    lineHeight: 43,
    color: fontColors.black
  }
};
export { HeaderText1 };
