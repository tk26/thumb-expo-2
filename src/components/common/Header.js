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
    paddingTop: 30,
    backgroundColor: '#fff',
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    height: 60
  }
};

// Make the component available to other parts of the app
export { Header };
