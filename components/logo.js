import * as React from 'react';

import { Text,Image } from 'react-native-elements';
import { View, StyleSheet,Switch } from "react-native";
import { baseProps } from 'react-native-gesture-handler/lib/typescript/handlers/gestureHandlers';
const Logo = (props) => (
  <View style={{alignItems:'center'}}>
  <Image source={require('../assets/logo5.png')} style={{ width: 300, height: 150 }}/>
    <Text style={{fontSize:30,padding:10}}>{props.name}</Text>
  </View>

);
export default Logo; 