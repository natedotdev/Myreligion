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

function verifyLicense() {
  const key = document.getElementById('licenseKey').value.trim();
  const errorMsg = document.getElementById('errorMsg');

  if (key === '') {
    errorMsg.textContent = 'License key cannot be empty.';
    return;
  }

  // Simulated check - you can later connect this to a backend
  if (key === 'MYRELIGION2025') {
    localStorage.setItem('myReligionLicense', key);
    window.location.href = 'setup-admin.html';
  } else {
    errorMsg.textContent = 'Invalid license key. Please try again.';
  }
}