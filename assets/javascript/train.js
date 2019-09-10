// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyALhmV6s1bBlGbk1IxXHMjE1PvQLtPPcUo",
    authDomain: "train-time-956f3.firebaseapp.com",
    databaseURL: "https://train-time-956f3.firebaseio.com",
    projectId: "train-time-956f3",
    storageBucket: "gs://train-time-956f3.appspot.com/",
    messagingSenderId: "962130239195",
    appId: "1:962130239195:web:789659593d24973fdc36fe"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  // Create a variable to reference the database
  var database = firebase.database();

  $('#submit').on("click", function(event) {
    // prevent form from submitting
    event.preventDefault();
    //create a new row for the table
    var newRow = $('<tr>');
    //get submitted train name and add to row
    var newTrain = $('<td>');
    newTrain.text($('#train-name').val().trim());
    //get submitted destination and add to row
    var newDest = $('<td>');
    newDest.text($('#destination').val().trim());
    //get submitted train time and add to row
    // var newTime = $('<td>');
    var time = $('#time').val().trim();
    // newTime.text(time);
    console.log("time entry " + time);
    var convertedTime = moment(time, "HH:mm").subtract(1, "years");
    console.log("converted time " + convertedTime);
    var currentTime = moment();
    console.log("Current Time " + moment(currentTime).format("hh:mmA"));
    var newFreq = $('<td>');
    var frequency = parseInt($('#frequency').val().trim());
    console.log("frequency " + frequency);
    var diffTime = moment().diff(moment(convertedTime), "minutes");
    console.log("Difference " + diffTime);
    var timeBalance = diffTime % frequency;
    console.log("balance " + timeBalance);
    // var next = convertedTime + frequency;
    // console.log(next);
    newFreq.text(frequency);
    var newArrive = $('<td>');
    newArrive.text('30');
    var newMinutes = $('<td>');
    newMinutes.text(time);
    newRow.append(newTrain, newDest, newFreq, newArrive, newMinutes);
    $('#schedule').append(newRow);
});