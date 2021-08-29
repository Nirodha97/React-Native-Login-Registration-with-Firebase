import * as React from 'react';
import { HelperText,TextInput,DefaultTheme } from 'react-native-paper';
import { Text,View, StyleSheet } from "react-native";
import { Avatar } from 'react-native-paper';
const theme = {
    ...DefaultTheme,
    roundness: 5,
    colors: {
      ...DefaultTheme.colors,
      primary: '#536DFE',
      accent: '#f1c40f',
    },
  };


const TextBox = (props) => {
  

  return (
    <View>
      <TextInput
      mode="outlined"
      label={props.label}
      placeholder={props.placeholder}
      right={<TextInput.Affix />}
      theme={theme}
      style={styles.box}
      secureTextEntry={props.secureTextEntry}
      right={props.right}
      onPress={props.onPress}
      onChangeText={props.onChangeText}
      name={props.name}
      value={props.value}
      onChangeText={props.onChangeText}/>
      
      <View style={{flexDirection:'row',}}>
      <Avatar.Icon size={12} icon="check" style={{opacity:  props.avt ? props.avt : 0, marginTop:6,backgroundColor:"green" }} />
        
           <HelperText  visible={props.visible} style={{color:props.color,marginLeft:-8}} >
             {props.helper}
           </HelperText>
      
      </View> 
    </View>
    
  );

 
}

const styles = StyleSheet.create({
  box:{
    marginTop:10,
  }
});


export default TextBox;