// Background music
window.addEventListener("load", () => {
    const bgMusic = document.getElementById("bgMusic");
    bgMusic.play().catch(() => {
      // Play after user clicks
      document.body.addEventListener("click", () => bgMusic.play(), { once: true });
    });
  });
  
  // Confetti on "Yes" click
  document.getElementById("yesButton")?.addEventListener("click", () => {
    startConfetti();
  });
  
  // Confetti animation using canvas
  function startConfetti() {
    const canvas = document.getElementById("confettiCanvas");
    const ctx = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  
    const confetti = [];
    for (let i = 0; i < 150; i++) {
      confetti.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height - canvas.height,
        r: Math.random() * 6 + 4,
        d: Math.random() * 10 + 2,
        color: `hsl(${Math.random() * 360}, 70%, 60%)`,
        tilt: Math.random() * 10 - 10,
        tiltAngle: 0
      });
    }
  
    function draw() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      confetti.forEach(c => {
        ctx.beginPath();
        ctx.fillStyle = c.color;
        ctx.ellipse(c.x, c.y, c.r, c.r * 0.6, c.tilt, 0, 2 * Math.PI);
        ctx.fill();
      });
      update();
    }
  
    function update() {
      confetti.forEach(c => {
        c.y += c.d;
        c.x += Math.sin(c.tilt);
        c.tilt += 0.05;
        if (c.y > canvas.height) {
          c.y = -10;
          c.x = Math.random() * canvas.width;
        }
      });
    }
  
    setInterval(draw, 20);
  }

  
  // Lightbox functionality for videos
function openLightbox(videoElement) {
    const lightbox = document.getElementById("lightbox");
    const lightboxVideo = document.getElementById("lightbox-video");
    lightboxVideo.src = videoElement.src;
    lightbox.style.display = "flex";
    lightboxVideo.play(); // Auto play the video
  }
  
  function closeLightbox() {
    const lightbox = document.getElementById("lightbox");
    const lightboxVideo = document.getElementById("lightbox-video");
    lightbox.style.display = "none";
    lightboxVideo.pause(); // Pause video when closing the lightbox
    lightboxVideo.currentTime = 0; // Reset video to the start
  }

  let messages = JSON.parse(localStorage.getItem("loveMessages") || "[]");

function saveMessages() {
  localStorage.setItem("loveMessages", JSON.stringify(messages));
}

function loadMessages() {
  const messageList = document.getElementById("messageList");
  messageList.innerHTML = "";
  messages.forEach((msg, index) => {
    const messageDiv = document.createElement("div");
    messageDiv.className = "message";
    messageDiv.innerHTML = `
      <p><strong>${msg.name}</strong>: <span class="text">${msg.text}</span></p>
      <small>${msg.time}</small>
      <button class="edit-btn" onclick="editMessage(${index})">Edit</button>
      <button class="delete-btn" onclick="deleteMessage(${index})">Delete</button>
    `;
    messageList.appendChild(messageDiv);
  });
}

function addMessage() {
  const nameInput = document.getElementById("nameInput");
  const messageInput = document.getElementById("messageInput");
  const name = nameInput.value.trim();
  const text = messageInput.value.trim();
  if (!name || !text) return;

  const time = new Date().toLocaleString();
  messages.unshift({ name, text, time });

  saveMessages();
  loadMessages();
  triggerHeartAnimation();
  document.getElementById("popSound")?.play();

  nameInput.value = "";
  messageInput.value = "";
}

function deleteMessage(index) {
  if (confirm("Delete this message?")) {
    messages.splice(index, 1);
    saveMessages();
    loadMessages();
  }
}

function editMessage(index) {
  const newText = prompt("Edit your message:", messages[index].text);
  if (newText !== null) {
    messages[index].text = newText;
    saveMessages();
    loadMessages();
  }
}

// Heart animation (keep this)
function triggerHeartAnimation() {
  const heart = document.createElement("div");
  heart.className = "heart-animation";
  heart.textContent = "❤️";
  heart.style.left = Math.random() * window.innerWidth + "px";
  heart.style.top = "80%";
  document.body.appendChild(heart);
  setTimeout(() => heart.remove(), 1000);
}

// On load
window.onload = loadMessages;


// Typing effect for proposal
window.onload = function () {
    const text = "From the day I met you, my world changed... ❤️ \n I want u foreever in my life... \nWill you be mine?";
    const typingText = document.getElementById("typingText");
    let i = 0;
  
    function typeChar() {
      if (i < text.length) {
        typingText.innerHTML += text.charAt(i) === "\n" ? "<br>" : text.charAt(i);
        i++;
        setTimeout(typeChar, 80);
      }
    }
  
    if (typingText) typeChar();
  };
  
  // Button responses
  function answerYes() {
    alert("YAY!!! 💖 I can't wait to spend forever with you!");
    // Optional: redirect to a celebration page
  }
  
  function answerNo() {
    alert("No? 😭 But I’ll keep asking until you say yes!");
    // Optional: move the "No" button away as a joke
  }

  function answerYes() {
    confettiExplosion(); // Trigger confetti
    alert("YAY!!! 💖 I can't wait to spend forever with you!");
    
    // Add a small fade-out effect on current page before redirecting
    document.body.style.transition = "opacity 2s";
    document.body.style.opacity = 0; // Fade out current page
    
    setTimeout(function() {
      window.location.href = "forever-together.html"; // Redirect after fade out
    }, 2000); // Wait for 2 seconds for the fade-out to complete
  }
  
  
  
  function confettiExplosion() {
    confetti({
      particleCount: 150,
      spread: 70,
      origin: { y: 0.6 },
      emojis: ["💖", "🎉", "💍", "💕"],
    });
  }

  const noBtn = document.getElementById("noBtn");
if (noBtn) {
  noBtn.addEventListener("mouseenter", () => {
    const container = document.querySelector(".proposal-buttons");
    const maxX = container.offsetWidth - noBtn.offsetWidth;
    const maxY = container.offsetHeight - noBtn.offsetHeight;

    const randX = Math.floor(Math.random() * maxX);
    const randY = Math.floor(Math.random() * maxY);

    noBtn.style.left = `${randX}px`;
    noBtn.style.top = `${randY}px`;
  });
}

// 🎯 Set your special date here (YYYY-MM-DD format)
const targetDate = new Date("2025-06-05T00:00:00");


function updateCountdown() {
  const now = new Date();
  const diff = targetDate - now;

  if (diff <= 0) {
    document.getElementById("countdown").innerHTML = "🎉 It's Today! 🎉";
    return;
  }

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  const seconds = Math.floor((diff / 1000) % 60);

  document.getElementById("days").textContent = days;
  document.getElementById("hours").textContent = hours;
  document.getElementById("minutes").textContent = minutes;
  document.getElementById("seconds").textContent = seconds;
}

setInterval(updateCountdown, 1000);
updateCountdown();


window.onload = function() {
    // Fireworks on Forever Together page
    confetti({
      particleCount: 150,
      spread: 90,
      origin: { y: 0.5 },
      emojis: ["💖", "🎆", "🎉", "💍", "💑"],
    });
  };
  

  function showOurStory() {
    const story = document.getElementById("ourStory");
    story.style.display = "block";
    const heartfeltMessage = document.getElementById("heartfeltMessage");
    heartfeltMessage.innerHTML = "<h2>Our Forever Together 💕</h2> <p>From the moment our paths crossed, I knew my life would never be the same. You've become the rhythm in my silence, the warmth in my coldest days, and the dream I never want to wake from. Every shared smile, every gentle touch, and every heartfelt laugh we've exchanged has been a piece of our own fairytale. You've shown me love that is patient, kind, and endlessly inspiring. I cherish the quiet mornings, the late-night talks, and the simple moments in between that remind me how lucky I am to have you. As we look toward the future, I promise to walk with you hand in hand through every season of life. I want to grow old with you, share our dreams, weather storms, and celebrate every joy. Thank you for choosing me, loving me, and making this journey magical. This is only the beginning of our forever, and I can't wait to write the rest of our story—with you. 💕</p>";
  }
  

  function addFlyingHearts() {
    const hearts = ["💖", "💕", "💘", "💝", "💞"];
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.2 },
      emojis: hearts,
      gravity: 0.5
    });
  }
  
  // Trigger flying hearts when page loads
  window.onload = function() {
    addFlyingHearts();
  };

  function answerYes() {
  confettiExplosion(); // Trigger confetti
  alert("YAY!!! 💖 I can't wait to spend forever with you!");
  setTimeout(function() {
    window.location.href = "forever-together.html"; // Redirect after 2 seconds
  }, 2000);
}
