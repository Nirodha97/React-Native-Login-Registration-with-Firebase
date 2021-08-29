import * as React from 'react';
import { Button,DefaultTheme } from 'react-native-paper';
import { Text, StyleSheet } from "react-native";

const theme = {
    ...DefaultTheme,
    roundness: 5,
    colors: {
      ...DefaultTheme.colors,
      primary: '#3498db',
      accent: '#f1c40f',
    },
  };


const MyButton = (props) => {
  

  return (
    <Button  mode="contained" style={styles.btn} color="#ff5c5c"  theme={theme} onPress={props.onPress}>
        <Text style={{color:'white'}}>{props.label}</Text>
    </Button>
  );

 
}

const styles = StyleSheet.create({
  btn:{
    marginTop:10,
    backgroundColor: '#536DFE'
  }
});


export default MyButton;