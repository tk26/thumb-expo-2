import React from 'react';
import { View } from 'react-native';

const Space = (props) => {
  const { height } = props;
  const style = getStyles(height);
  return (
    <View style={style}>
    </View>
  );
};

const getStyles = (height) => {
  return {
    height: height,
    flexDirection: 'row'
  }
}

export { Space };
