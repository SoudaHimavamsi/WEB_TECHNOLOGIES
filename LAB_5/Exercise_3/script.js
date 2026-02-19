let students = [];

// Fetch JSON data
window.onload = function() {
    fetch('students.json')
        .then(response => {
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            return response.json();
        })
        .then(data => {
            students = data;
            renderTable();
            showMessage("Student data loaded successfully.", "green");
        })
        .catch(error => {
            // Handle JSON parsing errors or file not found
            showMessage("Error parsing JSON or loading file.", "red");
            console.error("Fetch error:", error);
        });
};

// Read -> Display all students in a table
function renderTable() {
    const tableBody = document.getElementById("studentTableBody");
    tableBody.innerHTML = "";

    students.forEach((student, index) => {
        const row = `<tr>
            <td>${student.id}</td>
            <td>${student.name}</td>
            <td>${student.course}</td>
            <td>${student.marks}</td>
            <td>
                <button onclick="editStudent(${index})">Edit</button>
                <button onclick="deleteStudent(${index})" style="background-color: #dc3545; color: white;">Delete</button>
            </td>
        </tr>`;
        tableBody.innerHTML += row;
    });
}

// Create & Update -> Add or modify student object
function saveStudent() {
    const id = document.getElementById("studentId").value.trim();
    const name = document.getElementById("studentName").value.trim();
    const course = document.getElementById("studentCourse").value.trim();
    const marks = document.getElementById("studentMarks").value.trim();
    const editIndex = document.getElementById("editIndex").value;

    // Validate input fields before submission
    if (!id || !name || !course || !marks) {
        showMessage("All fields are required.", "red");
        return;
    }

    const studentData = { id, name, course, marks: parseInt(marks) };

    if (editIndex === "-1") {
        // Create -> Add new student object
        students.push(studentData);
        showMessage("Student added successfully.", "green");
    } else {
        // Update -> Modify marks or course
        students[editIndex] = studentData;
        showMessage("Student updated successfully.", "green");
        document.getElementById("editIndex").value = "-1"; // Reset mode
    }

    document.getElementById("studentForm").reset();
    renderTable(); // Update UI dynamically without page refresh
}

// Prepare Update -> Load data into form
function editStudent(index) {
    const student = students[index];
    document.getElementById("studentId").value = student.id;
    document.getElementById("studentName").value = student.name;
    document.getElementById("studentCourse").value = student.course;
    document.getElementById("studentMarks").value = student.marks;
    document.getElementById("editIndex").value = index;
    showMessage("Edit details and click Save Student.", "blue");
}

// Delete -> Remove student object
function deleteStudent(index) {
    if (confirm("Delete this student record?")) {
        students.splice(index, 1);
        renderTable();
        showMessage("Student deleted.", "green");
        document.getElementById("studentForm").reset();
        document.getElementById("editIndex").value = "-1";
    }
}

// Helper for success/error messages
function showMessage(msg, color) {
    const msgDiv = document.getElementById("message");
    msgDiv.textContent = msg;
    msgDiv.style.color = color;
    setTimeout(() => msgDiv.textContent = "", 3000);
}