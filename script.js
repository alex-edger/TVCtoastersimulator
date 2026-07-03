const bread = document.getElementById("bread-slice");
const speedSlider = document.getElementById("speed");
const topHeatSlider = document.getElementById("top-heat");
const bottomHeatSlider = document.getElementById("bottom-heat");
const startBtn = document.getElementById("start-btn");

startBtn.addEventListener("click", function() {
  
  startBtn.disabled = true;
  startBtn.innerText = "Processing...";

  bread.style.transition = "none";
  bread.style.backgroundColor = "#fdf5e6"; 
  bread.style.top = "-70px"; 
  bread.style.transform = "translateX(0) translateY(0)"; 

  const speed = parseInt(speedSlider.value);
  const totalHeat = parseInt(topHeatSlider.value) + parseInt(bottomHeatSlider.value);

  const internalDuration = 11 - speed; 
  const darknessScore = totalHeat * internalDuration;

  let finalColor = "#fdf5e6"; 
  
  // The newly stretched curve
  if (darknessScore >= 140) {
      finalColor = "#2b1b10"; // Burnt (e.g. 2/9/9 = Score 162)
  } else if (darknessScore >= 110) {
      finalColor = "#7a4419"; // Very Dark 
  } else if (darknessScore >= 80) {
      finalColor = "#c58346"; // Perfectly Toasted (e.g. 6/9/9 = Score 90)
  } else if (darknessScore >= 65) {
      finalColor = "#e2b778"; // Lightly Toasted 
  } else if (darknessScore >= 40) {
      finalColor = "#f2e1c1"; // Barely Warmed (e.g. 5/5/5 = Score 60)
  } else {
      finalColor = "#fdf5e6"; // Literally Raw (too fast/too cold)
  }

  setTimeout(function() {

    bread.style.transition = "top 0.5s ease-in-out, transform 0.5s ease-in-out";
    bread.style.top = "10px"; 

    setTimeout(() => {
        bread.style.transition = "top 0.6s ease-in, background-color 0.1s";
        bread.style.top = "100px"; 
    }, 600);

    setTimeout(() => {
        document.querySelectorAll('.element').forEach(el => el.style.backgroundColor = '#ff4500');
        
        bread.style.transition = `background-color ${internalDuration}s linear`;
        bread.style.backgroundColor = finalColor;
        
        startBtn.innerText = `Toasting (${internalDuration}s)...`;
    }, 1200);

    setTimeout(() => {
        document.querySelectorAll('.element').forEach(el => el.style.backgroundColor = '#555');

        bread.style.transition = "none";
        bread.style.top = "180px"; 

        setTimeout(() => {
            bread.style.transition = "transform 0.8s ease-out";
            bread.style.transform = "translateY(40px) translateX(15px) rotate(5deg)"; 
            startBtn.innerText = "Enjoy!";
        }, 50);

    }, 1200 + (internalDuration * 1000));

    setTimeout(() => {
        startBtn.disabled = false;
        startBtn.innerText = "Start Toasting";
    }, 1200 + (internalDuration * 1000) + 1000);

  }, 100);
});
