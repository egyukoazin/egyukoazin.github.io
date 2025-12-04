// Your Firebase config (replace with your values)
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
  databaseURL: "https://YOUR_PROJECT_ID-default-rtdb.firebaseio.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT_ID.appspot.com",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.database();

let username = "";

// Join chat
function joinChat() {
    username = document.getElementById("username").value.trim();
    if(!username) {
        alert("Enter username!");
        return;
    }

    document.getElementById("chatbox").style.display = "block";
    document.getElementById("username").style.display = "none";

    // Notify join
    db.ref("messages").push({user:"System", text:`${username} joined the chat`});

    // Listen for new messages
    db.ref("messages").on("child_added", snapshot => {
        const msg = snapshot.val();
        const messagesDiv = document.getElementById("messages");
        messagesDiv.innerHTML += `<b>${msg.user}:</b> ${msg.text}<br>`;
        messagesDiv.scrollTop = messagesDiv.scrollHeight;
    });
}

// Send message
function sendMessage() {
    const text = document.getElementById("message").value.trim();
    if(!text) return;
    db.ref("messages").push({user: username, text});
    document.getElementById("message").value = "";
}

// Leave chat
function leaveChat() {
    db.ref("messages").push({user:"System", text:`${username} left the chat`});
    location.reload();
}
