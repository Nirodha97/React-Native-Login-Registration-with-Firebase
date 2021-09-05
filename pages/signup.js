import React from "react";
import { Text,View,ScrollView, StyleSheet, Alert,ToastAndroid } from "react-native";
import TextBox from "../components/textbox";
import { Button } from 'react-native-paper';
import MyButton from "../components/button";
import Logo from "../components/logo";
import { HelperText,TextInput } from 'react-native-paper';
import Toast from 'react-native-toast-message';

//Firebase
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/database";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { initializeApp } from 'firebase/app';
import { getDatabase, ref,set  } from "firebase/database";

class Signup extends React.Component{
    constructor(props){
        super(props); 
        this.login= this.login.bind(this);
        this.signup= this.signup.bind(this);

         //Show password eye
        this.toggleSwitchPassword = this.toggleSwitchPassword.bind(this);
        this.toggleSwitchConformPassword = this.toggleSwitchConformPassword.bind(this);
        this.state = {
            showPassword: true,
            showConformPassword: true,
            name:'',
            email:'',
            password:'',
            conformPassword:'',
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
        
         
        console.log(app);
      
    }
   
    
    render(){

        const emailValidation = () => {
            let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
            
            if (reg.test(this.state.email))
            {
                return true;
            }
        }

        const passwordValidation = () => {
            if(this.state.password.length >= 6){
                return false;
            }
        }

       
    
        return(
            
            <ScrollView scrollEnabled={true} style={{backgroundColor:'white'}} >
           
                <View style={styles.logo}>
                    <Logo name="Sign Up"/>
                </View>

                <View style={{backgroundColor:'#f0f0f5',borderTopLeftRadius:50,borderTopRightRadius:50}}>
                <View style={styles.container} >
                <TextBox 
                    label="Full Name" 
                    placeholder="Nirodha Wikramarathna"
                    name="name"
                    value={this.state.name}
                    onChangeText={(text) => this.setState({name: text}) }
                    visible={false}
                   />


                <TextBox 
                    label="Email" 
                    placeholder="n@gmail.com"
                    name="email"
                    value={this.state.email}
                    onChangeText={(text) => this.setState({email: text}) }
                     //Error validation
                     color="red"
                     helper="Email address is invalid"
                     visible={this.state.email ? !emailValidation(): ''}/>
                     

               <TextBox 
                    label="Password" 
                  
                    name="password"
                    color="red"
                    value={this.state.password}
                    secureTextEntry={this.state.showPassword}
                    onChangeText={(text) => this.setState({ password :text })}
                    right={<TextInput.Icon 
                    name={this.state.showPassword ? 'eye':'eye-off'}
                    onPress={this.toggleSwitchPassword} />} 
                     //Error validation
                     helper="Password must contain at least 6 characters"
                     visible={this.state.password ? passwordValidation(): ''}/>
                
                <TextBox 
                    label="Conform Password" 
                 
                    name="conformPassword"
                    color="green"
                    value={this.state.conformPassword}
                    secureTextEntry={this.state.showConformPassword}
                    onChangeText={(text) => this.setState({ conformPassword :text })}
                    right={<TextInput.Icon 
                    name={this.state.showConformPassword ? 'eye':'eye-off'}
                    onPress={this.toggleSwitchConformPassword} />} 
                     //Error validation
                     helper="Password  match"
                     avt={this.state.conformPassword===this.state.password && this.state.conformPassword!='' ? 1: 0}
                     visible={this.state.conformPassword===this.state.password && this.state.conformPassword!='' ? true: false}/>


                <MyButton label="Sign Up" onPress={this.signup}/>
                <View style={styles.option1}>
                    <Text>Do you already have an account?  <Text style={styles.option2} onPress={this.login}>Sign In</Text>
                    </Text>
                </View>
                </View>
                </View>
                </ScrollView>
          
        );
      
    }
   

    toggleSwitchPassword() {
        //For show password eye
        this.setState({ showPassword: !this.state.showPassword }); 
      }

    toggleSwitchConformPassword() {
        //For show password eye
        this.setState({ showConformPassword: !this.state.showConformPassword }); 
      }

    login(){
        //For Navigate
        const {navigate} = this.props.navigation;
        navigate("Login");
    }

    signup(){
        //For Navigate
        const {navigate} = this.props.navigation;
        let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;

        let name = this.state.name;
        let email = this.state.email;
        let password = this.state.password;
        let conformPassword= this.state.conformPassword;
        let time=1000;
        if(name===""){
            Toast.show({
                text1: 'Full Name cannot be empty !',
                position: 'bottom' ,
                visibilityTime: time,
                type:'error',
              });
        }

        else if(email===""){
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

        else if(conformPassword===""){
            Toast.show({
                text1: 'Conform Password cannot be empty !',
                position: 'bottom' ,
                visibilityTime: time,
                type:'error',
              });
        }

        else if(!reg.test(this.state.email) || this.state.password.length < 6 || this.state.conformPassword != this.state.password){
            Toast.show({
                text1: 'Invalid input',
                text2:'Somthing has gone wrong',
                position: 'bottom' ,
                type:'error',
              });
        }

        else{
            navigate("Login");
            const auth = getAuth();
            createUserWithEmailAndPassword(auth,email,password)
            .then(
              
                function(data){

                const db  = getDatabase();
                set(ref(db, 'member/' + data.user.uid), {
                    name: name,
                    email: email,
                   
                  });


                  console.log("User Created Success !");
                  Toast.show({
                    text1: 'Registration Successfull',
                    position: 'bottom' ,
                    type:'success',
                  });

                  navigate("Login");
                   },
                   function (error){
                    console.log("Error Creating User "+error);
                    Toast.show({
                        text1: 'Registration Error',
                        text2: 'Email has already been taken !',
                        position: 'bottom' ,
                        type:'error',
                      });
                     
                   }
               )
            

          
        }
           
        
    }   

    
}


const styles = StyleSheet.create({
    container:{
        margin:20,
        textAlign:'center',
      
    },
    logo:{
        padding:5,
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
     
    }
});

export default Signup;