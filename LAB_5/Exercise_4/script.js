let inventory = [];

// Load JSON data using Fetch API
window.onload = function() {
    fetch('inventory.json')
        .then(response => {
            if (!response.ok) throw new Error("Failed to load inventory");
            return response.json();
        })
        .then(data => {
            inventory = data;
            renderTable(inventory);
            showMessage("Inventory loaded successfully.", "green");
        })
        .catch(error => {
            showMessage("Error loading inventory JSON.", "red");
            console.error(error);
        });
};

// Render table, calculate total value, and apply conditional formatting
function renderTable(dataToDisplay) {
    const tbody = document.getElementById("inventoryTableBody");
    tbody.innerHTML = "";
    let totalValue = 0;

    dataToDisplay.forEach((product) => {
        // Find the actual index in the main inventory array for edit/delete operations
        const actualIndex = inventory.findIndex(p => p.id === product.id);
        
        // Conditional formatting: low stock warning (5 or less)
        const rowClass = product.stock <= 5 ? "low-stock" : "";
        
        // Calculate total inventory value
        totalValue += (product.price * product.stock);

        const row = `<tr class="${rowClass}">
            <td>${product.id}</td>
            <td>${product.name}</td>
            <td>${product.category}</td>
            <td>$${parseFloat(product.price).toFixed(2)}</td>
            <td>${product.stock}</td>
            <td>
                <button onclick="editProduct(${actualIndex})">Edit</button>
                <button onclick="deleteProduct(${actualIndex})" style="background-color: #dc3545; color: white;">Delete</button>
            </td>
        </tr>`;
        tbody.innerHTML += row;
    });

    // Update total value display dynamically
    document.getElementById("totalValue").textContent = totalValue.toFixed(2);
}

// Add new product or Edit existing
function saveProduct() {
    const id = document.getElementById("prodId").value.trim();
    const name = document.getElementById("prodName").value.trim();
    const category = document.getElementById("prodCategory").value.trim();
    const price = parseFloat(document.getElementById("prodPrice").value);
    const stock = parseInt(document.getElementById("prodStock").value);
    const editIndex = document.getElementById("editIndex").value;

    // Error handling for invalid data
    if (!id || !name || !category || isNaN(price) || isNaN(stock)) {
        showMessage("Please fill all fields with valid data.", "red");
        return;
    }
    if (price < 0 || stock < 0) {
        showMessage("Price and Stock cannot be negative.", "red");
        return;
    }

    const productData = { id, name, category, price, stock };

    if (editIndex === "-1") {
        // Check for duplicate IDs
        if (inventory.some(p => p.id === id)) {
            showMessage("Product ID already exists!", "red");
            return;
        }
        inventory.push(productData);
        showMessage("Product added successfully.", "green");
    } else {
        inventory[editIndex] = productData;
        showMessage("Product updated successfully.", "green");
        document.getElementById("editIndex").value = "-1";
        document.getElementById("prodId").disabled = false; // re-enable ID field
    }

    document.getElementById("productForm").reset();
    document.getElementById("searchCategory").value = ""; // Clear search
    renderTable(inventory);
}

// Prepare Edit
function editProduct(index) {
    const product = inventory[index];
    document.getElementById("prodId").value = product.id;
    document.getElementById("prodId").disabled = true; // Prevent changing ID during edit
    document.getElementById("prodName").value = product.name;
    document.getElementById("prodCategory").value = product.category;
    document.getElementById("prodPrice").value = product.price;
    document.getElementById("prodStock").value = product.stock;
    document.getElementById("editIndex").value = index;
    showMessage("Edit details and save.", "blue");
}

// Delete Product
function deleteProduct(index) {
    if (confirm("Delete this product?")) {
        inventory.splice(index, 1);
        document.getElementById("searchCategory").value = "";
        renderTable(inventory);
        showMessage("Product deleted.", "green");
        document.getElementById("productForm").reset();
        document.getElementById("editIndex").value = "-1";
        document.getElementById("prodId").disabled = false;
    }
}

// Search product by category
function searchByCategory() {
    const query = document.getElementById("searchCategory").value.toLowerCase();
    const filteredData = inventory.filter(product => 
        product.category.toLowerCase().includes(query)
    );
    renderTable(filteredData);
}

// Show Message Helper
function showMessage(msg, color) {
    const msgDiv = document.getElementById("message");
    msgDiv.textContent = msg;
    msgDiv.style.color = color;
    setTimeout(() => msgDiv.textContent = "", 3000);
}