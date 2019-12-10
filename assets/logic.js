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
  
  // 2. Button for adding trains
  $("#add-train-btn").on("click", function(event) {
    event.preventDefault();
  
    // Grabs user input
    var trainName = $("#train-name-input").val().trim();
    var trainDest = $("#dest-input").val().trim();
    var trainTime = moment($("#time-input").val().trim(), "HH:mm").format("X");
    var trainFreq = $("#freq-input").val().trim();
  
    // Creates local "temporary" object for holding train data
    var newTrain = {
      name: trainName,
      dest: trainDest,
      time: trainTime,
      freq: trainFreq
    };
  
    // Uploads train data to the database
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
  
  // 3. Create Firebase event for adding train to the database and a row in the html when a user adds an entry
  database.ref().on("child_added", function(childSnapshot) {
    console.log('childSnapshot is',childSnapshot.val());
  
    // Store everything into a variable.
    var trainName = childSnapshot.val().name;
    var trainDest = childSnapshot.val().dest;
    var trainTime = childSnapshot.val().time;
    var trainFreq = childSnapshot.val().freq;
  
    // Train Info
    console.log(trainName);
    console.log(trainDest);
    console.log(trainTime);
    console.log(trainFreq);
  
    // Prettify the train start
    var trainStartPretty = moment.unix(trainFreq).format("HH:mm");
  
    // Calculate the mins using hardcore math
    // To calculate the mins it takes
    var trainMins = moment().diff(moment(trainFreq, "X"), "mins");
    console.log(trainMins);
  
    // Calculate the total mins it takes
    var trainTimeTotal = trainMins * trainFreq;
    console.log(trainTimeTotal);
  
    // Create the new row
    var newRow = $("<tr>").append(
      $("<td>").text(trainName),
      $("<td>").text(trainDest),
      $("<td>").text(trainTime),
      $("<td>").text(trainFreq)
  
    // Append the new row to the table
    $("#train-table > tbody").append(newRow);
  });
  