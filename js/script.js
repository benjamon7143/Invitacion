document.addEventListener('DOMContentLoaded', () => {
  const countdown = document.getElementById('countdown');
  const rsvpButton = document.getElementById('rsvpButton');
  const nameInput = document.getElementById('nameInput');
  const confirmationMessage = document.getElementById('confirmationMessage');
  const confirmedName = document.getElementById('confirmedName');
  const video = document.getElementById('backgroundVideo');

  const eventDate = new Date('2025-02-01T13:30:00');

  function updateCountdown() {
    const now = new Date();
    const timeDifference = eventDate - now;

    console.log("Time difference:", timeDifference);  // Muestra la diferencia de tiempo

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
      console.log("The event has started!");
    }
  }

  setInterval(updateCountdown, 1000);

  rsvpButton.addEventListener('click', () => {
    const name = nameInput.value.trim();
    console.log("Name entered:", name);  // Muestra el nombre ingresado

    if (!name) {
      alert('Por favor, ingresa tu nombre antes de confirmar.');
      return;
    }

    console.log("Sending RSVP for name:", name);  // Muestra el nombre que se va a enviar

    fetch('https://mifiestacumple.netlify.app/.netlify/functions/saveRSVP', {
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
        console.log("Response from server:", data);  // Muestra la respuesta del servidor

        if (data.message === "Datos guardados correctamente") {
          console.log("RSVP confirmed for", name);  // Confirmación de éxito

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

  // Botón para alternar el sonido del video
  const soundControlButton = document.createElement('button');
  soundControlButton.textContent = 'Activar Sonido';
  soundControlButton.classList.add('button');
  document.body.appendChild(soundControlButton);

  soundControlButton.addEventListener('click', () => {
    if (video.muted) {
      video.muted = false;
      soundControlButton.textContent = 'Desactivar Sonido';
      console.log("Sound activated");  // Muestra cuando se activa el sonido
    } else {
      video.muted = true;
      soundControlButton.textContent = 'Activar Sonido';
      console.log("Sound muted");  // Muestra cuando se desactiva el sonido
    }
  });

  // Reproducir el video sin sonido al cargar
  video.muted = true;
  video.play();
  console.log("Video started with sound muted");

  updateCountdown();
});
