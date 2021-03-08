//ADD YOUR FIREBASE LINKS HERE
// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyCM1g2LX6OJuw_bSkJEQ8VE492luU2r9YM",
  authDomain: "kwitter-3abb6.firebaseapp.com",
  databaseURL: "https://kwitter-3abb6-default-rtdb.firebaseio.com",
  projectId: "kwitter-3abb6",
  storageBucket: "kwitter-3abb6.appspot.com",
  messagingSenderId: "540226374808",
  appId: "1:540226374808:web:00f60a33c1d4fb754294ed"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

function getData() {
  console.log("inside get data");
  firebase.database().ref("/").on('value', function (snapshot) {
    document.getElementById("output").innerHTML = "";
    snapshot.forEach(function (childSnapshot) {
      childKey = childSnapshot.key;
      Room_names = childKey;
      //Start code
      console.log(Room_names);

      row = "<div class='room_name' id=" + Room_names + " onclick='redirectToRoomName(this.id)' >#" + Room_names + "</div><hr>";
      document.getElementById("output").innerHTML += row;
      //End code
    });
  });
}

getData();
username = localStorage.getItem("username");
document.getElementById("user_name").innerHTML = "Welcome " + username + "!";

function addroom() {
  roomname = document.getElementById("roomname").value;
  firebase.database().ref("/").child(roomname).update({
    purpose: "adding user"
  });
  localStorage.setItem("roomname", roomname);
  window.location = "kwitter_page.html";
}
function redirectToRoomName() { 
  localStorage.setItem("roomname", roomname);

  window.location="kwitter_page.html"
}
function logout() {
  localStorage.removeItem("username");
  localStorage.removeItem("roomname"); 
  window.location="index.html";}