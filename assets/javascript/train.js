//Firebase configuration
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

  var trainName = "";
  var trainDestinaton = "";
  var trainFrequency = 0;
  var nextTrainArrival = "";
  var minutesLeft = 0;

  $('#submit').on("click", function(event) {
    // prevent form from submitting
    event.preventDefault();
    //create a new row for the table
    var newRow = $('<tr>');
    //get submitted train name and add to row
    var newTrain = $('<td>');
    trainName = $('#train-name').val().trim();
    newTrain.text(trainName);
    //get submitted destination and add to row
    var newDest = $('<td>');
    trainDestinaton = $('#destination').val().trim();
    newDest.text(trainDestinaton);
    //get first train time
    var time = $('#time').val().trim();
    console.log("time entry " + time);
    //convert first train time to moment and subtact a year to ensure it comes first
    var convertedTime = moment(time, "HH:mm").subtract(1, "years");
    console.log("converted time " + convertedTime);
    //get current time
    var currentTime = moment();
    console.log("Current Time " + moment(currentTime).format("hh:mmA"));
    //get submitted frequency and add to row
    var newFreq = $('<td>');
    trainFrequency = $('#frequency').val().trim();
    var frequency = parseInt(trainFrequency);
    newFreq.text(frequency);
    console.log("frequency " + frequency);
    //calculate the difference between the current time and the first train time
    var diffTime = moment().diff(moment(convertedTime), "minutes");
    console.log("Difference " + diffTime);
    //calculate the remainder of time
    var timeBalance = diffTime % frequency;
    console.log("balance " + timeBalance);
    //calculate how many minutes until next train and display in row
    var minAway = frequency - timeBalance;
    minutesLeft = minAway;
    console.log("away " + minAway);
    var newMinutes = $('<td>');
    newMinutes.text(minAway);
    //calculate time of next train
    var newArrive = $('<td>');
    var arrivTime = moment().add(minAway, "minutes");
    nextTrainArrival = moment(arrivTime).format("hh:mm A");
    newArrive.text(nextTrainArrival);
    //add all data to the new row
    newRow.append(newTrain, newDest, newFreq, newArrive, newMinutes);
    //add new row to table
    $('#schedule').append(newRow);

    firebase.database().ref().push({
      name: trainName,
      destination: trainDestinaton,
      frequency: trainFrequency,
      arrival: nextTrainArrival,
      away: minutesLeft
    })
});
