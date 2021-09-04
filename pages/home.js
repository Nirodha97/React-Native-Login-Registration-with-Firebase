import React from 'react';
import { Text,View } from 'react-native';
import MyButton from '../components/button';
import { Appbar } from 'react-native-paper';

import {
    GoogleSignin,
    GoogleSigninButton,
    statusCodes,
  } from '@react-native-google-signin/google-signin';

import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";

import { initializeApp } from 'firebase/app';
class Home extends React.Component{


    componentDidMount(){
       
       
  
}
    render(){
        return(
            
            <View>
                <Appbar.Header style={{backgroundColor:'#536DFE'}}>
                <Appbar.Content title="" subtitle="" />
                <Appbar.Action icon="logout"  onPress={this.signOut} />
                <Appbar.Action icon="login"  onPress={this.getCurrentUser} />
                </Appbar.Header>
               
            </View>
        );
    }
    getCurrentUser = async () => {
        const currentUser = await GoogleSignin.getCurrentUser();
        this.setState({ currentUser });
        console.log(currentUser)
      };


    signOut = async () => {
        try {
          await GoogleSignin.signOut();
          this.setState({ user: null }); // Remember to remove the user from your app's state as well
          const {navigate} = this.props.navigation; 
          navigate("Login");
        } catch (error) {
          console.error(error);
        }
      };
}

export default Home;