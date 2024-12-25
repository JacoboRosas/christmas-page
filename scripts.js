function getRandomColor() {
    // List of bright colors
    const brightColors = [
        "#FF0000", // Bright Red
        "#FF6600", // Bright Orange
        "#FFCC00", // Bright Yellow
        "#33CC33", // Bright Green
        "#00FF00", // Lime Green
        "#00CCFF", // Sky Blue
        "#0099FF", // Electric Blue
        "#CC33FF", // Bright Purple
        "#FF33FF", // Hot Pink
        "#FFFF00", // Neon Yellow
        "#FF1493", // Deep Pink
        "#FF6347", // Tomato Red
        "#32CD32", // Lime Green
        "#FFD700", // Gold
        "#FF4500", // Orange Red
        "#FF8C00", // Dark Orange
        "#00BFFF", // Deep Sky Blue
        "#FF1493", // Deep Pink
        "#FF00FF", // Magenta
        "#7FFF00", // Chartreuse
        "#FF6347", // Tomato
        "#DC143C", // Crimson
        "#32CD32", // Lime Green
        "#00FA9A", // Medium Spring Green
        "#8A2BE2", // Blue Violet
        "#D2691E", // Chocolate
        "#A52A2A", // Brown
        "#F4A300", // Orange Yellow
        "#B22222"  // Firebrick Red
    ];

    // Pick a random color from the array
    const randomIndex = Math.floor(Math.random() * brightColors.length);
    return brightColors[randomIndex];
}


// Function to create a firework
function createFirework() {
    const container = document.querySelector('.flex-item-header');
    const firework = document.createElement('div');
    firework.classList.add('firework');
  
    // Set a random distance for the firework's travel between 200px and 300px
    const randomDistance = Math.random() * 300 + 300; // Random distance between 200px and 300px
    firework.style.setProperty('--travel-distance', `-${randomDistance}px`); // Apply the random distance to the firework's animation (move up)
  
    // Set a random horizontal offset to add a slight angle
    const randomHorizontalOffset = Math.random() * 100 - 50; // Horizontal offset between -50px and 50px
    firework.style.setProperty('--horizontal-offset', `${randomHorizontalOffset}px`); // Apply the offset to the animation
  
    // Assign a random color to the firework
    const fireworkColor = getRandomColor(); // Assuming you have a function to generate random colors
    firework.style.backgroundColor = fireworkColor;
  
    // Position the firework randomly at the bottom
    firework.style.left = `${Math.random() * 100}vw`; // Random horizontal position
  
    // Append the firework to the container
    container.appendChild(firework);
  
    // Trigger explosion after a short delay
    setTimeout(() => {
      explodeFirework(firework, fireworkColor); // Add explosion logic
    }, 2000); // Explosion happens after the firework moves up
}
  
// Function to trigger explosion of the firework (with some random variation)
function explodeFirework(firework, fireworkColor) {
  const container = document.querySelector('.flex-item-header');

  // Get the current position of the firework
  const fireworkRect = firework.getBoundingClientRect();
  const fireworkX = fireworkRect.left + fireworkRect.width / 2;
  const fireworkY = fireworkRect.top + fireworkRect.height / 2;

  // Define the number of particles
  const numberOfParticles = 50;
  
  // Define the base angles for the particles (for a circular pattern)
  const baseAngles = Array.from({ length: numberOfParticles }, (_, i) => (i * (360 / numberOfParticles)));

  // Set the fixed base distance for the particles
  const baseDistance = 50; // Base distance from the explosion center

  // Generate the explosion particles with some random variation
  baseAngles.forEach(angle => {
    const particle = document.createElement('div');
    particle.classList.add('particle');

    // Add some randomness to the angle to make the explosion less uniform
    const randomizedAngle = angle + (Math.random() * 40 - 20); // Randomize the angle by up to ±20 degrees
    const randomizedDistance = baseDistance + (Math.random() * 20 - 10); // Randomize the distance by up to ±10px

    // Calculate the new offset values with the random variations
    const xOffset = Math.cos(randomizedAngle * (Math.PI / 180)) * randomizedDistance;
    const yOffset = Math.sin(randomizedAngle * (Math.PI / 180)) * randomizedDistance;

    // Set the particle's direction
    particle.style.setProperty('--x', `${xOffset}px`);
    particle.style.setProperty('--y', `${yOffset}px`);

    // Set color for the particle
    particle.style.backgroundColor = fireworkColor;

    // Position the particle at the firework's location
    particle.style.left = `${fireworkX}px`;
    particle.style.top = `${fireworkY}px`;

    // Append the particle to the container
    container.appendChild(particle);

    // Remove the particle after the animation completes
    setTimeout(() => {
      particle.remove();
    }, 1000);
  });

  // Remove the firework after it completes its upward travel
  firework.remove();
}
  
  // Function to create fireworks at random intervals
  function createFireworks() {
    setInterval(createFirework, 500); // Create a firework every 1.5 seconds
  }
  
  // Start creating fireworks when the page loads
  window.onload = createFireworks;














//Snowflakes 
function createSnowflakes() {
    const snowflakeCount = 50; 
    const container = document.querySelector('.flex-item-header'); 
    
    for (let i = 0; i < snowflakeCount; i++) {
      let snowflake = document.createElement('div');
      snowflake.classList.add('snowflake');
      
      snowflake.style.left = `${Math.random() * 100}vw`; 
      
      snowflake.style.animationDuration = `${Math.random() * 5 + 5}s`; 
      snowflake.style.animationDelay = `${Math.random() * 5}s`; 
  
      container.appendChild(snowflake);
    }
  }
  
  window.onload = createSnowflakes;




//Countdown
const targetDate = new Date('December 25, 2024 00:00:00 GMT').getTime();

const peruOffset = 5 * 60 * 60 * 1000; // 5 hours in milliseconds
const targetDatePET = targetDate + peruOffset;

function updateCountdown() {
  const now = new Date().getTime();  // Get current time in local timezone
  const distance = targetDatePET - now;  // Calculate time difference from Peru time

  const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((distance % (1000 * 60)) / 1000);

  
  const countdownElement = document.getElementById('countdown');
  countdownElement.innerHTML = `Exactamente... <span class="gradient-timer">${days}d ${hours}h ${minutes}m ${seconds}s</span>`;
  if (distance < 0) {
    clearInterval(interval);
    document.getElementById('countdown').innerHTML = "¡Feliz Navidad Ariana!";
  
    document.querySelectorAll('.remove-text').forEach(el => el.style.display = 'none');
    countdownElement.classList.add('gradient-red');

    const heartElement = document.createElement('h1');
    heartElement.textContent = "❤️🎄🎁🌟❤️";


    const flexContainer = document.querySelector('.flex-item-header');
    flexContainer.appendChild(heartElement);
    createFireworks();

  }
}

const interval = setInterval(updateCountdown, 1000);
updateCountdown();






document.addEventListener("DOMContentLoaded", () => {
    const wishes = document.querySelectorAll(".wish-list li");

    wishes.forEach(wish => {
        wish.addEventListener("click", () => {
            // Toggle the 'revealed' class on click
            if (!wish.classList.contains("revealed")) {
                wish.classList.add("revealed");
            }
        });
    });
});





// Get all the image elements
const images = document.querySelectorAll('.image-card-img');

// Get the modal (overlay) and the expanded image
const overlay = document.getElementById('overlay');
const expandedImg = document.getElementById('expanded-img');
const closeBtn = document.getElementById('close-btn');

// Add click event listeners to each image
images.forEach(img => {
    img.addEventListener('click', function () {
        // Set the src of the expanded image to the clicked image's src
        expandedImg.src = this.src;
        // Display the overlay
        overlay.style.display = 'flex';
    });
});

// Close the modal when the close button is clicked
closeBtn.addEventListener('click', function () {
    overlay.style.display = 'none';
});

// Close the modal when clicking outside the modal box (on the overlay)
overlay.addEventListener('click', function (event) {
    // Check if the click is outside the image (on the overlay)
    if (event.target === overlay) {
        overlay.style.display = 'none'; // Close the modal
    }
});


// New Countdown for the Gift
const giftTargetDate = new Date('December 24, 2024 22:00:00 GMT').getTime();
const peruGiftOffset = 5 * 60 * 60 * 1000; // 5 hours in milliseconds
const giftTargetDatePET = giftTargetDate + peruGiftOffset;

function updateGiftCountdown() {
  const currentTime = new Date().getTime(); // Get current time in local timezone
  const timeRemaining = giftTargetDatePET - currentTime; // Calculate time difference from Peru time

  const daysLeft = Math.floor(timeRemaining / (1000 * 60 * 60 * 24));
  const hoursLeft = Math.floor((timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutesLeft = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60));
  const secondsLeft = Math.floor((timeRemaining % (1000 * 60)) / 1000);

  const giftCountdownElement = document.getElementById('gift-countdown');
  giftCountdownElement.innerHTML = `${daysLeft}d ${hoursLeft}h ${minutesLeft}m ${secondsLeft}s`;

  if (timeRemaining < 0) {
    clearInterval(giftInterval);
    document.getElementById('gift-title').style.display = 'none';

    document.querySelectorAll('.remove-text').forEach(el => el.style.display = 'none');
    giftCountdownElement.innerHTML = "🎁¡Revisa Steam!🎁";
  }
}

const giftInterval = setInterval(updateGiftCountdown, 1000);
updateGiftCountdown();

