const bread = document.getElementById("bread-slice");
const speedSlider = document.getElementById("speed");
const topHeatSlider = document.getElementById("top-heat");
const bottomHeatSlider = document.getElementById("bottom-heat");
const startBtn = document.getElementById("start-btn");

startBtn.addEventListener("click", function() {
  
  // 1. Setup/Lock Interface
  startBtn.disabled = true;
  startBtn.innerText = "Processing...";

  // Reset bread state instantly (0s transition)
  bread.style.transition = "none";
  bread.style.backgroundColor = "#fdf5e6"; // Reset color
  bread.style.top = "-70px"; // Hide above toaster
  bread.style.transform = "translateX(0) translateY(0)"; // Reset movement

  // 2. Read Settings
  const speed = parseInt(speedSlider.value);
  const totalHeat = parseInt(topHeatSlider.value) + parseInt(bottomHeatSlider.value);

  // 3. Calculate Timings and Color
  // Lincat Speed 1 (Slow) = 10s internal time. Speed 10 (Fast) = 2s internal time.
  const internalDuration = 11 - speed; 
  const darknessScore = totalHeat * internalDuration;

  // Determine color (same logic as before)
  let finalColor = "#fdf5e6"; 
  if (darknessScore > 150) finalColor = "#2b1b10"; // Burnt
  else if (darknessScore > 100) finalColor = "#5c3317"; // Dark brown
  else if (darknessScore > 50) finalColor = "#c58346"; // Golden
  else if (darknessScore > 20) finalColor = "#e6bc98"; // Lightly toasted

  // 4. Start the Sequence (Short delay for reset)
  setTimeout(function() {

    // STAGE 1: Drop into Toaster
    // Bread appears on top rack, then moves Y into the chute
    bread.style.transition = "top 0.5s ease-in-out, transform 0.5s ease-in-out";
    bread.style.top = "10px"; // Appears on top rack

    // Short delay before dropping *inside*
    setTimeout(() => {
        // Drop inside (moves down, and overflow:hidden will conceal it)
        bread.style.transition = "top 0.6s ease-in, background-color 0.1s";
        bread.style.top = "100px"; 
    }, 600);

    // STAGE 2: internal Toasting (Simulated wait)
    // After 1.2s (drop sequence), we 'start toasting'. The bread is hidden.
    setTimeout(() => {
        // Activate elements visual (make them glow red)
        document.querySelectorAll('.element').forEach(el => el.style.backgroundColor = '#ff4500');
        
        // We animate the color change smoothly OVER the conveyor duration,
        // even though you can't see it yet.
        bread.style.transition = `background-color ${internalDuration}s linear`;
        bread.style.backgroundColor = finalColor;
        
        startBtn.innerText = `Toasting (${internalDuration}s)...`;
    }, 1200);

    // STAGE 3: Exit (Emerge in tray)
    // This happens exactly when the toasting time ends (1.2s setup + duration)
    setTimeout(() => {
        // Deactivate elements
        document.querySelectorAll('.element').forEach(el => el.style.backgroundColor = '#555');

        // We need to 'teleport' the bread instantly to just above the exit tray 
        // while it's still hidden by overflow:hidden.
        bread.style.transition = "none";
        bread.style.top = "180px"; // Ready to emerge

        // Introduce a tiny gap to allow the 'teleport' to happen before we animate the emergence.
        setTimeout(() => {
            // Emerge: Animate the bread dropping into the tray, and slightly forward.
            bread.style.transition = "transform 0.8s ease-out";
            bread.style.transform = "translateY(40px) translateX(15px) rotate(5deg)"; 
            startBtn.innerText = "Enjoy!";
        }, 50);

    }, 1200 + (internalDuration * 1000));

    // STAGE 4: Final Reset (unlock button)
    // Allow 1 second after emerging before unlocking the button.
    setTimeout(() => {
        startBtn.disabled = false;
        startBtn.innerText = "Start Toasting";
    }, 1200 + (internalDuration * 1000) + 1000);

  }, 100);

});