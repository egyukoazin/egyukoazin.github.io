const firebaseConfig = {
  apiKey: "AIzaSyBMPhJN6CpjvfF0xqDzmlsUyGwdBwUKcmk",
  authDomain: "chatroom-2355a.firebaseapp.com",
  databaseURL: "https://chatroom-2355a-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "chatroom-2355a",
  storageBucket: "chatroom-2355a.appspot.com",
  messagingSenderId: "370501140294",
  appId: "1:370501140294:web:43bb94cb00994592f82f47",
  measurementId: "G-WSHQYL4KVQ"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.database();

let username = "";

// Join chat
function joinChat() {
    username = document.getElementById("username").value.trim();
    if (!username) { alert("Enter a username!"); return; }

    document.getElementById("chatbox").style.display = "block";
    document.getElementById("username").style.display = "none";

    // Notify join
    db.ref("messages").push({ user: "System", text: `${username} joined the chat` });

    // Listen for new messages
    const messagesRef = db.ref("messages");
    messagesRef.off(); // Remove any previous listeners
    messagesRef.on("child_added", function(snapshot) {
        const msg = snapshot.val();
        const messagesDiv = document.getElementById("messages");
        messagesDiv.innerHTML += `<b>${msg.user}:</b> ${msg.text}<br>`;
        messagesDiv.scrollTop = messagesDiv.scrollHeight;
    });
}

// Send message
function sendMessage() {
    const text = document.getElementById("message").value.trim();
    if (!text) return;
    db.ref("messages").push({ user: username, text });
    document.getElementById("message").value = "";
}

// Leave chat
function leaveChat() {
    db.ref("messages").push({ user: "System", text: `${username} left the chat` });
    location.reload();
}
