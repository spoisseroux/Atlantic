import * as React from 'react';
import { Appbar } from 'react-native-paper';
const Header = () => {
return (
    <Appbar.Header style={{marginTop:40, backgroundColor:'grey'}}>
      
      <Appbar.Content title="Explore" />
      
    </Appbar.Header>
  );
};
export default Header;