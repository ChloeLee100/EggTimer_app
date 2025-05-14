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

  let time = minutes * 60;
  const totalTime = time;
  const countdownElement = document.getElementById('countdown');

  function updateTimer() {
    const mins = Math.floor(time / 60);
    const secs = time % 60;
    countdownElement.textContent = `${mins}:${secs.toString().padStart(2, '0')}`;

    const percentage = ((totalTime - time) / totalTime) * 100;
    countdownElement.style.background = `conic-gradient(#83B968 ${percentage}%, #FDF0A6 ${percentage}%)`;

    if (time > 0) {
      time--;
      setTimeout(updateTimer, 1000);
    } else {
      countdownElement.textContent = "0:00";
      countdownElement.style.background = `conic-gradient(#83B968 100%, #FDF0A6 100%)`;
    }
  }

  if (countdownElement) {
    updateTimer();
  }
}
