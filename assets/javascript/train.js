// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyA8jNNqsLWzqEld1ZTzy9Ad4YkufqKHr8A",
    authDomain: "countdown-c41f0.firebaseapp.com",
    databaseURL: "https://countdown-c41f0.firebaseio.com",
    projectId: "countdown-c41f0",
    storageBucket: "countdown-c41f0.appspot.com",
    messagingSenderId: "836309319452",
    appId: "1:836309319452:web:8a391c915e28616a"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  // Create a variable to reference the database
  var database = firebase.database();