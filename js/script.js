document.addEventListener('DOMContentLoaded', () => {
  const countdown = document.getElementById('countdown');
  const rsvpButton = document.getElementById('rsvpButton');
  const nameInput = document.getElementById('nameInput');
  const confirmationMessage = document.getElementById('confirmationMessage');
  const video = document.getElementById('backgroundVideo');

  const eventDate = new Date('2025-02-01T13:30:00');

  function updateCountdown() {
    const now = new Date();
    const timeDifference = eventDate - now;

    if (timeDifference > 0) {
      const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);

      document.getElementById('days').textContent = days;
      document.getElementById('hours').textContent = hours;
      document.getElementById('minutes').textContent = minutes;
      document.getElementById('seconds').textContent = seconds;
    } else {
      countdown.innerHTML = '<p>¡La fiesta ya comenzó! 🎉</p>';
    }
  }

  setInterval(updateCountdown, 1000);

  rsvpButton.addEventListener('click', () => {
    const name = nameInput.value.trim();

    if (!name) {
      alert('Por favor, ingresa tu nombre antes de confirmar.');
      return;
    }

    fetch('https://script.google.com/macros/s/AKfycbyKYFyw0fsKd2dXpJ1PwxUq8xdg9kwv9sRT95wZ_qzJVVec9erW8Wq3Wc3P8eczhbR3/exec', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: name,
        confirmed: true
      })
    })
    .then(response => response.text())
    .then(data => {
      console.log('Éxito:', data);
      rsvpButton.style.display = 'none';
      confirmationMessage.style.display = 'block';
    })
    .catch(error => {
      console.error('Error:', error);
      alert('Hubo un problema al confirmar tu asistencia. Intenta de nuevo.');
    });
  });

  // Botón para pausar/reanudar el video
  const videoControlButton = document.createElement('button');
  videoControlButton.textContent = 'Pausar Video';
  videoControlButton.classList.add('button');
  document.body.appendChild(videoControlButton);

  videoControlButton.addEventListener('click', () => {
    if (video.paused) {
      video.play();
      videoControlButton.textContent = 'Pausar Video';
    } else {
      video.pause();
      videoControlButton.textContent = 'Reanudar Video';
    }
  });

  updateCountdown();
});
