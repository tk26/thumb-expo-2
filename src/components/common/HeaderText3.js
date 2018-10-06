import React from 'react';
import { Text } from 'react-native';
import { fontColors } from './BaseStyles';

const HeaderText3 = (props) => {
  const { textStyle } = styles;

  return (
    <Text style={textStyle}>{props.headerText}</Text>
  );
};

const styles = {
  textStyle: {
    fontFamily: 'HelveticaNeue-Bold',
    fontSize: 28,
    letterSpacing: 0,
    lineHeight: 27,
    color: fontColors.black
  }
};
export { HeaderText3 };
