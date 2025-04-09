function login(event) {
  event.preventDefault();
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;

  const stored = JSON.parse(localStorage.getItem('myReligionAdmin'));
  if (stored && stored.email === username && stored.password === password) {
    alert('Login successful!');
    window.location.href = 'dashboard.html';
  } else {
    alert('Invalid login credentials');
  }
}

function goToLicenseKey() {
  window.location.href = 'enter-license.html';
}