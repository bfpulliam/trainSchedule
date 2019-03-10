// Initialize Firebase
  var config = {
    apiKey: "AIzaSyA_-1FkAJKYM5upHDfunbOO0zXS27s9aAA",
    authDomain: "trainscheduler-62c5a.firebaseapp.com",
    databaseURL: "https://trainscheduler-62c5a.firebaseio.com",
    projectId: "trainscheduler-62c5a",
    storageBucket: "trainscheduler-62c5a.appspot.com",
    messagingSenderId: "126672676954"
  };
  firebase.initializeApp(config);
  var database = firebase.database();

  //Adding a train to the table
$("#add-train-btn").on("click", function(event) {
    event.preventDefault();
  
    // Grabs user input
    var trainName = $("#train-name-input").val().trim();
    var destination = $("#destination-input").val().trim();
    var firstTrainTime = $("#start-input").val().trim();
    var frequency = $("#rate-input").val().trim();
    //moment($("#rate-input").val().trim(), "MM/DD/YYYY").format("X");
  
    // Creates organizational structure
    var newTrain = {
      name: trainName,
      destination: destination,
      start: firstTrainTime,
      rate: frequency
    };
  
    // Pushing new train inputs to the database
    database.ref().push(newTrain);
  
    // Logs everything to console
    // console.log(newTrain.name);
    // console.log(newTrain.destination);
    console.log("train time", newTrain.start);
    console.log(newTrain.rate);
  
    alert("Train successfully added");
  
    // Clears all of the text-boxes
    $("#train-name-input").val("");
    $("#destination-input").val("");
    $("#start-input").val("");
    $("#rate-input").val("");
  });
  
  // 3. Create Firebase event for adding trains to the database and a row in the html when a user adds an entry
  database.ref().on("child_added", function(childSnapshot) {
    console.log(childSnapshot.val());
  
    // Store everything into a variable.
    var trainName = childSnapshot.val().name;
    var destination = childSnapshot.val().destination;
    var start = childSnapshot.val().start;
    var rate = childSnapshot.val().rate;
  
    // Employee Info
    console.log(trainName);
    console.log(destination);
    console.log(start);
    console.log(rate);
    
    var startConverted = moment(start, "HH:mm").subtract(1, "years");
    console.log(startConverted);

    // Current Time
    var currentTime = moment();
    console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

    // Difference between the times
    var diffTime = moment().diff(moment(startConverted), "minutes");
    console.log("DIFFERENCE IN TIME: " + diffTime);

    // Time apart (remainder)
    var tRemainder = diffTime % rate;
    console.log(tRemainder);

    // Minute Until Train
    var minutesAway =  - tRemainder;
    console.log("MINUTES TILL TRAIN: " + minutesAway);

    // Next Train
    var nextArrival = moment().add(minutesAway, "minutes");
    console.log("ARRIVAL TIME: " + moment(nextArrival).format("hh:mm"));

    // Create the new row
    var newRow = $("<tr>").append(
      $("<td>").text(trainName),
      $("<td>").text(destination),
      $("<td>").text(start),
      $("<td>").text(rate),
      $("<td>").text(nextArrival),
      $("<td>").text(minutesAway),
    );
  
    // Append the new row to the table
    $("#train-table > tbody").append(newRow);
  });