const firebaseConfig = {
    apiKey: "AIzaSyBb7VZkAV8WmQ9xFaV6EqtgFNUXIq4V6fo",
    authDomain: "first-firebase-project-2c9cd.firebaseapp.com",
    databaseURL: "https://first-firebase-project-2c9cd.firebaseio.com",
    projectId: "first-firebase-project-2c9cd",
    storageBucket: "first-firebase-project-2c9cd.appspot.com",
    messagingSenderId: "535484273041",
    appId: "1:535484273041:web:2e8dd2b66bfc09e0274a30",
    measurementId: "G-F5TTBBSSHP"
  };

    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);
    firebase.analytics();

  
  var database = firebase.database();
  
  // 2. Button for adding Employees
  $("#add-train-btn").on("click", function(event) {
    event.preventDefault();
  
    // Grabs user input
    var trainName = $("#train-name-input").val().trim();
    var trainDest = $("#dest-input").val().trim();
    var trainTime = moment($("#time-input").val().trim(), "HH:mm").format("X");
    var trainFreq = $("#freq-input").val().trim();
  
    // Creates local "temporary" object for holding employee data
    var newTrain = {
      name: trainName,
      dest: trainDest,
      time: trainTime,
      freq: trainFreq
    };
  
    // Uploads employee data to the database
    database.ref().push(newTrain);
  
    // Logs everything to console
    console.log(newTrain.name);
    console.log(newTrain.dest);
    console.log(newTrain.time);
    console.log(newTrain.freq);
  
    alert("Train Schedule successfully requested");
  
    // Clears all of the text-boxes
    $("#train-name-input").val("");
    $("#dest-input").val("");
    $("#time-input").val("");
    $("#freq-input").val("");
  });
  
  // 3. Create Firebase event for adding employee to the database and a row in the html when a user adds an entry
  database.ref().on("child_added", function(childSnapshot) {
    console.log('childSnapshot is',childSnapshot.val());
  
    // Store everything into a variable.
    var trainName = childSnapshot.val().name;
    var trainDest = childSnapshot.val().dest;
    var trainTime = childSnapshot.val().time;
    var trainFreq = childSnapshot.val().freq;
  
    // Employee Info
    console.log(trainName);
    console.log(trainDest);
    console.log(trainTime);
    console.log(trainFreq);
  
    // Prettify the employee start
    var trainStartPretty = moment.unix(trainFreq).format("HH:mm");
  
    // Calculate the months worked using hardcore math
    // To calculate the months worked
    var trainMins = moment().diff(moment(trainFreq, "X"), "mins");
    console.log(trainMins);
  
//     // Calculate the total billed rate
//     var empBilled = empMonths * empRate;
//     console.log(empBilled);
  
//     // Create the new row
//     var newRow = $("<tr>").append(
//       $("<td>").text(empName),
//       $("<td>").text(empRole),
//       $("<td>").text(empStartPretty),
//       $("<td>").text(empMonths),
//       $("<td>").text(empRate),
//       $("<td>").text(empBilled)
//     );
  
//     // Append the new row to the table
//     $("#train-table > tbody").append(newRow);
//   });
  