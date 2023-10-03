document.addEventListener('DOMContentLoaded', function () {
  const audio = document.getElementById('backgroundAudio');
  if (audio) {
    audio.play().catch(error => {
      // A reprodução automática foi bloqueada, lidar com isso aqui
      console.error('Reprodução automática bloqueada:', error);
    });
  }

  const input = document.querySelector('.login__input');
  const button = document.querySelector('.login__button');
  const form = document.querySelector('.login-form');

  const validateInput = ({ target }) => {
    if (target.value.length > 3) {
      button.removeAttribute('disabled');
      return;
    }

    button.setAttribute('disabled', '');
  }

  const handleSubmit = (event) => {
    event.preventDefault();

    localStorage.setItem('player', input.value);
    window.location = 'pages/game.html';
  }

  input.addEventListener('input', validateInput);
  form.addEventListener('submit', handleSubmit);
});
