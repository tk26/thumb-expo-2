// Import libraries for making a component
import React from 'react';
import { View } from 'react-native';

// Make a component
const Header = (props) => {
  const { viewStyle } = styles;

  return (
    <View style={viewStyle}>
      {props.children}
    </View>
  );
};

const styles = {
  viewStyle: {
    padding: 5,
    backgroundColor: '#fff',
    justifyContent: 'space-between',
    flexDirection: 'row',
    position: 'relative',
    height: 40
  }
};

// Make the component available to other parts of the app
export { Header };
