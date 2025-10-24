// Import Firebase modular SDK v12.x
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.2.1/firebase-app.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from "https://www.gstatic.com/firebasejs/12.2.1/firebase-auth.js";
import {
  getFirestore,
  doc,
  setDoc,
  getDoc,
} from "https://www.gstatic.com/firebasejs/12.2.1/firebase-firestore.js";

// Your Firebase configuration (replace with your own)
const firebaseConfig = {
  apiKey: "AIzaSyAKN5GR18VTFrKNgVG7FenD4aSTX3Q2PbA",
  authDomain: "gift-zone-project.firebaseapp.com",
  projectId: "gift-zone-project",
  storageBucket: "gift-zone-project.appspot.com",
  messagingSenderId: "806465456032",
  appId: "1:806465456032:web:becf8988a6dfabe43646c5",
  measurementId: "G-1ZLMWBP61Y",
};

// Initialize app, auth, firestore
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// Utility: Show messages
function showMessage(message, divId) {
  const div = document.getElementById(divId);
  if (!div) return;
  div.textContent = message;
  div.classList.remove("hidden");
  div.style.opacity = "1";
  // Fade out after some seconds
  setTimeout(() => {
    div.style.opacity = "0";
    setTimeout(() => {
      div.classList.add("hidden");
    }, 500);
  }, 4000);
}

// Email validation
function isValidEmail(email) {
  return (
    /^\S+@\S+\.\S+$/.test(email) || /^(\+?\d{1,3}[- ]?)?\d{10}$/.test(email)
  );
}

// Elements
const loginForm = document.getElementById("loginForm");
const loginEmailInput = document.getElementById("email");
const loginPasswordInput = document.getElementById("password");
const loginEmailError = document.getElementById("loginEmailError");
const loginPasswordError = document.getElementById("loginPasswordError");
const signInMessageDiv = document.getElementById("signInMessage");

const signupForm = document.getElementById("signupForm");
const signupNameInput = document.getElementById("fName");
const signupEmailInput = document.getElementById("rEmail");
const signupPasswordInput = document.getElementById("rPassword");
const signupConfirmPasswordInput = document.getElementById(
  "signupConfirmPassword"
);
const signupNameError = document.getElementById("signupNameError");
const signupEmailError = document.getElementById("signupEmailError");
const signupPasswordError = document.getElementById("signupPasswordError");
const signupConfirmPasswordError = document.getElementById(
  "signupConfirmPasswordError"
);
const signUpMessageDiv = document.getElementById("signUpMessage");

const showSignupBtn = document.getElementById("showSignup");
const showLoginBtn = document.getElementById("showLogin");
const ownerlog = document.getElementById("ownerlog");

// Toggle between forms
showSignupBtn.addEventListener("click", () => {
  loginForm.classList.add("hidden");
  signupForm.classList.remove("hidden");
  // clear messages/errors
  signInMessageDiv.classList.add("hidden");
  loginEmailError.classList.add("hidden");
  loginPasswordError.classList.add("hidden");
  loginForm.reset();
});
showLoginBtn.addEventListener("click", () => {
  signupForm.classList.add("hidden");
  loginForm.classList.remove("hidden");
  signUpMessageDiv.classList.add("hidden");
  signupNameError.classList.add("hidden");
  signupEmailError.classList.add("hidden");
  signupPasswordError.classList.add("hidden");
  signupConfirmPasswordError.classList.add("hidden");
  signupForm.reset();
});

// Signup handler
signupForm.addEventListener("submit", (e) => {
  e.preventDefault();
  let valid = true;
  const name = signupNameInput.value.trim();
  const email = signupEmailInput.value.trim();
  const password = signupPasswordInput.value;
  const confirmPassword = signupConfirmPasswordInput.value;

  if (name === "") {
    signupNameError.classList.remove("hidden");
    valid = false;
  } else {
    signupNameError.classList.add("hidden");
  }

  if (!isValidEmail(email) || email.length < 10) {
    signupEmailError.classList.remove("hidden");
    valid = false;
  } else {
    signupEmailError.classList.add("hidden");
  }

  if (password.length < 6) {
    signupPasswordError.classList.remove("hidden");
    valid = false;
  } else {
    signupPasswordError.classList.add("hidden");
  }

  if (password !== confirmPassword) {
    signupConfirmPasswordError.classList.remove("hidden");
    valid = false;
  } else {
    signupConfirmPasswordError.classList.add("hidden");
  }

  if (!valid) return;

  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      // Save user in Firestore
      return setDoc(doc(db, "users", user.uid), {
        firstName: name,
        email: email,
        password: password,
        createdAt: new Date().toISOString(),
      });
    })
    .then(() => {
      document.getElementById("submitSignUp").value = "Please Wait...";
      showMessage("Account created successfully !", "signUpMessage");
      document.getElementById("submitSignUp").value =
        "Account Created Successfully  ";
      signupForm.reset();
      // Switch to login form
      signupForm.classList.add("hidden");
      loginForm.classList.remove("hidden");
    })
    .catch((error) => {
      console.error("Error during signup:", error);
      if (error.code === "auth/email-already-in-use") {
        showMessage("Email already in use.", "signUpMessage");
      } else {
        showMessage("Signup error: " + error.message, "signUpMessage");
      }
    });
});

// Login handler
loginForm.addEventListener("submit", (e) => {
  e.preventDefault();
  let valid = true;
  const email = loginEmailInput.value.trim();
  const password = loginPasswordInput.value;

  if (!isValidEmail(email) || email.length < 10) {
    loginEmailError.classList.remove("hidden");
    valid = false;
  } else {
    loginEmailError.classList.add("hidden");
  }

  if (password.length < 6) {
    loginPasswordError.classList.remove("hidden");
    valid = false;
  } else {
    loginPasswordError.classList.add("hidden");
  }

  if (!valid) return;
  let load = document.getElementById("page-loader");
  let loads = document.getElementById("page-loaders");

  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      load.classList.remove("hidden");
      loads.classList.remove("hidden");
      loginForm.value = "Please Wait...";
      const user = userCredential.user;
      localStorage.setItem("loggedInUserId", user.uid);
      showMessage("Login successful!", "signInMessage");
      // Redirect or load next page
      //  window.location.href = "Orderlist.html";
      history.back();
    })
    .catch((error) => {
      console.error("Error during login:", error);
      load.classList.add("hidden");
      loads.classList.add("hidden");
      if (error.code === "auth/wrong-password") {
        showMessage("Wrong password.", "signInMessage");
      } else if (error.code === "auth/user-not-found") {
        showMessage("User not found. Please signup.", "signInMessage");
      } else {
        showMessage("Login error: " + error.message, "signInMessage");
      }
    });
});

// ownerlog
// Login handler
ownerlog.addEventListener("click", (e) => {
 
  e.preventDefault();
  let valid = true;
  const email = loginEmailInput.value.trim();
  const password = loginPasswordInput.value;

  if (!isValidEmail(email)) {
    loginEmailError.classList.remove("hidden");
    valid = false;
  } else {
    loginEmailError.classList.add("hidden");
  }

  if (password.length < 6) {
    loginPasswordError.classList.remove("hidden");
    valid = false;
  } else {
    loginPasswordError.classList.add("hidden");
  }

  if (!valid) return;

  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      ownerlog.innerText = "Please Wait...";
      const user = userCredential.user;
      localStorage.setItem("loggedInUserId", user.uid);
      showMessage("Login successful!", "signInMessage");
      // Redirect or load next page
      window.location.href =
        "JSJorghtpLgbZjHKO4eJ4f0S1HwDF89FpmFng4CcMedA7.html";
    })
    .catch((error) => {
      console.error("Error during login:", error);
      if (error.code === "auth/wrong-password") {
        showMessage("Wrong password.", "signInMessage");
      } else if (error.code === "auth/user-not-found") {
        showMessage("User not found. Please signup.", "signInMessage");
      } else {
        showMessage("Login error: " + error.message, "signInMessage");
      }
    });
});
// Auth state listener
onAuthStateChanged(auth, (user) => {
  if (user) {
    // User is signed in; you can use user.uid, user.email etc.
    // For example, if on a protected page, show user data
    console.log("User is logged in:", user.uid);
  } else {
    console.log("No user is signed in.");
  }
});
