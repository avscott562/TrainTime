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

  //declare variables
  var trainName = ""; 
  var trainDestinaton = "";
  var trainFrequency = 0;
  var nextTrainArrival = "";
  var minutesLeft = 0;
  var trainId = 0;
  var time = "";

  //add on click listener to submit button
  $('#submit').on("click", function(event) {
    // prevent form from submitting
    event.preventDefault();
    
    //get submitted train name
    trainName = $('#train-name').val().trim();

    //get submitted destination and add to row
    trainDestinaton = $('#destination').val().trim();

    //get submitted first train time
    time = $('#time').val().trim();
    // console.log("time entry " + time);
    
    //convert first train time to moment and subtact a year to ensure it comes first
    var convertedTime = changeTime(time);
   
    //get submitted frequency
    trainFrequency = $('#frequency').val().trim();
    //convert frequency string to an interger
    var frequency = convertFreq(trainFrequency);
    // console.log("frequency " + frequency);

    //calculate the difference between the current time and the first train time
    var diffTime = calcDiff(convertedTime);
    // console.log("Difference " + diffTime);
    
    //calculate how many minutes until next train
    minutesLeft = minAway(diffTime, frequency);
    // console.log("away " + minutesLeft);

    //calculate time of next train
    nextTrainArrival = nextTrain(minutesLeft);
    // console.log("next train " + nextTrainArrival);

    //add variables to Firebase database
    firebase.database().ref().push({
      name: trainName,
      first: time,
      destination: trainDestinaton,
      frequency: trainFrequency,
      dateAdded: firebase.database.ServerValue.TIMESTAMP
    })
});

firebase.database().ref().orderByChild("dateAdded").on("child_added", function(snapshot) {
  //create a new row for the table
  var newRow = $('<tr>');
  //add id to each row
  newRow.attr("id", trainId);
  trainId++;
  //create data field for each column in the new row
  var newName = $("<td>" + snapshot.val().name + "</td>").addClass("name");
  var newDest = $("<td>" + snapshot.val().destination + "</td>").addClass("destination");
  var freq = snapshot.val().frequency;
  var newFreq = $("<td>" + freq + "</td>").addClass("frequency");
  var tCalc = minAway(calcDiff(changeTime(snapshot.val().first)), freq);
  var trainTime = $("<td>" + nextTrain(tCalc) + "</td>").addClass("time");
  var remainMin = $("<td>" + tCalc + "</td>").addClass("minutes");

  newRow.append(newName, newDest, newFreq, trainTime, remainMin);
  $('#schedule').append(newRow);

  // $('#schedule').append($('<tr>').append("<td>" + snapshot.val().name + "</td>", "<td>" + snapshot.val().destination + "</td>", "<td>" + snapshot.val().frequency + "</td>", "<td>" + nextTrain(minAway(calcDiff(changeTime(snapshot.val().first)), snapshot.val().frequency)) + "</td>", "<td>" + minAway(calcDiff(changeTime(snapshot.val().first)), snapshot.val().frequency) + "</td>"));
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
  //get current time
  var currentTime = moment();
  // console.log("Current Time " + moment(currentTime).format("hh:mmA"));
  return moment().diff(moment(t), "minutes");
}

function nextTrain(m) {
  var arrivTime = moment().add(m, "minutes");
  return moment(arrivTime).format("hh:mm A");
}

//update time every minute
// setInterval(function() {
//   var rows = document.getElementsByTagName('tr');
//   for (i=0; i<rows.length-1; i++) {
//     console.log($('#'+i+ '> td:last-child'));
//     $('#'+i+' > td:last-child').text(3);
//   }
// }, 6000);
