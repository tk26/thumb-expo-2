import React from 'react';
import { Image } from 'react-native';

const Logo = ({ size }) => {
  return (
    <Image style={styles.logoSize} source={require('../../../assets/images/thumb_logo_no_text.png')}/>
  );
};

const styles = {
  logoSize: {
    width: 100, height: 100
  }
}

export { Logo };
