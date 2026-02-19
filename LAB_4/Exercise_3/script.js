const form = document.getElementById("studentForm");
const tableBody = document.getElementById("studentTable");
const message = document.getElementById("message");

let students = []; // local working copy

// ---------- READ (Fetch Students) ----------
function loadStudents() {

    fetch("students.json")
        .then(response => {
            if (response.status === 200) return response.json();
            if (response.status === 404) throw new Error("Data not found");
            throw new Error("Server error");
        })
        .then(data => {
            students = data.students;
            renderTable();
        })
        .catch(err => showMessage(err.message, "red"));
}

// ---------- CREATE + UPDATE ----------
form.addEventListener("submit", function (e) {
    e.preventDefault();

    const id = document.getElementById("id").value;
    const name = document.getElementById("name").value;
    const department = document.getElementById("department").value;
    const marks = document.getElementById("marks").value;

    const existing = students.find(s => s.id === id);

    if (existing) {
        // UPDATE
        existing.name = name;
        existing.department = department;
        existing.marks = marks;

        showMessage("Student updated successfully", "green");
    } else {
        // CREATE
        students.push({ id, name, department, marks });
        showMessage("Student added successfully", "green");
    }

    renderTable();
    form.reset();
});

// ---------- DELETE ----------
function deleteStudent(id) {

    students = students.filter(student => student.id !== id);

    renderTable();
    showMessage("Student deleted", "green");
}

// ---------- EDIT (Fill Form) ----------
function editStudent(id) {

    const student = students.find(s => s.id === id);

    document.getElementById("id").value = student.id;
    document.getElementById("name").value = student.name;
    document.getElementById("department").value = student.department;
    document.getElementById("marks").value = student.marks;
}

// ---------- TABLE RENDER ----------
function renderTable() {

    tableBody.innerHTML = "";

    students.forEach(student => {

        const row = document.createElement("tr");

        row.innerHTML = `
            <td>${student.id}</td>
            <td>${student.name}</td>
            <td>${student.department}</td>
            <td>${student.marks}</td>
            <td>
                <button onclick="editStudent('${student.id}')">Edit</button>
                <button onclick="deleteStudent('${student.id}')">Delete</button>
            </td>
        `;

        tableBody.appendChild(row);
    });
}

// ---------- MESSAGE HANDLER ----------
function showMessage(text, color) {
    message.textContent = text;
    message.style.color = color;
}

// Initial load
loadStudents();
