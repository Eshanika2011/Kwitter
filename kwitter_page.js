//YOUR FIREBASE LINKS
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
username = localStorage.getItem("username");
roomname = localStorage.getItem("roomname");
console.log(roomname);

function sendm() {
  msg = document.getElementById("message").value;
  console.log(msg);
  console.log(username)
  firebase.database().ref(roomname).push({
    name: username,
    message: msg,
    like: 0
  });
  document.getElementById("message").value = "";
}

function getData() {
  firebase.database().ref("/" + roomname).on('value', function (snapshot) {
    document.getElementById("output").innerHTML = "";
    snapshot.forEach(function (childSnapshot) {
      childKey = childSnapshot.key;
      childData = childSnapshot.val();
      if (childKey != "purpose") {
        firebase_message_id = childKey;
        message_data = childData;
        //Start code
        console.log(firebase_message_id);
        console.log(message_data)
        name1 = message_data['name'];
        message = message_data['message'];
        like = message_data['like'];
        name_with_tag = "<h4> " + name1 + "<img class='user_tick' src='tick.png'></h4>";
        message_with_tag = "<h4 class='message_h4'>" + message + "</h4>";
        like_button = "<button class='btn btn-warning' id=" + firebase_message_id + " value=" + like + " onclick='updateLike(this.id)'>";
        span_with_tag = "<span class='glyphicon glyphicon-thumbs-up'>Like: " + like + "</span></button><hr>";

        row = name_with_tag + message_with_tag + like_button + span_with_tag;
        document.getElementById("output").innerHTML += row;
        //End code
      }
    });
  });
}
getData();

function logout() {
  localStorage.removeItem("username");
  localStorage.removeItem("roomname");
  window.location = "index.html";
}
function updateLike(message_id) {
  console.log(message_id);
  likes=document.getElementById(message_id).value;
  updateLike1=Number(likes)+1;
  console.log(updateLike1);
  firebase.database().ref(roomname).child(message_id).update({ like : updateLike1 });
}