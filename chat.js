// Import Firebase functions
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.1/firebase-app.js";
import { getDatabase, ref, push, onChildAdded } from "https://www.gstatic.com/firebasejs/9.22.1/firebase-database.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.22.1/firebase-analytics.js";

// ==============================
// 1️⃣ Firebase configuration
// ==============================
const firebaseConfig = {
  apiKey: "AIzaSyBMPhJN6CpjvfF0xqDzmlsUyGwdBwUKcmk",
  authDomain: "chatroom-2355a.firebaseapp.com",
  databaseURL: "https://chatroom-2355a-default-rtdb.firebaseio.com", // added databaseURL
  projectId: "chatroom-2355a",
  storageBucket: "chatroom-2355a.appspot.com", // fixed storageBucket
  messagingSenderId: "370501140294",
  appId: "1:370501140294:web:43bb94cb00994592f82f47",
  measurementId: "G-WSHQYL4KVQ"
};

// ==============================
// 2️⃣ Initialize Firebase
// ==============================
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getDatabase(app);

// ==============================
// 3️⃣ Chatroom functionality
// ==============================
let username = "";

// Join chat
window.joinChat = function() {
    username = document.getElementById("username").value.trim();
    if (!username) {
        alert("Enter a username!");
        return;
    }

    document.getElementById("chatbox").style.display = "block";
    document.getElementById("username").style.display = "none";

    // Notify join
    push(ref(db, "messages"), { user: "System", text: `${username} joined the chat` });

    // Listen for new messages
    const messagesRef = ref(db, "messages");
    onChildAdded(messagesRef, (snapshot) => {
        const msg = snapshot.val();
        const messagesDiv = document.getElementById("messages");
        messagesDiv.innerHTML += `<b>${msg.user}:</b> ${msg.text}<br>`;
        messagesDiv.scrollTop = messagesDiv.scrollHeight;
    });
}

// Send message
window.sendMessage = function() {
    const text = document.getElementById("message").value.trim();
    if (!text) return;
    push(ref(db, "messages"), { user: username, text });
    document.getElementById("message").value = "";
}

// Leave chat
window.leaveChat = function() {
    push(ref(db, "messages"), { user: "System", text: `${username} left the chat` });
    location.reload();
}
