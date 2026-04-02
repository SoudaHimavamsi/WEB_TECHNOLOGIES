let currentStage = 0;
const stages = document.querySelectorAll(".stage");
const messageBox = document.getElementById("message");

let formData = {};

function showStage(index) {
    stages.forEach(stage => stage.classList.remove("active"));
    stages[index].classList.add("active");
    updateProgress();
    messageBox.innerText = "";
}

function updateProgress() {
    document.getElementById("progressBar").style.width =
        (currentStage / (stages.length - 1)) * 100 + "%";
}

function showError(msg) {
    messageBox.innerText = msg;
}

function nextStage() {
    if (!validateStage()) return;
    currentStage++;
    if (currentStage === 3) fillReview();
    showStage(currentStage);
}

function prevStage() {
    currentStage--;
    showStage(currentStage);
}

function validateStage() {

    if (currentStage === 0) {
        let name = document.getElementById("name").value.trim();
        let age = document.getElementById("age").value;

        if (name === "" || age < 18) {
            showError("Enter valid name and age (18+).");
            return false;
        }

        formData.name = name;
        formData.age = age;
    }

    if (currentStage === 1) {
        let email = document.getElementById("email").value.trim();
        let password = document.getElementById("password").value;

        if (!email.includes("@") || password.length < 6) {
            showError("Enter valid email and password (min 6 characters).");
            return false;
        }

        formData.email = email;
    }

    if (currentStage === 2) {
        let course = document.getElementById("course").value;
        let exp = document.querySelector("input[name='exp']:checked");
        let mode = document.querySelector("input[name='mode']:checked");

        if (!course || !exp || !mode) {
            showError("Please complete all fields in this stage.");
            return false;
        }

        formData.course = course;
        formData.exp = exp.value;
        formData.mode = mode.value;
    }

    return true;
}

function fillReview() {
    document.getElementById("rName").innerText = formData.name;
    document.getElementById("rAge").innerText = formData.age;
    document.getElementById("rEmail").innerText = formData.email;
    document.getElementById("rCourse").innerText = formData.course;
    document.getElementById("rExp").innerText = formData.exp;
    document.getElementById("rMode").innerText = formData.mode;
}

/* Prevent Enter key auto-submit */
document.getElementById("multiForm").addEventListener("keydown", function (e) {
    if (e.key === "Enter") e.preventDefault();
});

/* Final submit */
document.getElementById("multiForm").onsubmit = function (e) {
    e.preventDefault();
    alert("Form submitted successfully!");
};
