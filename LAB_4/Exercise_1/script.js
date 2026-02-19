const usernameInput = document.getElementById("username");
const feedback = document.getElementById("feedback");
const loading = document.getElementById("loading");
const form = document.getElementById("registerForm");

let usernameAvailable = false;

// Trigger check while typing
usernameInput.addEventListener("input", checkUsername);

function checkUsername() {

    const username = usernameInput.value.trim();

    if (username.length < 3) {
        feedback.textContent = "Username must be at least 3 characters";
        feedback.style.color = "orange";
        return;
    }

    // Show loading indicator
    loading.style.display = "inline";
    feedback.textContent = "";

    // AJAX request using Fetch API
    fetch("users.json")
        .then(response => response.json())
        .then(data => {

            loading.style.display = "none";

            const exists = data.usernames.includes(username.toLowerCase());

            if (exists) {
                feedback.textContent = "Username already taken";
                feedback.style.color = "red";
                usernameAvailable = false;
            } else {
                feedback.textContent = "Username available";
                feedback.style.color = "green";
                usernameAvailable = true;
            }
        })
        .catch(error => {
            loading.style.display = "none";
            feedback.textContent = "Error checking username";
            feedback.style.color = "red";
            console.error(error);
        });
}

// Prevent form submission
form.addEventListener("submit", function(e) {

    if (!usernameAvailable) {
        e.preventDefault();
        alert("Please choose an available username.");
    }
});
