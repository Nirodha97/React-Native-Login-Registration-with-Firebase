import React from "react";
import { Text,View, StyleSheet,Switch,ScrollView } from "react-native";
import TextBox from "../components/textbox";
import { Button } from 'react-native-paper';
import MyButton from "../components/button";
import Logo from "../components/logo";
import { TextInput } from 'react-native-paper';
import Toast from 'react-native-toast-message';

import "firebase/auth";
import "firebase/firestore";
import "firebase/database";

///Google SignIn
import {
    GoogleSignin,
    GoogleSigninButton,
    statusCodes,
  } from '@react-native-google-signin/google-signin';
 

import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { initializeApp } from 'firebase/app';
import { getDatabase, ref,set  } from "firebase/database";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";

GoogleSignin.configure({
    webClientId: '863114081187-k3vtutk2n2ju8tl6tcske1fkdhbh078g.apps.googleusercontent.com',
  });
class Login extends React.Component{


   
constructor(props){
    super(props);
     // used to navigate
    this.login= this.login.bind(this);
    this.signup= this.signup.bind(this);

    //Show password eye
    this.toggleSwitch = this.toggleSwitch.bind(this);
    this.state = {
      showPassword: true,
      email:'',
      password:'',
    }
}


componentDidMount(){

    const firebaseConfig = {
        apiKey: "AIzaSyC2jAQ1HhsBeJwmoraEQkQy9tYNpaVncVE",
                authDomain: "myproject1-50263.firebaseapp.com",
                databaseURL: "https://myproject1-50263-default-rtdb.firebaseio.com",
                projectId: "myproject1-50263",
                storageBucket: "myproject1-50263.appspot.com",
                messagingSenderId: "863114081187",
                appId: "1:863114081187:android:6384b4a29e3690a252a016",
                measurementId: "G-8GSGZQ44ST",
      };
   
      const app = initializeApp(firebaseConfig);
    
     
    //console.log(app);
  
}

    render(){

        const hasErrors = () => {
            let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
            
            if (reg.test(this.state.email))
            {
                return true;
            }
          };

        return(
            
            <ScrollView scrollEnabled={true} style={{backgroundColor:'white'}}>
                <View style={styles.logo}>
                    <Logo/>
                </View>
            
                <View style={{backgroundColor:'#f0f0f5',borderTopLeftRadius:50,borderTopRightRadius:50}}>
                    <View style={styles.container}>
                        <TextBox 
                        label="Email" 
                        placeholder="n@gmail.com" 
                        name="email"
                        value={this.state.email}
                        onChangeText={(text) => this.setState({email: text}) }
                        //Error validation
                        color="red"
                        helper="Email address is invalid!"
                        visible={this.state.email ? !hasErrors(): ''}/>
                        
                        <TextBox 
                            label="Password" 
                           
                            visible={false}
                            secureTextEntry={this.state.showPassword}
                            onChangeText={(password) => this.setState({ password })}
                            right={<TextInput.Icon 
                            name={this.state.showPassword ? 'eye-off':'eye'}
                            onPress={this.toggleSwitch} />} />
                
                        <MyButton label="Sign In" onPress={this.login} />
                            <View style={styles.option1}>
                                <Text>Don't you have an account? <Text style={styles.option2} onPress={this.signup}>Sign Up</Text>  </Text> 
                               
                              
                            </View>

                           <View style={{ justifyContent: 'center',alignItems: 'center'}}>
                           <GoogleSigninButton
                             style={{width:200, height: 48 }}
                            size={GoogleSigninButton.Size.Wide}
                            color={GoogleSigninButton.Color.Dark}
                            onPress={this.signIn2}
                            disabled={this.state.isSigninInProgress} />
                               </View>
                           
                    </View>
                </View>
            </ScrollView>
        );
    }

    
    toggleSwitch() {
        //For show password eye
        this.setState({ showPassword: !this.state.showPassword });
        
      }


      signIn2 = async () =>  {
      
        await GoogleSignin.hasPlayServices();
        const userInfo = await GoogleSignin.signIn();
        this.setState({ userInfo});
      
      
      
        const googleCredential = GoogleAuthProvider.credential(userInfo.idToken)
        console.log(googleCredential);
        const auth = getAuth();
        
        console.log(auth);
        
        const {navigate} = this.props.navigation; 
        navigate("Home");
      }
      signIn = async () => {
        try {
            // add any configuration settings here:
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      this.setState({ userInfo: userInfo, loggedIn: true });
      // create a new firebase credential with the token
      const auth = getAuth();
      const credential = GoogleAuthProvider.credential(userInfo.idToken, userInfo.accessToken)
      //const credential = firebase.auth.GoogleAuthProvider.credential(userInfo.idToken, userInfo.accessToken)
      // login with credential
      await signInWithCredential(credential)
          } catch (error) {
            if (error.code === statusCodes.SIGN_IN_CANCELLED) {
              // user cancelled the login flow
            } else if (error.code === statusCodes.IN_PROGRESS) {
              // operation (e.g. sign in) is in progress already
            } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
              // play services not available or outdated
            } else {
              // some other error happened
            }
          }
      };

    login(){
        //For Navigate
        const {navigate} = this.props.navigation;
        let time = 1000;
        let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
        let email = this.state.email;
        let password = this.state.password;


        if(email===""){
            Toast.show({
                text1: 'Email cannot be empty !',
                position: 'bottom' ,
                visibilityTime: time,
                type:'error',
              });
        }

        else if(password===""){
            Toast.show({
                text1: 'Password cannot be empty !',
                position: 'bottom' ,
                visibilityTime: time,
                type:'error',
              });
        }

        else if(!reg.test(this.state.email) ){
            Toast.show({
                text1: 'Invalid input',
                text2:'Somthing has gone wrong',
                position: 'bottom' ,
                type:'error',
              });
        }
        else{
            const auth = getAuth();
            signInWithEmailAndPassword(auth, email, password)
            .then(
                function(data){
                    Toast.show({
                        text1: 'Login Successfull',
                        position: 'bottom' ,
                        type:'success',
                    });
                    navigate("Home" , {uid: data.user.uid});
                },
                function(error){
                    var errorMessage = error.message;
                console.log(errorMessage);
                Toast.show({
                    text1: 'Login Error',
                    text2: 'Email or password incorrect !',
                    position: 'bottom' ,
                    type:'error',
                });
                }
            );
        }
        
    }

    signup(){
        //For Navigate
        const {navigate} = this.props.navigation;
        navigate("Signup");
    }

    
}


const styles = StyleSheet.create({
    container:{
        margin:40,
        textAlign:'center',
        
    },
    logo:{
        justifyContent: 'center',
        alignItems: 'center',
    },
    option1:{
        alignItems:'center',
        paddingTop:20,
        textAlign:'center',
        padding:10,
        
    },
    option2:{
       color:'#536DFE',
    },
    
});

export default Login;