import React from 'react';
import { Text, View } from 'react-native';

const Header1 = (props) => {
  const { textStyle, viewStyle } = styles;

  return (
    <View style={viewStyle}>
      <Text style={textStyle}>{props.headerText}</Text>
    </View>
  );
};

const styles = {
  viewStyle: {
    backgroundColor: '#F8F8F8',
    justifyContent: 'center',
    alignItems: 'center',
    height: 60,
    paddingTop: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    elevation: 2,
    position: 'relative'
  },
  textStyle: {
    fontFamily: 'Helvetica-Bold',
    fontSize: 44,
    letterSpacing: 0,
    lineHeight: 43,
    color: '#FFFFFF'
  }
};
export { Header1 };
