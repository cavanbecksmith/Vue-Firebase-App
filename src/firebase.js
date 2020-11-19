import swal from 'sweetalert';


var VueFire = require('vuefire')
var firebase = require('firebase').default;

  var config = {
    apiKey: "AIzaSyAL2mNL9xd6piFS1d_dv7WL1EAWV1UVkCY",
    authDomain: "vuefire-9c831.firebaseapp.com",
    databaseURL: "https://vuefire-9c831.firebaseio.com",
    projectId: "vuefire-9c831",
    storageBucket: "vuefire-9c831.appspot.com",
    messagingSenderId: "610128316031",
    appId: "1:610128316031:web:f806d752d6bf8a6f44a14a",
    measurementId: "G-9FQ0E4LX3C"
  };

console.log(firebase.default.initializeApp, firebase.initializeApp);

var firebaseApp = firebase.initializeApp(config);
var db = firebaseApp.database();

// Sign in user

var user = firebase.auth().currentUser;

if (user != null) {
  user.providerData.forEach(function (profile) {
    console.log("Sign-in provider: "+profile.providerId);
    console.log("  Provider-specific UID: "+profile.uid);
    console.log("  Name: "+profile.displayName);
    console.log("  Email: "+profile.email);
    console.log("  Photo URL: "+profile.photoURL);
  });
}

function createNewUser (email, password) {

  var user1;

  firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    console.log(email, password);
    swal("There was a problem with you sign up");
    // ...
  }).then(function(){
    console.log('This has now finished');
  });

  user1 = firebase.auth().currentUser;

  console.log(user1);

}

// window.createNewUser = createNewUser;

function signIn (email, password) {

  firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    // ...
  });

  var user1 = firebase.auth().currentUser;

  return user1;

}
// window.signIn = signIn;

function createUsrObj (fname, lname, email, password) {
  var obj = {
    firstname: fname,
    lastname: lname,
    email: email,
    password: password
  }

  console.log("Stage: 1", obj);

  var dbreadyEml = email.replace(/\@/gi, '{email}').replace(/\./gi, '{period}').replace(/\-/gi, '{hyphen}');

  console.log("Stage: 2", dbreadyEml);

  if(fname != undefined && lname != undefined && email != undefined && password != undefined){
    db.ref('users/'+dbreadyEml).set(obj);
    createNewUser(email, password);
    console.log("Stage: 2.5 nothing is undefined and all is good");
    // setTimeout(function(){
      // return true;
    // }, 200)
    return true;
  }
  else{
    swal("Please fill out all the deets");
    return false;
  }
}

window.returnCurrentUser = returnCurrentUser;

function returnCurrentUser () {
  
  var user = firebase.auth().currentUser;

  if (user != null) {
    user.providerData.forEach(function (profile) {
      // console.log("====== Deets ======")
      // console.log("Sign-in provider: "+profile.providerId);
      // console.log("  Provider-specific UID: "+profile.uid);
      // console.log("  Name: "+profile.displayName);
      // console.log("  Email: "+profile.email);
      // console.log("  Photo URL: "+profile.photoURL);
      // console.log("===================")
    });
  }

  return user;

}

// window.signOut = signOut;

function signOut (redirect) {
  firebase.auth().signOut().then(function() {
    // Sign-out successful.
    if(redirect){
      window.location.href = "#/login"
    }
  }, function(error) {
    // An error happened.
  });

  if(redirect){
    window.location.href = "#/login"
  }

}

// export {VueFire, firebase, config, firebaseApp, db, signIn, createNewUser, createUsrObj, returnCurrentUser, signOut}
export {VueFire, firebase, config, firebaseApp, db, signIn, createNewUser, returnCurrentUser, signOut}