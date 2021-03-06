/**
 * Overview: A class that allows customers to register (create an account) with the app.
 *           The RegistrationScreen is activated when users click 'Register' 
 *           from the AccountScreen.
 * 
 * Description: Once the user clicks 'Register' this external component is called to display an input form. 
 *              The main parts of the screen are as follows: 
 * 
 *  - A state variable and text input handlers -> These are behind the scenes and not visible to the user. 
 *                                                They power the functionality of the page. 
 *  - Modal Window-> The screen is made visible to the user via the modal container that wraps it.
 *  - ScrollView-> On this page, the scrollView acts as the main scrollable container for the page. *  
 *  - Text input fields -> The customer can enter their details into the registration text input fields.
 *  - Buttons -> The customer can either choose to add the information, or cancel the registration via the buttons.
 *  - Page stylings -> Much of the app's stylings are included on each respective page.
 *                     Occasionally, however, external consts, fonts, and colours have been utilised.
 * 
 * @link   ./src/screens/RegistrationScreen.js
 * @file   This files defines the RegistrationScreen.js class.
 * @author Tukhtaboy Jumaniyazov.
 * @since  01.10.2021
 */

/* TJ & AD - Standard imports from both React and React-Native */
import { isEmpty } from "lodash";
import React, { Component, useState, useEffect } from "react";
import {
  Button,
  View,
  StyleSheet,
  ScrollView,
  Text,
  Dimensions,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  Image,
  Modal,
  Alert
} from 'react-native';

/* TJ & AD - External component imports */
import Checkbox from "../components/Checkbox";
import LinkButton from "../components/LinkButton";
import Logo from "../components/Logo";
import colors from "../constants/colors";

/* TJ & AD - custom icon */
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { Margins, Paddings } from "../constants/constvalues";

// HH - import the Java backend address ( URL)
import backendUrl from "../constants/backendUrl";

/* TJ & AD - The main function of the page */
function RegistrationScreen(props) {

  /************* TJ & AD - State Variable *************/

  /* 
  AD & DK - input validation (and some 'colour validation') 
            added to the customer registration form.
            Form submission is not possible until all of the fields
            have been appropriately filled in.  
  */
  
  const [colorValidator, setColorValidator] = useState(true);
  const [emailColorValidator, setEmailColorValidator] = useState(true);
  const [inputValidator, setInputValidator] = useState({
    userName: false,
    firstName: false,
    lastName: false,
    // image: false,
    email: false,
    password: false,
    // dateOfBirth: false,
    phone: false,
    // imageInputHandler: false,
    
  });

  // TJ & AD - State variable (defines the customer object)
  const [customer, setCustomer] = useState({
    //customerId: 1,
    firstName: 'default firstName', //TODO
    lastName: 'default lastName',
    userName: 'default userName',
    password: "default password",
    dateOfBirth: 'default dateOfBirth',
    email: 'default email',
    phone: 'default phone',
    image: 'default image',
});

 /************* TJ & AD - Custom Functions *************/

 // > AD - ALERT messages ======================================================================================================
 function validationFailedAlert(){
  Alert.alert(
    "Warning!",
    "Please complete the form!",
    [ 
        { 
        text: "OK",
        onPress: () => console.log("OK Pressed"), 
        }, ], { cancelable: false } );        
}

function handleWrongPhoneFormat(){
  Alert.alert(
    "Wrong Format!",
    "Phone number must be a number!",
    [ 
        { 
        text: "OK",
        onPress: () => console.log("OK Pressed"), 
        }, ], { cancelable: false } );        
}

function handleWrongEmailFormat(){
  Alert.alert(
    "Wrong Format!",
    "Email must be in email format!",
    [ 
        { 
        text: "OK",
        onPress: () => console.log("OK Pressed"), 
        }, ], { cancelable: false } );        
}

/* AD & DK - function for validating email */
function isEmail(enteredText) {
  console.log("function isEmail(enteredText) {")
  var isOk = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(enteredText);
  console.log("isOk => " + isOk);
  return isOk
  };


  /* TJ & AD - custom functions to control the modal 
  (other functions are called via props, 
    and the customer object can be added) */

const addCustomer=()=>{
  var counter = 0;
    for (const validationItem of Object.entries(inputValidator)) {
      //console.log(item[0] + " -> " + item[1])
      if(validationItem[1] == false){
        counter++;
      }
      else{
        console.log("Validation is OK!")
      }
      console.log(validationItem[0] + " -> " + validationItem[1]);
      console.log("Mistakes counted so far: " + counter);
    }
    if (counter == 0) {
      console.log('Inserting data to DB...');
      props.onAddCustomer(customer);
    } else {
      validationFailedAlert();
    } 
}

const cancelCustomer=()=>{
  props.onCancelCustomer();
}


/* TJ & AD - input handlers, to take input from the text input fields */
const firstNameInputHandler=(enteredText)=>{
  customer.firstName = enteredText;
  console.log('entered text/firstName: ' + enteredText);
  if(isEmpty(enteredText)){
    inputValidator.firstName = false;
    console.log("No text was entered!");
  }
  else{        
    inputValidator.firstName = true;
    console.log('entered text/description: ' + enteredText);
  }
}
const lastNameInputHandler=(enteredText)=>{
  customer.lastName = enteredText;
  console.log('entered text/lastName: ' + enteredText);
  if(isEmpty(enteredText)){
    inputValidator.lastName = false;
    console.log("No text was entered!");
  }
  else{        
    inputValidator.lastName = true;
    console.log('entered text/description: ' + enteredText);
  }
}

const userNameInputHandler=(enteredText)=>{
  customer.userName = enteredText;
  console.log('entered text/userName: ' + enteredText);
  if(isEmpty(enteredText)){
    inputValidator.userName = false;
    console.log("No text was entered!");
  }
  else{        
    inputValidator.userName = true;
    console.log('entered text/description: ' + enteredText);
  }
}

const passwordInputHandler=(enteredText)=>{
  customer.password = enteredText;
    console.log('entered text/password: ' + enteredText);
    if(isEmpty(enteredText)){
      inputValidator.password = false;
      console.log("No text was entered!");
    }
    else{        
      inputValidator.password = true;
      console.log('entered text/description: ' + enteredText);
    }
}

const dateOfBirthInputHandler=(enteredText)=>{
  customer.dateOfBirth = enteredText;
    console.log('entered text/dateOfBirth: ' + enteredText);
}

/* AD & DK - email validation added */
const emailInputHandler=(enteredText)=>{
  //customer.email = enteredText;
  console.log('entered text/email: ' + enteredText);
  if(!isEmail(enteredText)){
    setEmailColorValidator(false);
    inputValidator.email = false;
    //handleWrongEmailFormat();
    //ToConsole:
    console.log('Not an email');
    console.log("emailColorValidator is: " + emailColorValidator);
  }
  else{
    setEmailColorValidator(true);
    inputValidator.email = true;
    customer.email = enteredText;
    // ToConsole:
    console.log('This is an email');
  }
  if(isEmpty(enteredText)) {
    inputValidator.email = false;
    // ToConsole:
    console.log("No text was entered!");
  } 
}

const phoneInputHandler=(enteredText)=>{
  //customer.phone = enteredText;
  console.log('entered text/phone: ' + enteredText);
  if(isNaN(enteredText)){
    setColorValidator(false);
    inputValidator.phone = false;
    handleWrongPhoneFormat();
    // ToConsole:
    console.log('Not a number');
    console.log("colorValidator is: " + colorValidator);
  }
  else{
    setColorValidator(true);
    inputValidator.phone = true;
    customer.phone = enteredText;
    // ToConsole:
    console.log('This is a number');
  }
  if(isEmpty(enteredText)) {
    inputValidator.phone = false;
    // ToConsole:
    console.log("No text was entered!");
  } 
}

const imageInputHandler=(enteredText)=>{
  customer.image = enteredText;
    console.log('entered text/image: ' + enteredText);
}

  return (

  /************* TJ & AD - The data to be rendered and visible to the user *************/

    <Modal visible={props.visibility} animationType="slide">
    <ScrollView style={styles.scrollView}>

    <View style={{flex: 1, backgroundColor: colors.light4,/* '#ffffff' */}}>
      <Logo style={styles.logo}></Logo>
      <View
        style={{
          paddingHorizontal: 10,
          //paddingVertical: 10,
          //marginVertical: 10,
          marginBottom: 50,
          marginHorizontal: 10,
          backgroundColor: '#fff',
          borderRadius: 10,
        }}>
        <View style={{alignSelf: 'center', marginTop: 7, marginBottom: 20}}>
          <Text style={{fontSize: 32, fontWeight: 'bold'}}>Registration</Text>
        </View>
        <View style={{}}>
          <View style={{marginVertical: 5}}>
            <Text style={{fontSize: 16, marginBottom: 5}}>Username</Text>
            <TextInput
              maxLength={15} 
              placeholderTextColor="#bdbdbd"
              placeholder="Enter your username"
              style={styles.TextInput}
              onChangeText={userNameInputHandler}
            />
          </View>
          <View style={{marginVertical: 5}}>
            <Text style={{fontSize: 16, marginBottom: 3}}>Firstname</Text>
            <TextInput
              maxLength={15} 
              placeholderTextColor="#bdbdbd"
              placeholder="Enter your Firstname"
              style={styles.TextInput}
              onChangeText={firstNameInputHandler}
            />
          </View>
          <View style={{marginVertical: 5}}>
            <Text style={{fontSize: 16, marginBottom: 3}}>Lastname</Text>
            <TextInput
              maxLength={15} 
              placeholderTextColor="#bdbdbd"
              placeholder="Enter your Lastname"
              style={styles.TextInput}
              onChangeText={lastNameInputHandler}
            />
          </View>
          <View style={{marginVertical: 5}}>
            <Text style={{fontSize: 16, marginBottom: 3}}>Email (valid emails only)</Text>
            <TextInput
              maxLength={20} 
              placeholderTextColor="#bdbdbd"
              placeholder="Enter your email"
              //style={styles.TextInput}
              style={[styles.TextInput, {borderBottomColor: emailColorValidator ? colors.darkBlueCustom : "red"}]}
              onChangeText={emailInputHandler}
            />
            </View>
          <View style={{marginVertical: 5}}>
            <Text style={{fontSize: 16, marginBottom: 3}}>Password</Text>
            <TextInput
              maxLength={15} 
              placeholderTextColor="#bdbdbd"
              secureTextEntry={true}
              placeholder="Enter your password"
              style={styles.TextInput}
              onChangeText={passwordInputHandler}
            />
          </View>

          <View style={{marginVertical: 5}}>
            <Text style={{fontSize: 16, marginBottom: 3}}>
              Phone number (numbers only) (+):
            </Text>
            <TextInput
              maxLength={20} 
              placeholderTextColor="#bdbdbd"
              secureTextEntry={false}
              placeholder="Enter your phone number"
              //style={styles.TextInput}
              style={[styles.TextInput, {borderBottomColor: colorValidator ? colors.darkBlueCustom : "red"}]}
              onChangeText={phoneInputHandler}
            />
          </View>

          <View style={styles.eulaRow}>

             {/* 
            <View style={styles.eulaCheckBoxRow}>
             */}
              {/* 
              <Checkbox style={styles.eulaCheckBox}></Checkbox>
              */}
          
              <Icon name="checkbox-marked" style={styles.iconStyling}></Icon>          
              <LinkButton
                label="I have read and accept EULA terms"
                style={styles.eulaLinkButton}
              ></LinkButton>
              
              {/*
            </View>
            */}
        </View>
          <View style={{alignSelf: 'center', width: '100%', marginTop: 50}}>
            <TouchableOpacity
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: '#1E90FF',
                paddingTop: 20,
                paddingBottom: 20,
                borderRadius: 10,
              }}>
              <Text onPress={addCustomer} style={{fontSize: 20, color: '#fff'}}>Register</Text>            
            </TouchableOpacity>

            <TouchableOpacity
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: colors.danger, // '#c83232'
                paddingTop: 20,
                paddingBottom: 20,
                borderRadius: 10,

                marginVertical: 10,
              }}>
              <Text onPress = {cancelCustomer} style={{fontSize: 20, color: '#fff'}}>Cancel</Text>            
            </TouchableOpacity>
    
          </View>
        </View>
      </View>
    </View>

    </ScrollView>
    </Modal>
  );
};

/************* TJ & AD - Stylings *************/

const styles = StyleSheet.create({
  view: {height: 60, width: '100%', backgroundColor: 'red'},
  TextInput: {
    height: 43,
    borderBottomColor: colors.darkBlueCustom, // #bdbdbd
    borderBottomWidth: 2,
    fontSize: 18,
  },
  customBackground: {
    backgroundColor: colors.light4,
  },
  scrollView: {
    backgroundColor: colors.light4,
  },
  logo: {
    width: 172,
    height: 110,
    marginTop: 30,
    alignSelf: "center",
  },
  eulaRow: {
    width: 360, //360
    height: 38,
    flexDirection: "row",
    //marginTop: 30,
    marginTop: 15,
    marginHorizontal: Margins.xxxlarge, //large
    alignContent: "center",
  },
  eulaCheckBox: {
    height: 40,
    width: 40,
  },
  eulaLinkButton: {
    height: 39,
    width: 320, //320
    marginTop: 1
  },
  /*
  eulaCheckBoxRow: {
    height: 40,
    flexDirection: "row",
    flex: 1,
    marginTop: 10,
    alignContent: "center",
    marginHorizontal: Margins.midsize
  },
  */
  iconStyling: {
    color: '#000080',
    fontSize: 30,
    justifyContent:'center',
    alignItems:'center',      
    //paddingRight: Paddings.narrow,
    //paddingTop: 6,
    paddingTop: Paddings.narrow,
  }
});

export default RegistrationScreen;