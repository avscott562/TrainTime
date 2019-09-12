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

  // var trains = [
  //   {name: }
  // ];
  var trainName = ""; 
  var trainDestinaton = "";
  var trainFrequency = 0;
  var nextTrainArrival = "";
  var minutesLeft = 0;
  var trainId = 0;
  var time = "";

  $('#submit').on("click", function(event) {
    // prevent form from submitting
    event.preventDefault();
    //create a new row for the table
    // var newRow = $('<tr>');
    // newRow.attr("id", trainId);
    // trainId++;
    //get submitted train name and add to row
    // var newTrain = $('<td>');
    trainName = $('#train-name').val().trim();
    // newTrain.text(trainName);
    //get submitted destination and add to row
    // var newDest = $('<td>');
    trainDestinaton = $('#destination').val().trim();
    // newDest.text(trainDestinaton);
    //get first train time
    time = $('#time').val().trim();
    console.log("time entry " + time);

    var convertedTime = changeTime(time);
    //convert first train time to moment and subtact a year to ensure it comes first
    // var convertedTime = moment(time, "HH:mm").subtract(1, "years");
    // console.log("converted time " + convertedTime);
    //get current time
    // var currentTime = moment();
    // console.log("Current Time " + moment(currentTime).format("hh:mmA"));
    //get submitted frequency and add to row
    // var newFreq = $('<td>');
    trainFrequency = $('#frequency').val().trim();
    var frequency = convertFreq(trainFrequency);
    // newFreq.text(frequency);
    console.log("frequency " + frequency);
    //calculate the difference between the current time and the first train time
    var diffTime = calcDiff(convertedTime);
    console.log("Difference " + diffTime);
    // //calculate the remainder of time
    // var timeBalance = diffTime % frequency;
    // console.log("balance " + timeBalance);
    // var timeBalance = calc(diffTime, frequency);
    //calculate how many minutes until next train and display in row
    // var minAway = frequency - timeBalance;
    minutesLeft = minAway(diffTime, frequency);
    console.log("away " + minutesLeft);
    var newMinutes = $('<td>');
    // newMinutes.text(minAway);
    //calculate time of next train
    // var newArrive = $('<td>');
    // var arrivTime = moment().add(minutesLeft, "minutes");
    nextTrainArrival = nextTrain(minutesLeft);
    console.log("next train " + nextTrainArrival);
    // newArrive.text(nextTrainArrival);
    //add all data to the new row
    // newRow.append(newTrain, newDest, newFreq, newArrive, newMinutes);
    //add new row to table
    // $('#schedule').append(newRow);

    firebase.database().ref().push({
      name: trainName,
      first: time,
      destination: trainDestinaton,
      frequency: trainFrequency,
      // arrival: nextTrainArrival,
      // away: minutesLeft,
      dateAdded: firebase.database.ServerValue.TIMESTAMP
    })
});

firebase.database().ref().orderByChild("dateAdded").on("child_added", function(snapshot) {
  $('#schedule').append($('<tr>').append("<td>" + snapshot.val().name + "</td>", "<td>" + snapshot.val().destination + "</td>", "<td>" + snapshot.val().frequency + "</td>", "<td>" + nextTrain(minAway(calcDiff(changeTime(snapshot.val().first)), snapshot.val().frequency)) + "</td>", "<td>" + minAway(calcDiff(changeTime(snapshot.val().first)), snapshot.val().frequency) + "</td>"));
});

function minAway(d, f) {
  //calculate the remainder of time
  var diff = d % f;
  return f - diff;
}

function changeTime(t) {
  return moment(t, "HH:mm").subtract(1, "years");
}

function convertFreq(f) {
  return parseInt(f);
}

function calcDiff(t) {
  var currentTime = moment();
  console.log("Current Time " + moment(currentTime).format("hh:mmA"));
  return moment().diff(moment(t), "minutes");
}

function nextTrain(m) {
  var arrivTime = moment().add(m, "minutes");
  return moment(arrivTime).format("hh:mm A");
}

