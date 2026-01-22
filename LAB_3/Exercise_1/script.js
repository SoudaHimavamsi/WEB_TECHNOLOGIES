const form = document.getElementById("registerForm");
const role = document.getElementById("role");
const skillsDiv = document.getElementById("skillsDiv");
const errorMsg = document.getElementById("errorMsg");

role.addEventListener("change", handleRoleChange);
form.addEventListener("submit", validateForm);

// Show / Hide fields based on role
function handleRoleChange() {
  if (role.value === "admin") {
    skillsDiv.style.display = "none";
  } else {
    skillsDiv.style.display = "table-row";
  }
}

// Email domain validation
function validateEmail(email) {
  return email.endsWith("@gmail.com") || email.endsWith("@edu.in");
}

// Role-based password validation
function validatePassword(password, role) {
  if (role === "student") {
    return password.length >= 6;
  }

  if (role === "teacher") {
    return password.length >= 8 && /\d/.test(password);
  }

  if (role === "admin") {
    return (
      password.length >= 10 &&
      /\d/.test(password) &&
      /[!@#$%^&*]/.test(password)
    );
  }

  return false;
}

// Highlight valid / invalid fields
function markField(field, valid) {
  field.classList.remove("valid", "invalid");
  field.classList.add(valid ? "valid" : "invalid");
}

// Main validation function
function validateForm(event) {
  event.preventDefault();
  errorMsg.textContent = "";

  let isValid = true;
  let messages = [];

  const email = document.getElementById("email");
  const password = document.getElementById("password");
  const confirmPassword = document.getElementById("confirmPassword");
  const skills = document.getElementById("skills");

  // Email check
  if (!validateEmail(email.value)) {
    markField(email, false);
    isValid = false;
  } else {
    markField(email, true);
  }

  // Password strength check
  if (!validatePassword(password.value, role.value)) {
    markField(password, false);
    isValid = false;
    messages.push("Weak password: add a special character");
  } else {
    markField(password, true);
  }

  // Confirm password check
  if (password.value !== confirmPassword.value) {
    markField(confirmPassword, false);
    isValid = false;
    messages.push("Passwords do not match");
  } else {
    markField(confirmPassword, true);
  }

  // Skills check (Teacher only)
  if (role.value === "teacher") {
    if (skills.value.trim() === "") {
      markField(skills, false);
      isValid = false;
    } else {
      markField(skills, true);
    }
  }

  // Final decision
  if (!isValid) {
    errorMsg.innerHTML = messages.join("<br>");
  } else {
    alert("Registration Successful!");
    form.reset();
  }
}
