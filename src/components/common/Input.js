import React from 'react';
import { TextInput, View, Text } from 'react-native';

const Input = ({ value, onChangeText, placeholder, secureTextEntry, autoCorrect, autoCapitalize }) => {
  const { inputStyle, containerStyle } = styles;

  return (
    <View style={containerStyle}>
      <TextInput
        secureTextEntry={secureTextEntry}
        placeholder={placeholder}
        autoCorrect={autoCorrect}
        autoCapitalize={autoCapitalize}
        style={inputStyle}
        value={value}
        onChangeText={onChangeText}
        underlineColorAndroid='transparent'
        placeholderTextColor='#757575'
      />
    </View>
  );
};

const styles = {
  inputStyle: {
    color: '#424242',
    fontSize: 14,
    fontFamily: 'Helvetica Neue',
    letterSpacing: 0,
    lineHeight: 23,
    flex: 1,
    borderBottomWidth: 1,
    borderBottomColor: '#979797'
  },
  containerStyle: {
    height: 40,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center'
  }
};

export { Input };
