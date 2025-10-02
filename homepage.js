import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-app.js";
import {
  getAuth,
  onAuthStateChanged,
  signOut
} from "https://www.gstatic.com/firebasejs/10.11.1/firebase-auth.js";
import {
  getFirestore,
  getDoc,
  doc
} from "https://www.gstatic.com/firebasejs/10.11.1/firebase-firestore.js";

// ✅ Your Firebase config (USE YOUR OWN VALUES HERE)
const firebaseConfig = {
  apiKey: "AIzaSyAKN5GR18VTFrKNgVG7FenD4aSTX3Q2PbA",
  authDomain: "gift-zone-project.firebaseapp.com",
  projectId: "gift-zone-project",
  storageBucket: "gift-zone-project.appspot.com",
  messagingSenderId: "806465456032",
  appId: "1:806465456032:web:becf8988a6dfabe43646c5",
  measurementId: "G-1ZLMWBP61Y",
};

// ✅ Initialize Firebase services
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// ✅ On Auth Change: fetch and show user data
onAuthStateChanged(auth, (user) => {
  if (user) {
    const loggedInUserId = localStorage.getItem("loggedInUserId");
    if (!loggedInUserId) {
      console.log("User ID not found in local storage.");
      return;
    }

    const docRef = doc(db, "users", loggedInUserId);
    getDoc(docRef)
      .then((docSnap) => {
        if (docSnap.exists()) {
          const userData = docSnap.data();
          document.getElementById("loggedUserFName").innerText = userData.firstName || "Gift Zone";
          document.getElementById("loggedUserEmail").innerText = userData.email || "N/A";
          document.getElementById("username").innerText = userData.firstName || "Gift Zone";
          document.getElementById("usermail").innerText = userData.email || "Giftzone@mail.com";

          // ✅ Optional: handle missing lastName gracefully
          const lNameElement = document.getElementById("loggedUserLName");
          if (userData.lastName) {
            lNameElement.innerText = userData.lastName;
          } else {
            lNameElement.innerText = "-";
          }
        } else {
          console.log("No user document found in Firestore.");
        }
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
      });
  } else {
    console.log("User not signed in.");
    window.location.href = "index.html"; // Redirect to login
  }
});

// ✅ Logout
const logoutButton = document.getElementById("logout");
logoutButton.addEventListener("click", () => {
  localStorage.removeItem("loggedInUserId");
  signOut(auth)
    .then(() => {
      window.location.href = "index.html";
    })
    .catch((error) => {
      console.error("Error signing out:", error);
    });
});
