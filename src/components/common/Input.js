import React from 'react';
import { TextInput, View } from 'react-native';
import { fontColors } from './BaseStyles';

const Input = ({ children, value, onChangeText, placeholder, secureTextEntry, autoCorrect, autoCapitalize }) => {
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
        placeholderTextColor={fontColors.grey}
      />
      {children}
    </View>
  );
};

const styles = {
  inputStyle: {
    color: fontColors.lightBlack,
    fontSize: 14,
    fontFamily: 'Helvetica Neue',
    letterSpacing: 0,
    lineHeight: 23,
    flex: 1
  },
  containerStyle: {
    height: 40,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-end',
    borderBottomWidth: 1,
    borderBottomColor: '#979797'
  }
};

export { Input };
