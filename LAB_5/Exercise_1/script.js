let xmlDoc = null;

// Load XML using AJAX
function loadXML() {
    const xhr = new XMLHttpRequest();
    xhr.open("GET", "employees.xml", true);
    xhr.onload = function() {
        if (xhr.status === 200 || xhr.status === 0) { // status 0 is for local files sometimes
            try {
                xmlDoc = xhr.responseXML;
                // Handle empty or malformed XML errors
                if (!xmlDoc || xmlDoc.documentElement.nodeName === "parsererror") {
                    showMessage("Error: Malformed or empty XML.", "red");
                    return;
                }
                renderTable();
                showMessage("Data loaded successfully.", "green");
            } catch (e) {
                showMessage("Error parsing XML.", "red");
            }
        } else {
            showMessage("Failed to load XML file.", "red");
        }
    };
    xhr.onerror = function() {
        showMessage("AJAX Error. Ensure you are using a local server (like VS Code Live Server).", "red");
    };
    xhr.send();
}

// Read -> Display all employees
function renderTable() {
    const tableBody = document.getElementById("empTableBody");
    tableBody.innerHTML = ""; // Clear existing
    const employees = xmlDoc.getElementsByTagName("employee");

    for (let i = 0; i < employees.length; i++) {
        const id = employees[i].getElementsByTagName("id")[0].textContent;
        const name = employees[i].getElementsByTagName("name")[0].textContent;
        const dept = employees[i].getElementsByTagName("department")[0].textContent;
        const salary = employees[i].getElementsByTagName("salary")[0].textContent;

        const row = `<tr>
            <td>${id}</td>
            <td>${name}</td>
            <td>${dept}</td>
            <td>${salary}</td>
            <td>
                <button onclick="editEmployee(${i})">Edit</button>
                <button onclick="deleteEmployee(${i})">Delete</button>
            </td>
        </tr>`;
        tableBody.innerHTML += row;
    }
}

// Create & Update -> Add or modify node dynamically
function saveEmployee() {
    const id = document.getElementById("empId").value.trim();
    const name = document.getElementById("empName").value.trim();
    const dept = document.getElementById("empDept").value.trim();
    const salary = document.getElementById("empSalary").value.trim();
    const editIndex = document.getElementById("editRowIndex").value;

    if (!id || !name || !dept || !salary) {
        showMessage("All fields are required.", "red");
        return;
    }

    if (editIndex === "-1") {
        // Create new node
        const newEmp = xmlDoc.createElement("employee");
        
        const idNode = xmlDoc.createElement("id"); idNode.textContent = id;
        const nameNode = xmlDoc.createElement("name"); nameNode.textContent = name;
        const deptNode = xmlDoc.createElement("department"); deptNode.textContent = dept;
        const salaryNode = xmlDoc.createElement("salary"); salaryNode.textContent = salary;

        newEmp.appendChild(idNode);
        newEmp.appendChild(nameNode);
        newEmp.appendChild(deptNode);
        newEmp.appendChild(salaryNode);

        xmlDoc.documentElement.appendChild(newEmp);
        showMessage("Employee created successfully.", "green");
    } else {
        // Update existing node
        const employees = xmlDoc.getElementsByTagName("employee");
        const emp = employees[editIndex];
        emp.getElementsByTagName("id")[0].textContent = id;
        emp.getElementsByTagName("name")[0].textContent = name;
        emp.getElementsByTagName("department")[0].textContent = dept;
        emp.getElementsByTagName("salary")[0].textContent = salary;
        showMessage("Employee updated successfully.", "green");
        document.getElementById("editRowIndex").value = "-1"; // Reset mode
    }

    document.getElementById("empForm").reset();
    renderTable();
}

// Prepare Update -> Load data into form
function editEmployee(index) {
    const employees = xmlDoc.getElementsByTagName("employee");
    const emp = employees[index];

    document.getElementById("empId").value = emp.getElementsByTagName("id")[0].textContent;
    document.getElementById("empName").value = emp.getElementsByTagName("name")[0].textContent;
    document.getElementById("empDept").value = emp.getElementsByTagName("department")[0].textContent;
    document.getElementById("empSalary").value = emp.getElementsByTagName("salary")[0].textContent;
    
    document.getElementById("editRowIndex").value = index;
    showMessage("Edit details and click Save Employee.", "blue");
}

// Delete -> Remove node
function deleteEmployee(index) {
    if (confirm("Delete this employee?")) {
        const employees = xmlDoc.getElementsByTagName("employee");
        xmlDoc.documentElement.removeChild(employees[index]);
        renderTable();
        showMessage("Employee deleted.", "green");
        document.getElementById("empForm").reset();
        document.getElementById("editRowIndex").value = "-1";
    }
}

// Helper to show success/error messages
function showMessage(msg, color) {
    const msgDiv = document.getElementById("message");
    msgDiv.textContent = msg;
    msgDiv.style.color = color;
    setTimeout(() => msgDiv.textContent = "", 3000);
}

// Start app
window.onload = loadXML;