document.addEventListener("click", () => {
    var unlockSound = new Audio("/sounds/explosion.mp3");
    unlockSound.play().then(() => {
        console.log("Audio unlocked after user interaction.");
    }).catch(error => {
        console.error("Audio playback error:", error);
    });
}, { once: true }); // Runs only once

// Function to create a falling icon
function createFallingIcon() {
    const icon = document.createElement("img");
    icon.src = "/imgs/Gaming.png"; // Ensure correct path
    icon.classList.add("icon");
    icon.draggable = false; // Disable dragging

    // Random horizontal position (between 0 and window width)
    const startX = Math.random() * (window.innerWidth - 80);
    icon.style.left = `${startX}px`;

    // Append icon to body
    document.body.appendChild(icon);

    // Animate falling effect
    let positionY = -100; // Start above the screen
    let rotation = 0; // Initial rotation
    const fallSpeed = Math.random() * 3 + 2; // Random fall speed (2-5 px per frame)
    const spinSpeed = Math.random() * 5 + 2; // Random spin speed (2-7 degrees per frame)

    // Add event listener for clicking to destroy the icon
    icon.addEventListener("click", () => destroyIcon(icon, positionY, startX));

    // Animate the falling effect
    const fallInterval = setInterval(() => {
        if (positionY < window.innerHeight) { // Stop before extending the document
            positionY += fallSpeed;
            rotation += spinSpeed;
            icon.style.top = `${positionY}px`;
            icon.style.transform = `rotate(${rotation}deg)`; // Apply rotation
        } else {
            clearInterval(fallInterval); // Stop updating once out of screen
            icon.remove(); // Ensure element is removed from the DOM
        }
    }, 16); // Smooth 60 FPS animation
}


// Function to destroy the icon and show an explosion
function destroyIcon(icon, posY, posX) {
    // Remove the clicked icon
    icon.remove();

    // Create an explosion image
    const explosion = document.createElement("img");

    explosion.src = "/imgs/explosion.gif"; // Add your explosion GIF in /wwwroot/imgs/
    explosion.classList.add("explosion");

    explosion.style.left = `${posX}px`;
    explosion.style.top = `${posY}px`;

    // Append explosion to body
    document.body.appendChild(explosion);
    const bombsound = new Audio("/sounds/explosion.mp3");

    console.log("Trying to play sound...");

    // Play sound immediately
    bombsound.volume=0.1
    bombsound.play().then(() => {
        console.log("Sound played successfully.");
    }).catch(error => {
        console.error("Audio playback error:", error);
    });
    // Remove explosion after animation (adjust time based on explosion duration)
    setTimeout(() => {
        explosion.remove();
    }, 500); // Explosion lasts 500ms
}

// Generate icons at random intervals
setInterval(createFallingIcon, 1000); // Every 500ms
