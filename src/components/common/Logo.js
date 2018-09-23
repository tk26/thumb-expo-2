import React from 'react';
import { Image } from 'react-native';

const Logo = () => {

  return (
    <Image style={styles.smallLogo} source={require('../../../assets/images/thumb_logo_no_text.png')}/>
  );
};

const styles = {
  smallLogo: {
    width: 100, height: 100
  },
  mediumLogo: {
    width: 200, height: 200
  },
  largeLogo: {
    width: 300, height: 300
  }
}

export { Logo };
