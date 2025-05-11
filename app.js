function login(event) {
  event.preventDefault();
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;

  const stored = JSON.parse(localStorage.getItem('myReligionSetup'));
  if (stored && stored.accountDetails.username === username && stored.accountDetails.password === password) {
    alert('Login successful!');
    window.location.href = 'dashboard.html';
  } else {
    alert('Invalid login credentials');
  }
}

function goToLicenseKey() {
  window.location.href = 'enter-license.html';
}

function validateLicense() {
  const licenseKey = document.getElementById("licenseKey").value.trim();
  const licenseError = document.getElementById("licenseError");

  if (licenseKey.length < 10) {
    licenseError.textContent = "Invalid license key. It must be at least 10 characters.";
    return;
  }

  // Simulate license validation
  if (licenseKey === "VALID-KEY-123") {
    window.location.href = "setup-admin.html";
  } else {
    licenseError.textContent = "License key not recognized. Please try again.";
  }
}


// Handles admin account setup after license verification

function setupSystemConfig(event) {
  event.preventDefault();

  const churchDetails = {
    name: document.getElementById('churchName').value.trim(),
    location: document.getElementById('churchLocation').value.trim(),
    contact: document.getElementById('contactDetail').value.trim(),
    size: document.getElementById('congregationSize').value.trim(),
    theme: document.querySelector('input[name="theme"]:checked').value
  };

  const accountDetails = {
    firstName: document.getElementById('firstName').value.trim(),
    middleName: document.getElementById('middleName').value.trim(),
    lastName: document.getElementById('lastName').value.trim(),
    email: document.getElementById('email').value.trim(),
    username: document.getElementById('username').value.trim(),
    password: document.getElementById('password').value.trim(),
    credential: document.getElementById('credential').value
  };

  const error = document.getElementById('setupError');
  error.textContent = '';

  // Basic validation
  if (
    !churchDetails.name || !churchDetails.location || !churchDetails.contact ||
    !churchDetails.size || !accountDetails.firstName || !accountDetails.lastName ||
    !accountDetails.email || !accountDetails.username || !accountDetails.password || !accountDetails.credential
  ) {
    error.textContent = 'Please fill in all required fields.';
    return;
  }

  // Email format validation (optional)
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(accountDetails.email)) {
    error.textContent = 'Enter a valid email address.';
    return;
  }

  // Save to localStorage
  const systemConfig = {
    churchDetails,
    accountDetails
  };

  localStorage.setItem('myReligionSetup', JSON.stringify(systemConfig));
  alert('System setup complete. You can now log in.');
  window.location.href = 'index.html';
}

// Starter Functions for the member page

function viewMember(id) {
  alert(`Viewing member with ID: ${id}`);
}

function editMember(id) {
  alert(`Editing member with ID: ${id}`);
}

function deleteMember(id) {
  const confirmDelete = confirm("Are you sure you want to delete this member?");
  if (confirmDelete) {
    alert(`Member ${id} deleted!`);
  }
}
