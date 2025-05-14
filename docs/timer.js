// Timer
function startTimer(minutes, name) {
  window.location.href = `timer.html?time=${minutes}&name=${encodeURIComponent(name)}`;
}

if (window.location.href.includes('timer.html')) {
  const urlParams = new URLSearchParams(window.location.search);
  const name = urlParams.get('name');
  const minutes = parseInt(urlParams.get('time')) || 6;

  if (name) {
    document.getElementById('egg-type').textContent = decodeURIComponent(name);
  }

  // Optional: start timer logic here
  let time = minutes * 60;
  const countdownElement = document.getElementById('countdown'); // if you have one

  function updateTimer() {
    const mins = Math.floor(time / 60);
    const secs = time % 60;
    countdownElement.textContent = `${mins}:${secs.toString().padStart(2, '0')}`;
    if (time > 0) {
      time--;
      setTimeout(updateTimer, 1000);
    } else {
      countdownElement.textContent = "Time's up!";
    }
  }

  if (countdownElement) {
    updateTimer();
  }
}