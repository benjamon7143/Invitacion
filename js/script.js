document.addEventListener('DOMContentLoaded', () => {
  const countdown = document.getElementById('countdown');
  const rsvpButton = document.getElementById('rsvpButton');
  const nameInput = document.getElementById('nameInput');
  const confirmationMessage = document.getElementById('confirmationMessage');
  const confirmedName = document.getElementById('confirmedName');
  const video = document.getElementById('backgroundVideo');
  const videoSoundToggle = document.getElementById('videoSoundToggle');

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

    fetch('https://script.google.com/macros/s/AKfycbyC_6vcvTczlBj8kW44MSixsd0o7Kz_OJ-Ie5H86JEOd4pIM2YsCURq3zIjITcZUELh/exec', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: name,
        confirmed: true
      })
    })
      .then(response => response.json())
      .then(data => {
        if (data.status === "success") {
          rsvpButton.style.display = 'none';
          confirmedName.textContent = name;
          confirmationMessage.style.display = 'block';
        } else {
          alert('Hubo un problema al registrar tu confirmación. Intenta de nuevo.');
        }
      })
      .catch(error => {
        console.error('Error:', error);
        alert('Hubo un problema al conectar con el servidor. Intenta de nuevo.');
      });
  });

  videoSoundToggle.addEventListener('click', () => {
    if (video.muted) {
      video.muted = false;
      videoSoundToggle.textContent = 'Desactivar Sonido';
    } else {
      video.muted = true;
      videoSoundToggle.textContent = 'Activar Sonido';
    }
  });

  updateCountdown();
});
