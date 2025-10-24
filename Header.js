const mobileMenuButton = document.getElementById("mobile-menu-button");
const mobileMenuClose = document.getElementById("mobile-menu-close");
const mobileNav = document.getElementById("mobile-nav");
const overlay = document.getElementById("overlay");

function openMenu() {
  mobileNav.classList.remove("-translate-x-full");
  overlay.classList.remove("hidden");
  document.body.style.overflow = "hidden";
}

function closeMenu() {
  mobileNav.classList.add("-translate-x-full");
  overlay.classList.add("hidden");
  document.body.style.overflow = "";
}

mobileMenuButton.addEventListener("click", openMenu);
mobileMenuClose.addEventListener("click", closeMenu);
overlay.addEventListener("click", closeMenu);

const openBtn = document.getElementById("openModalBtn");
const closeBtn = document.getElementById("closeModalBtn");
const closeBtnFooter = document.getElementById("closeModalBtnFooter");
const modalOverlay = document.getElementById("modalOverlay");
const modalBox = document.getElementById("modalBox");

function openModal() {
  modalOverlay.classList.remove("opacity-0", "pointer-events-none");
  modalOverlay.classList.add("opacity-100");
  modalBox.classList.remove("opacity-0", "scale-95", "fade-out");
  modalBox.classList.add("fade-in");
}

function closeModal() {
  modalBox.classList.remove("fade-in");
  modalBox.classList.add("fade-out");
  modalOverlay.classList.remove("opacity-100");
  modalOverlay.classList.add("opacity-0");
  // Wait for animation to finish before disabling pointer events
  setTimeout(() => {
    modalOverlay.classList.add("pointer-events-none");
    modalBox.classList.remove("fade-out");
    modalBox.classList.add("opacity-0", "scale-95");
  }, 300);
}

openBtn.addEventListener("click", openModal);
closeBtn.addEventListener("click", closeModal);
closeBtnFooter.addEventListener("click", closeModal);

// Close modal on overlay click
modalOverlay.addEventListener("click", (e) => {
  if (e.target === modalOverlay) {
    closeModal();
  }
});

// Close modal on ESC key press
document.addEventListener("keydown", (e) => {
  if (
    e.key === "Escape" &&
    !modalOverlay.classList.contains("pointer-events-none")
  ) {
    closeModal();
  }
});

const progressBar = document.getElementById("progress-bar");
const progressText = document.getElementById("progress-text");
const statusText = document.getElementById("status-text");
const installStatus = document.getElementById("installStatus");
const audio = document.getElementById("audioPlayer");
const installBtn = document.getElementById("installBtn");
const appDownload = document.getElementById("appDownload");

let duration = 5000; // simulate 5s "download"
let startTime = null;

// Animate progress bar
function animateProgress(timestamp) {
  if (!startTime) startTime = timestamp;
  const elapsed = timestamp - startTime;
  const progress = Math.min(elapsed / duration, 1);
  const percent = Math.floor(progress * 100);

  progressBar.style.width = percent + "%";
  progressText.textContent = percent + "%";

  if (progress < 1) {
    requestAnimationFrame(animateProgress);
  } else {
    statusText.textContent = "Download Complete!";
    installStatus.textContent = "Installed ✅";
    audio.play().catch((err) => console.warn("Audio play blocked:", err));
  }
}

// On install button click
installBtn.addEventListener("click", async () => {
  // Show modal
  appDownload.classList.remove("hidden");
  statusText.textContent = "Downloading your App...";
  installStatus.textContent = "Processing...";
  progressBar.style.width = "0%";
  progressText.textContent = "0%";
  startTime = null;
  requestAnimationFrame(animateProgress);

  // After progress finishes, trigger PWA install prompt
  setTimeout(async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === "accepted") {
        console.log("User accepted the install prompt");
        installStatus.textContent = "App Installed!";
        statusText.textContent = "Ready to use 🎉";
      } else {
        console.log("User dismissed the install prompt");
        installStatus.textContent = "Install Cancelled";
      }
      deferredPrompt = null;
    } else {
      installStatus.textContent = "Already Installed";
      statusText.textContent = "App is already on your device";
    }
  }, duration + 500);
});

const firstinput = document.getElementById("firstinput");
const searchbtn = document.getElementById("searchbtn");
// Focus on load
window.addEventListener("load", () => {
  firstinput.focus();
  firstinput.select();
});

function redirectToCourse() {
  const value = firstinput.value.trim();
  if (value !== "") {
    window.location.href = `Courselist.html?search=${encodeURIComponent(
      value
    )}`;
  }
}

firstinput.addEventListener("keydown", function (e) {
  if (e.key === "Enter") {
    e.preventDefault();
    redirectToCourse();
  }
});

searchbtn.addEventListener("click", redirectToCourse);

function toggleMenu() {
  document.getElementById("menu").classList.toggle("hidden");
}

let deferredPrompt = null;
let appInstalled = false;

// Listen for beforeinstallprompt event
window.addEventListener("beforeinstallprompt", (e) => {
  e.preventDefault();
  deferredPrompt = e;
  appInstalled = false;
  showModal(); // Show install modal
});

// Listen for appinstalled event (already installed)
window.addEventListener("appinstalled", () => {
  appInstalled = true;
});

// Show modal
function showModal() {
  const overlay = document.getElementById("modalOverlay");
  const box = document.getElementById("modalBox");
  overlay.classList.remove("opacity-0", "pointer-events-none");
  box.classList.remove("opacity-0", "scale-95");
  overlay.classList.add("opacity-100");
  box.classList.add("opacity-100", "scale-100");
}

// Close modal
document.getElementById("closeModalBtn").addEventListener("click", () => {
  document
    .getElementById("modalOverlay")
    .classList.add("opacity-0", "pointer-events-none");
});

// Install button click
document.getElementById("installBtn").addEventListener("click", async () => {
  if (appInstalled) {
    alert("App is already installed.");
    return;
  }

  if (deferredPrompt) {
    // Show download animation
    document
      .getElementById("modalOverlay")
      .classList.add("opacity-0", "pointer-events-none");
    document.getElementById("appDownload").style.display = "flex";
    simulateProgress(async () => {
      deferredPrompt.prompt();
      const choiceResult = await deferredPrompt.userChoice;
      if (choiceResult.outcome === "accepted") {
        console.log("User accepted the A2HS prompt");
      } else {
        console.log("User dismissed the A2HS prompt");
      }
      deferredPrompt = null;
    });
  } else {
    alert("Install prompt not available. Please try again later.");
  }
});

// Simulate progress bar
function simulateProgress(callback) {
  const bar = document.getElementById("progress-bar");
  const text = document.getElementById("progress-text");
  const status = document.getElementById("status-text");
  const audio = document.getElementById("audioPlayer");

  let progress = 0;
  const interval = setInterval(() => {
    if (progress >= 100) {
      clearInterval(interval);
      text.innerText = "100%";
      status.innerText = "App Installed!";
      bar.style.width = "100%";
      audio.play();
      setTimeout(() => {
        document.getElementById("appDownload").style.display = "none";
      }, 2000);
      callback();
    } else {
      progress += 5 + Math.random() * 10; // Simulate random speed
      if (progress > 100) progress = 100;
      bar.style.width = `${progress}%`;
      text.innerText = `${Math.floor(progress)}%`;
    }
  }, 200);
}
