// Dummy login: no authentication. Any input is accepted and the dashboard is shown.

const form = document.getElementById('loginForm');
const passwordInput = document.getElementById('password');
const toggle = document.getElementById('togglePassword');

toggle.addEventListener('click', () => {
  const hidden = passwordInput.type === 'password';
  passwordInput.type = hidden ? 'text' : 'password';
  toggle.textContent = hidden ? 'Hide' : 'Show';
});

form.addEventListener('submit', (event) => {
  event.preventDefault();

  const session = {
    email: form.email.value.trim() || 'staff@hospital.org',
    hospitalCode: form.hospitalCode.value.trim().toUpperCase() || 'DEMO-001',
  };

  try {
    sessionStorage.setItem('emrSession', JSON.stringify(session));
  } catch (e) {
    // Storage unavailable; dashboard falls back to demo values.
  }

  window.location.href = 'dashboard.html';
});
