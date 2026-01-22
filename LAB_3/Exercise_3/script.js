const questions = [
    {
        id: "email",
        label: "Email Address",
        type: "email",
        required: true
    },
    {
        id: "name",
        label: "Full Name",
        type: "text",
        required: true,
        maxLength: 30
    },
    {
        id: "course",
        label: "Please select the course you are currently enrolled in",
        type: "select",
        required: true,
        options: [
            "Select a course",
            "Data Structures",
            "Machine Learning",
            "Web Development",
            "Artificial Intelligence"
        ]
    },
    {
        id: "rating",
        label: "How would you rate the overall quality of the course?",
        type: "radio",
        required: true,
        options: ["Excellent", "Very Good", "Good", "Fair", "Poor"]
    },
    {
        id: "understanding",
        label: "Are you able to clearly understand the concepts explained in the course?",
        type: "radio",
        required: true,
        options: ["Yes, completely", "Mostly", "Partially", "Not at all"]
    },
    {
        id: "expectations",
        label: "Is the course meeting your expectations?",
        type: "radio",
        required: true,
        options: [
            "Exceeded expectations",
            "Met expectations",
            "Partially met expectations",
            "Did not meet expectations"
        ]
    },
    {
        id: "usefulness",
        label: "Do you think this course is useful for students with similar goals as yours?",
        type: "radio",
        required: true,
        options: ["Yes", "No", "Not sure"]
    },
    {
        id: "feedback",
        label: "Please share your overall feedback or suggestions for improving the course",
        type: "textarea",
        required: true,
        maxLength: 200
    }
];

const table = document.getElementById("surveyTable");

questions.forEach(q => {
    const row = document.createElement("tr");

    const labelCell = document.createElement("td");
    labelCell.innerHTML = `<label>${q.label}</label>`;

    const inputCell = document.createElement("td");
    const errorDiv = document.createElement("div");
    errorDiv.className = "error";
    errorDiv.id = q.id + "Error";

    if (q.type === "text" || q.type === "email") {
        const input = document.createElement("input");
        input.type = q.type;
        input.id = q.id;
        inputCell.appendChild(input);
    }

    if (q.type === "select") {
        const select = document.createElement("select");
        select.id = q.id;
        q.options.forEach(opt => {
            const option = document.createElement("option");
            option.value = opt;
            option.textContent = opt;
            select.appendChild(option);
        });
        inputCell.appendChild(select);
    }

    if (q.type === "radio") {
        const optDiv = document.createElement("div");
        optDiv.className = "options";

        q.options.forEach(opt => {
            const label = document.createElement("label");
            label.innerHTML = `
                <input type="radio" name="${q.id}" value="${opt}">
                ${opt}
            `;
            optDiv.appendChild(label);
        });

        inputCell.appendChild(optDiv);
    }

    if (q.type === "textarea") {
        const textarea = document.createElement("textarea");
        textarea.id = q.id;
        textarea.rows = 4;
        inputCell.appendChild(textarea);
    }

    inputCell.appendChild(errorDiv);
    row.appendChild(labelCell);
    row.appendChild(inputCell);
    table.appendChild(row);
});

function validateForm() {
    let valid = true;

    questions.forEach(q => {
        const error = document.getElementById(q.id + "Error");
        error.textContent = "";

        if (["text", "email", "textarea"].includes(q.type)) {
            const value = document.getElementById(q.id).value.trim();
            if (q.required && value === "") {
                error.textContent = "This field is required";
                valid = false;
            } else if (q.maxLength && value.length > q.maxLength) {
                error.textContent = `Maximum ${q.maxLength} characters allowed`;
                valid = false;
            }
        }

        if (q.type === "select") {
            if (document.getElementById(q.id).value === "Select a course") {
                error.textContent = "Please select a course";
                valid = false;
            }
        }

        if (q.type === "radio") {
            if (!document.querySelector(`input[name="${q.id}"]:checked`)) {
                error.textContent = "Please select an option";
                valid = false;
            }
        }
    });

    return valid;
}

document.getElementById("surveyForm").addEventListener("submit", function (e) {
    if (!validateForm()) {
        e.preventDefault();
    } else {
        alert("Thank you! Your feedback has been submitted.");
    }
});
