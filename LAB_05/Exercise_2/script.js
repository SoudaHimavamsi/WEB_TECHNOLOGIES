let xmlDoc = null;

// Load XML using AJAX
window.onload = function() {
    const xhr = new XMLHttpRequest();
    xhr.open("GET", "books.xml", true);
    xhr.onload = function() {
        if (xhr.status === 200 || xhr.status === 0) {
            xmlDoc = xhr.responseXML;
            if (!xmlDoc) {
                showMessage("Error loading XML.", "red");
                return;
            }
            renderBooks();
            showMessage("Library data loaded.", "green");
        }
    };
    xhr.send();
};

// Display books
function renderBooks() {
    const tbody = document.getElementById("bookTableBody");
    tbody.innerHTML = "";
    const books = xmlDoc.getElementsByTagName("book");

    for (let i = 0; i < books.length; i++) {
        const id = books[i].getElementsByTagName("id")[0].textContent;
        const title = books[i].getElementsByTagName("title")[0].textContent;
        const author = books[i].getElementsByTagName("author")[0].textContent;
        const status = books[i].getElementsByTagName("status")[0].textContent;

        // Create status dropdown dynamically to update status directly from the table
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${id}</td>
            <td>${title}</td>
            <td>${author}</td>
            <td>
                <select onchange="updateStatus(${i}, this.value)">
                    <option value="Available" ${status === 'Available' ? 'selected' : ''}>Available</option>
                    <option value="Checked Out" ${status === 'Checked Out' ? 'selected' : ''}>Checked Out</option>
                    <option value="Lost" ${status === 'Lost' ? 'selected' : ''}>Lost</option>
                </select>
            </td>
            <td>
                <button onclick="deleteBook(${i})" style="background-color: #dc3545; color: white; border: none; padding: 5px 10px; cursor: pointer;">Delete</button>
            </td>
        `;
        tbody.appendChild(row);
    }
}

// Add new <book> node
function addBook() {
    const id = document.getElementById("bookId").value.trim();
    const title = document.getElementById("bookTitle").value.trim();
    const author = document.getElementById("bookAuthor").value.trim();
    const status = document.getElementById("bookStatus").value;

    // Validation
    if (!id || !title || !author) {
        showMessage("Please fill all fields.", "red");
        return;
    }

    const newBook = xmlDoc.createElement("book");
    
    const idNode = xmlDoc.createElement("id"); idNode.textContent = id;
    const titleNode = xmlDoc.createElement("title"); titleNode.textContent = title;
    const authorNode = xmlDoc.createElement("author"); authorNode.textContent = author;
    const statusNode = xmlDoc.createElement("status"); statusNode.textContent = status;

    newBook.appendChild(idNode);
    newBook.appendChild(titleNode);
    newBook.appendChild(authorNode);
    newBook.appendChild(statusNode);

    xmlDoc.documentElement.appendChild(newBook);
    
    document.getElementById("bookForm").reset();
    renderBooks();
    showMessage("Book added successfully!", "green");
}

// Update availability status
function updateStatus(index, newStatus) {
    const books = xmlDoc.getElementsByTagName("book");
    books[index].getElementsByTagName("status")[0].textContent = newStatus;
    showMessage("Status updated successfully!", "blue");
}

// Delete a book entry
function deleteBook(index) {
    if (confirm("Are you sure you want to delete this book?")) {
        const books = xmlDoc.getElementsByTagName("book");
        xmlDoc.documentElement.removeChild(books[index]);
        renderBooks();
        showMessage("Book deleted.", "green");
    }
}

function showMessage(msg, color) {
    const msgDiv = document.getElementById("message");
    msgDiv.textContent = msg;
    msgDiv.style.color = color;
    setTimeout(() => msgDiv.textContent = "", 3000);
}