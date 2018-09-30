import React from 'react';
import { View } from 'react-native';

const WidthSpace = (props) => {
  const { width } = props;
  const style = getStyles(width);
  return (
    <View style={style}>
    </View>
  );
};

const getStyles = (width) => {
  return {
    width: width,
    flexDirection: 'column'
  }
}

export { WidthSpace };
