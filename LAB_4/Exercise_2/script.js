const searchInput = document.getElementById("searchInput");
const resultsDiv = document.getElementById("results");
const statusText = document.getElementById("status");

let debounceTimer;

// Debounce function
searchInput.addEventListener("input", () => {
    clearTimeout(debounceTimer);

    debounceTimer = setTimeout(() => {
        searchProducts(searchInput.value.trim());
    }, 400); // delay API calls while typing
});

function searchProducts(query) {

    if (query === "") {
        resultsDiv.innerHTML = "";
        statusText.textContent = "";
        return;
    }

    statusText.textContent = "Searching...";

    fetch("products.json")
        .then(response => {
            if (!response.ok) {
                throw new Error("Failed to fetch data");
            }
            return response.json();
        })
        .then(data => {

            const products = data.products;

            // filter matching results
            const filtered = products.filter(product =>
                product.name.toLowerCase().includes(query.toLowerCase())
            );

            displayResults(filtered);
        })
        .catch(error => {
            console.error(error);
            statusText.textContent = "Error loading products";
            resultsDiv.innerHTML = "";
        });
}

function displayResults(products) {

    resultsDiv.innerHTML = "";

    if (products.length === 0) {
        statusText.textContent = "No results found";
        return;
    }

    statusText.textContent = "";

    products.forEach(product => {

        const card = document.createElement("div");
        card.classList.add("product-card");

        card.innerHTML = `
            <h3>${product.name}</h3>
            <p>Price: ₹${product.price}</p>
            <p>Category: ${product.category}</p>
        `;

        resultsDiv.appendChild(card);
    });
}
