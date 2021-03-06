/**
 * Overview: A class that allows users to view their account overview.
 *           Also, the user can access account-related information and modal screens.
 * 
 * Description: This screen is accessible via the Profile button on the bottom navigation bar. 
 *              The main parts of the screen are as follows: 
 * 
 *  - Variables, functions and async functions -> These are behind the scenes and not visible to the user. 
 *                                                They power the functionality of the page. 
 *  - Header-> This feature is part of the stack navigator navigation (configured by Hossein).
 *  - ScrollView-> On this page, the scrollView acts as the main scrollable container for the page.  
 *  - Modal screens -> The app user can access variable modal screens for various functionalities (such as the 'login' modal).
 *  - Page stylings -> Much of the app's stylings are included on each respective page.
 *                     Occasionally, however, external consts, fonts, and colours have been utilised.
 * 
 * @link   ./src/screens/AccountScreen.js
 * @file   This files defines the AccountScreen.js class.
 * @author Tukhtaboy Jumaniyazov.
 * @since  01.10.2021
 */

/* AD - Standard imports from both React and React-Native */
import React, { Component, useState, useEffect } from "react";
import { StyleSheet, View, Text, FlatList, 
  ScrollView, ActivityIndicator, Button, ProgressViewIOSComponent, Alert } from "react-native";

/* AD - Constants (such as for custom colours and margins etc) */
import TextStyling from '../constants/fontstyling';
import { Margins, Paddings } from "../constants/constvalues";
import colors from "../constants/colors";

/* AD - External component imports (such as for modal views and logos etc) */
import LoginScreen from "./LoginScreen";
import RegistrationScreen from "./RegistrationScreen";
import ItemSuccessfullyAdded from "../components/ItemSuccessfullyAdded";
import MenuRow from "../components/MenuRow";
import LogoSmall from "../components/LogoSmall";
import AppSupport from "../components/account/AppSupport";
import AboutModal from "../components/account/AboutModal";

// HH - import the Java backend address ( URL)
import backendUrl from "../constants/backendUrl";

// LOGIN
import AsyncStorage from '@react-native-async-storage/async-storage';

/* AD - The main function of the page */
function AccountScreen(props) {
// HH - define variable and read data from constant backendUrl file
let backendAddress = backendUrl.backendAddress;

// STATE VARIABLES ------------------------------------------------------------------------------
/* AD - Handles the display of messages */
const [hasMessage, setMessage] = useState(false);
const [messageDisplayed, setMessageDisplayed] = useState('');

 /* AD - Handles loading state (useState variable) */
const [isLoading, setLoading] = useState(false); // was true
const [isLoadingSession, setLoadingSession] = useState(false); // was true

/* AD - Handles the state of whether specific 
        modal windows are visible or not (useState variable) */
const [isflatListVisible, setflatListVisibility] = useState(false);
const [isSupportVisible, setSupportVisibility] = useState(false);
const [isAboutVisible, setAboutVisibility] = useState(false);
const [isVisible, setVisibility] = useState(false);

/* AD - Handles the registration of new customers (useState variable / array) */
const [customerList, addCustomerToList] = useState([]);
const [customer, setCustomer] = useState([]);
const [items, setItems] = useState([]);
const [itemList, addItemToList] = useState([]);

/* AD - for the AccountScreen -> registration page modal visibility */
const [isLoginVisible, setLoginVisible] = useState(false);
const [isRegisterVisible, setRegisterVisible] = useState(false);

//Login out button
const [logBtnText, setLogBtnText] = useState("Login")
// ----------------------------------------------------------------------------------------

// ALERTS --------------------------------------------------------------------------------
// AD - a comming soon alert
const comingSoonAlert = () =>
Alert.alert(
"Wow, slow down there, buddy.",
"This feature is coming soon!",
[
    {
    text: "Cancel",
    onPress: () => console.log("Cancel Pressed"),
    style: "cancel"
    },
    { text: "OK", onPress: () => console.log("OK Pressed") }
]
);
// ----------------------------------------------------------------------------------------

/************* AD - Custom Functions *************/

 /* AD - A custom function to store new customer data taken from user 
        input taken from the Registration modal window */
const onAddCustomer = (childdata) => {
  addCustomerToList(customerList =>[...customerList, childdata]);

  //console.log('childdata.customerId: ' + childdata.customerId);
  console.log('childdata.firstName: ' + childdata.firstName);
  console.log('childdata.lastName: ' + childdata.lastName);
  console.log('childdata.userName: ' + childdata.userName);
  console.log('childdata.password: ' + childdata.password);
  console.log('childdata.dateOfBirth: ' + childdata.dateOfBirth);
  console.log('childdata.email: ' + childdata.email);
  console.log('childdata.phone: ' + childdata.phone);
  console.log('childdata.image: ' + childdata.image);

  addCustomerData(
    //childdata.customerId, 
    childdata.firstName, 
    childdata.lastName, 
    childdata.userName, 
    childdata.password, 
    childdata.dateOfBirth, 
    childdata.email, 
    childdata.phone, 
    childdata.image);
  setVisibility(false);
  //setLoading(true);
}

const handleButtonText=(boolean)=>{  
      if(boolean== true){ 
        setLogBtnText("Logout");
        setLoadingSession(true);
      } else{
        setLogBtnText("Login");
        setLoadingSession(true);
      }
  }

const handleUserSession=()=>{
    console.log("const handleUserSession=()=>{");
    AsyncStorage.getItem("StoredSessionId").then((SESSION_ID) => {
      console.log("SESSION_ID: "+ SESSION_ID);
      if(SESSION_ID == 0 || SESSION_ID == undefined){ 
        setLoginVisible(true);
        setLoadingSession(true);
      } else{
        alert("You have been logged out!");
        AsyncStorage.setItem("StoredSessionId", "0");
        setLogBtnText("Login");
        setLoadingSession(true);
      }
    }); 
  }

const handleLogInOutButtonText=()=>{
    console.log("const handleLogInOutButtonText=()=>{");
    AsyncStorage.getItem("StoredSessionId").then((SESSION_ID) => {
      console.log("SESSION_ID: "+ SESSION_ID);
      if(SESSION_ID == 0 || SESSION_ID == undefined){
        return "Login"
      } else{
        return "Logout"
      }
    });
    return "puppy" 
  }

/* AD - Functions related to the modal visibility */
  const cancelLoginModal = ()=>{
    setLoginVisible(false);
  }

  const cancelAddCustomer=()=>{
    setVisibility(false);
    setLoading(false);
  }


/* AD - extra editions for the registration page input functionality */

 /* AD - This one was originally related to the item screen, but it is a WIP */

// Custom Functions ***************************************************************************************
/* For the support modal */
const onCancelSupport2=()=>{
  setSupportVisibility(false);
  //setLoading(false);
}

/* For the About Modal */
const onCancelAbout2=()=>{
  setAboutVisibility(false);
  //setLoading(false);
}

/* AD - functions related to confirmation and error messages */
function showError(error){
  setMessage(true);
  setMessageDisplayed("Error: " + error);
  console.log(messageDisplayed);
}

function showConfirmation(message){
  setMessageDisplayed("Confirmation: " + message);
  setMessage(true);
}

function closeMessage() {
  setMessage(false);
  setLoading(true);
}

// SERVICE METHODS ------------------------------------------------------------------------
  /* AD - An async function to POST data to the Java backend (which interacts with our MySQL / Google Cloud database) */
  async function addCustomerData(firstNameParam, lastNameParam, userNameParam, passwordParam, dateOfBirthParam, emailParam, phoneParam, imageParam) {
    console.log('started: async function addCustomerData(firstNameParam, lastNameParam, userNameParam, passwordParam, dateOfBirthParam, emailParam, phoneParam, imageParam) {');
    let response = null;
    let requestOptions = {
      method:'POST',
      headers:{
        'Content-Type':'application/json'
      },
      body:JSON.stringify({
        //customerId: customerIdParam*1,
        firstName: firstNameParam.toString(),
        lastName: lastNameParam.toString(),
        userName: userNameParam.toString(),
        password: passwordParam.toString(),
        dateOfBirth: dateOfBirthParam.toString(),
        email: emailParam.toString(),
        phone: phoneParam.toString(),
        image: imageParam.toString(),
      })
    };
    try {
      response = await fetch(`${backendAddress}/rest/customerservice/addjsoncustomer`, requestOptions)
    } catch (error) {
      showError(error);
    }
    try {
      let responseData = await response.json();
      console.log('responseData: ' + responseData);
      showConfirmation("Customer was successfully added!")
    } catch (error) {
      showError(error);
    }
  }

/* AD - An async function to GET (fetch) data from the Java backend 
 (which interacts with our MySQL / Google Cloud database). */
async function fetchData() {
  //Variable res is used later, so it must be introduced before try block and so cannot be const.
  let response = null;
  try{
    //This will wait the fetch to be done - it is also timeout which might be a response (server timeouts)
    response = await fetch(`${backendAddress}/rest/itemservice/getall`);
  }
  catch(error){
    showError(error);
  }
  try{
    //Getting json from the response
    let responseData = await response.json();
    console.log(responseData);//Just for checking.....
    setItems(responseData);
  }
  catch(error){
    showError(error);
  }
}

/* AD - An async function to POST data to the Java backend (which interacts with our MySQL / Google Cloud database) */
async function addData(categoryParam, customerParam, titleParam, priceParam, descrParam, imageParam, conditionParam, locationParam) {
  console.log('started: async function addData(nameParam, priceParam, descrParam, categoryParam) {');
  let response = null;
  let requestOptions = {
    method:'POST',
    headers:{
      'Content-Type':'application/json'
    },
    body:JSON.stringify({
      categoryId: categoryParam*1,
      customerId: customerParam*1,
      title: titleParam.toString(),
      price: priceParam*1,
      description: descrParam.toString(),
      image: imageParam.toString(),
      condition: conditionParam.toString(),
      location: locationParam.toString(),
    })
  };
  try {
    response = await fetch(`${backendAddress}/rest/itemservice/addjsonitem`, requestOptions)
  } catch (error) {
    showError(error);
  }
  try {
    let responseData = await response.json();
    console.log('responseData: ' + responseData);
    showConfirmation("Item was successfully added!")
  } catch (error) {
    showError(error);
  }
}

/* AD - An async function to PUT data to the Java backend (which interacts with our MySQL / Google Cloud database) */  
// Object props are hardcoded, no input form is available. Works the same way as adding item
async function updateData(/*idParam, nameParam, priceParam, descrParam, categoryParam*/) {
  console.log('started: async function addData(nameParam, priceParam, descrParam, categoryParam) {');
  let response = null;
  let requestOptions = {
    method:'PUT',
    headers:{
      'Content-Type':'application/json'
    },
    body:JSON.stringify({
      itemId: 1,
      categoryId: 1,
      customerId: 1,
      title: "new title",
      price: 1,
      description: "new description",
      condition: "used",
      location: "new location"
    })
  };

  try {
    response = await fetch(`${backendAddress}/rest/itemservice/updatejsonitem`, requestOptions)
  } catch (error) {
    showError(error);
  }
  try {
    let responseData = await response.json();
    console.log('responseData: ' + responseData);
    showConfirmation("Item was successfully added!")
  } catch (error) {
    showError(error);
  }
}

/* AD - An async function to DELETE data to the Java backend (which interacts with our MySQL / Google Cloud database) */
  // Delivers parameter as JSON data 
async function deleteData(itemIdParam) {
  console.log('started:  async function deleteData(idParam) {');
  let response = null;
  let requestOptions = {
    method:'DELETE',
    headers:{
      'Content-Type':'application/json'
    },
    body:JSON.stringify({
      itemId: itemIdParam*1, // *1 -> numbers only
    })
  };
  try {
    response = await fetch(`${backendAddress}/rest/itemservice/deletejsonitem`, requestOptions)
  } catch (error) {
    showError(error);
  }
  try {
    let responseData = await response.json();
    showConfirmation("Item was successfully removed!")
    console.log('responseData: ' + responseData);
  } catch (error) {
    showError(error);
  }
}
// ----------------------------------------------------------------------------------------

// USEFFECT --------------------------------------------------------------------------------
/*
  AD - This function is called every time the view is rendered.
       There are async functions which get called, and so new calls of such functions
       (such as GET methods for instance) must be stopped,
       lest new re-renders are executed. Such methods are state variables
       and endless re-renders could occur, unless stopped by useEffect.  
*/
useEffect(() => {
  console.log('useEffect(() => {'); 
  if (isLoading==true){
    fetchData();
    setLoading(false);
  }
  if (isLoadingSession== true){
    setLoadingSession(false);
  }
});
// ----------------------------------------------------------------------------------------

// RETURN ---------------------------------------------------------------------------------
/* AD - An if statement to return an activity indicator if certain async functions,
          like GET (fetch) are not yet ready */
if (isLoading==true || isLoadingSession==true) {
  console.log('if(isLoading==true) {');
  return (
    <View style={{flex: 1, padding: 20, justifyContent:'center'}}>
      <ActivityIndicator size="large" color="#00ff00" />
    </View>
  );
}

 /* AD - An elseif statement for if a message needs to be displayed
        (such as an error or confirm message) */
else if(hasMessage){
  console.log('else if(hasError){');
  return(

    <ScrollView style={styles.scrollViewCustom}>
    <View style={styles.container}>  

    <LogoSmall style={styles.logoItemModal}/>
    <View style={{flex: 1, padding: 20, justifyContent:'center'}}>
      <Text>{hasMessage}</Text>
      <Text>{""+messageDisplayed}</Text>
      <ItemSuccessfullyAdded />
      <Button 
      color = '#000080' 
      title='close' 
      onPress={()=>closeMessage()}/>
    </View>

    </View>
    </ScrollView>
  );
}
// AD - Else the following code is rendered to the screen.
else{
  console.log('else{');
  
  return (

    /************* AD - The screen that will be rendered and visible to the user *************/

    <ScrollView style={styles.scrollStyle}>
      <View style={styles.container}>  
        <View style={styles.centralContainer}>
   
          <View style={styles.logoContainer}>
            <LogoSmall></LogoSmall>
          </View>

          <MenuRow 
            onSelect = {()=>setVisibility(true)}
            style = {styles.row1} rowText = "Register"
            icon1 = "account-plus-outline"/>
          <MenuRow 
            onSelect={()=>handleUserSession()}
            style = {styles.row1a} 
            rowText = {logBtnText}
            //rowText = {()=>handleLogInOutButtonText()}
            
            //rowText = "Login"
            icon1 = "login" />
          <MenuRow 
            onSelect = {()=>setAboutVisibility(true)}
            style = {styles.row2} rowText = "About"
            icon1 = "information-outline" />
          <MenuRow 
            onSelect={comingSoonAlert}
            style = {styles.row2} rowText = "Settings"
            icon1 = "cog-outline" />
          <MenuRow 
            onSelect={comingSoonAlert}
            style = {styles.row2} rowText = "Premium"
            icon1 = "crown" />          
          <MenuRow 
            onSelect={comingSoonAlert}
            style = {styles.row2} bckgcol = {colors.danger} rowText = "Delete Account"
            icon1 = "delete-forever"
            icon2 = "alert-octagon"
            textstyling = {TextStyling.textWhiteMedium}
            icon1color = "white"
            icon2color = "white"  />
          <MenuRow 
          onSelect = {()=>setSupportVisibility(true)}
          style = {styles.row3} rowText = "Support"
          icon1 = "face-agent" />

          <LoginScreen 
          visibility={isLoginVisible}
          handleButtonText={handleButtonText} 
          onCancelItem={cancelLoginModal}  
          /> 

          <RegistrationScreen 
          visibility={isVisible} 
          onAddCustomer={onAddCustomer}
          customerList={customer} 
          onCancelCustomer={cancelAddCustomer}
          /> 

          <AppSupport 
          visibility={isSupportVisible} 
          onCancelSupport={onCancelSupport2} 
          />

          <AboutModal 
          visibility={isAboutVisible} 
          onCancelAbout={onCancelAbout2} 
          />

        </View>
      </View>         

    </ScrollView>        
  );
}
};

/************* AD - Stylings *************/
const styles = StyleSheet.create({
  scrollStyle: {
    backgroundColor: colors.light4,
  },

  container: {
    flex: 1,
    alignItems: 'center',   
    width:'100%',    
  },   
  
  logoContainer:{
    marginTop: 17,
    alignItems: 'center',   
  },

  row1: {
    marginTop: 17,
    marginBottom: Margins.xxnarrow,
  },

  row1a: {
    marginTop: Margins.xxnarrow,
    marginBottom: Margins.large,
  },

  row2: {
    marginVertical: Margins.xxnarrow,
  },

  row3: {
    marginVertical: Margins.midsize,
  },

  centralContainer: {
    flex: 1,   
    justifyContent: 'center',
    width: '100%', 
    backgroundColor: colors.light4,
    
  },

});

export default AccountScreen;
