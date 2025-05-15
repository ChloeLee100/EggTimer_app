function startTimer(minutes, name) {
  window.location.href = `timer.html?time=${minutes}&name=${encodeURIComponent(name)}`;
}

let timerInterval;
let time;
let totalTime;
let countdownElement;

const alarmAudio = new Audio('../images/alarm.wav');
alarmAudio.loop = true;

if (window.location.href.includes('timer.html')) {
  const urlParams = new URLSearchParams(window.location.search);
  const name = urlParams.get('name');
  const minutes = parseInt(urlParams.get('time')) || 6;

  if (name) {
    document.getElementById('egg-type').textContent = decodeURIComponent(name);
  }

  time = minutes * 60;
  totalTime = time;
  countdownElement = document.getElementById('countdown');

  const startBtn = document.querySelector('.timerStart-btn');
  const stopBtn = document.querySelector('.timerStop-btn');
  const soundStopBtn = document.querySelector('.soundStop-btn');

  if (countdownElement) {
    const mins = Math.floor(time / 60);
    const secs = time % 60;
    countdownElement.textContent = `${mins}:${secs.toString().padStart(2, '0')}`;
    countdownElement.style.background = `conic-gradient(#EFD162 0%, #FDF0A6 0%)`;
  }

  function updateTimer() {
    const mins = Math.floor(time / 60);
    const secs = time % 60;
    countdownElement.textContent = `${mins}:${secs.toString().padStart(2, '0')}`;

    const percentage = ((totalTime - time) / totalTime) * 100;
    countdownElement.style.background = `conic-gradient(#EFD162 ${percentage}%, #FDF0A6 ${percentage}%)`;

    if (time <= 0) {
      clearInterval(timerInterval);
      countdownElement.textContent = "0:00";
      countdownElement.style.background = `conic-gradient(#EFD162 100%, #FDF0A6 100%)`;

      // Play alarm
      alarmAudio.play();

      // Show only the sound stop button
      startBtn.classList.add('invisible-btn');
      stopBtn.classList.add('invisible-btn');
      soundStopBtn.classList.remove('invisible-btn');

      // Auto stop sound after 1 minute
      setTimeout(() => {
        alarmAudio.pause();
        alarmAudio.currentTime = 0;
        soundStopBtn.classList.add('invisible-btn');
        startBtn.classList.remove('invisible-btn');
        stopBtn.classList.remove('invisible-btn');
      }, 60000);

      return;
    }

    time--;
  }

  // Start timer
  if (startBtn) {
    startBtn.addEventListener('click', function (e) {
      e.preventDefault();
      if (!timerInterval) {
        updateTimer();
        timerInterval = setInterval(updateTimer, 1000);
      }
    });
  }

  // Stop timer
  if (stopBtn) {
    stopBtn.addEventListener('click', function (e) {
      e.preventDefault();
      clearInterval(timerInterval);
      timerInterval = null;
    });
  }

  // Stop sound
  if (soundStopBtn) {
    soundStopBtn.addEventListener('click', function (e) {
      e.preventDefault();
      alarmAudio.pause();
      alarmAudio.currentTime = 0;

      soundStopBtn.classList.add('invisible-btn');
      startBtn.classList.remove('invisible-btn');
      stopBtn.classList.remove('invisible-btn');

      window.location.href = 'timerEnd.html';
    });
  }
}
