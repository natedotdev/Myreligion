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

function goToPage(page) {
  window.location.href = page;
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

document.addEventListener("DOMContentLoaded", function () {
  var demoMembers = [
    { id: 1, name: "Abena Mensah", gender: "Female", phone: "+233 24 123 4567", department: "Choir" },
    { id: 2, name: "Kwame Boateng", gender: "Male", phone: "+233 55 987 1234", department: "Ushering" },
    { id: 3, name: "Esi Arhin", gender: "Female", phone: "+233 20 876 5432", department: "Media" },
    { id: 4, name: "Kofi Adu", gender: "Male", phone: "+233 26 333 4444", department: "Choir" }
  ];

  function renderMembers(members) {
    var tbody = document.getElementById("members-list");
    tbody.innerHTML = "";

    for (var i = 0; i < members.length; i++) {
      var member = members[i];
      var row = document.createElement("tr");
      row.innerHTML = `
        <td>${i + 1}</td>
        <td>${member.name}</td>
        <td>${member.gender}</td>
        <td>${member.phone}</td>
        <td>${member.department}</td>
        <td>
          <div class="action-buttons">
            <button class="action-btn view" onclick="viewMember(${member.id})">View</button>
            <button class="action-btn edit" onclick="editMember(${member.id})">Edit</button>
            <button class="action-btn delete" onclick="deleteMember(${member.id})">Delete</button>
          </div>
        </td>
      `;
      tbody.appendChild(row);
    }
  }

  function populateDepartmentFilter(members) {
    var departmentSelect = document.getElementById("departmentFilter");
    var departments = [];

    for (var i = 0; i < members.length; i++) {
      var dept = members[i].department;
      if (departments.indexOf(dept) === -1) {
        departments.push(dept);
        var option = document.createElement("option");
        option.value = dept;
        option.textContent = dept;
        departmentSelect.appendChild(option);
      }
    }
  }

  function applyFilters() {
    var gender = document.getElementById("genderFilter").value;
    var department = document.getElementById("departmentFilter").value;

    var filtered = demoMembers.filter(function (m) {
      return (gender === "" || m.gender === gender) &&
             (department === "" || m.department === department);
    });

    renderMembers(filtered);
  }

  document.getElementById("genderFilter").addEventListener("change", applyFilters);
  document.getElementById("departmentFilter").addEventListener("change", applyFilters);

  // Load initial
  renderMembers(demoMembers);
  populateDepartmentFilter(demoMembers);
});

