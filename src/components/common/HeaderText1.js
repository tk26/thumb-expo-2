import React from 'react';
import { Text, View } from 'react-native';

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
    color: '#212121'
  }
};
export { HeaderText1 };
