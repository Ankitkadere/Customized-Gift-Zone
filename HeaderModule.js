
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-app.js";
import {
  getAuth,
  onAuthStateChanged,
  signOut,
} from "https://www.gstatic.com/firebasejs/10.11.1/firebase-auth.js";
import {
  getFirestore,
  getDoc,
  doc,
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
          let filt = (document.getElementById("HomeName").innerText =
            userData.firstName || "N/A");
          let ff = (document.getElementById("Homemails").innerText =
            userData.email || "N/A");
              let filts = (document.getElementById("PhoneHomeName").innerText =
            userData.firstName || "N/A");
          let ffd = (document.getElementById("PhoneHomemails").innerText =
            userData.email || "N/A");

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
  }
});