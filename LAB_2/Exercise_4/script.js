let users = JSON.parse(localStorage.getItem("users")) || [];

document.getElementById("userForm").addEventListener("submit", function(e) {
  e.preventDefault();

  let name = document.getElementById("name").value.trim();
  let email = document.getElementById("email").value.trim();
  let mobile = document.getElementById("mobile").value.trim();
  let password = document.getElementById("password").value.trim();

  // Validation
  if (!name || !email || !mobile || !password) {
    alert("All fields are mandatory!");
    return;
  }

  if (!/^\d{10}$/.test(mobile)) {
    alert("Mobile number must be 10 digits!");
    return;
  }

  if (password.length < 6) {
    alert("Password must be at least 6 characters!");
    return;
  }

  // Duplicate email check
  if (users.some(user => user.email === email)) {
    alert("Email already registered!");
    return;
  }

  let user = { name, email, mobile, password };
  users.push(user);
  localStorage.setItem("users", JSON.stringify(users));

  this.reset();
  displayUsers();
});

function displayUsers() {
  let table = document.getElementById("userTable");
  table.innerHTML = "";

  users.forEach((user, index) => {
    let row = `
      <tr>
        <td>${user.name}</td>
        <td>${user.email}</td>
        <td>${user.mobile}</td>
        <td>
          <button class="delete-btn" onclick="deleteUser(${index})">Delete</button>
        </td>
      </tr>`;
    table.innerHTML += row;
  });
}

function deleteUser(index) {
  users.splice(index, 1);
  localStorage.setItem("users", JSON.stringify(users));
  displayUsers();
}

document.getElementById("clearAll").addEventListener("click", function() {
  if (confirm("Are you sure you want to delete all users?")) {
    localStorage.removeItem("users");
    users = [];
    displayUsers();
  }
});

displayUsers();
