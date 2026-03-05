const apiUrl = '/books';
const booksGrid = document.getElementById('booksGrid');
const pageTitle = document.getElementById('pageTitle');
const loadMoreBtn = document.getElementById('loadMoreBtn');

let currentPage = 1;
let currentMode = 'all'; // Tracks if we are searching, filtering, or viewing all

document.addEventListener('DOMContentLoaded', () => fetchBooks(1, true));

// Core fetch function (handles pagination)
async function fetchBooks(page = 1, append = false) {
    try {
        const response = await fetch(`${apiUrl}?page=${page}`);
        const books = await response.json();
        
        if (books.length < 5) loadMoreBtn.style.display = 'none'; // Hide if no more pages
        else loadMoreBtn.style.display = 'inline-block';

        renderBooks(books, append);
    } catch (error) { console.error('Error:', error); }
}

// 1. Search [cite: 51]
async function searchBooks() {
    const title = document.getElementById('searchInput').value;
    if (!title) return;
    try {
        const response = await fetch(`${apiUrl}/search?title=${title}`); // [cite: 53]
        const books = await response.json();
        pageTitle.innerText = `Search Results for "${title}"`;
        hidePagination();
        renderBooks(books, false);
    } catch (error) { console.error('Error:', error); }
}

// 2. Filter Category [cite: 57]
async function filterCategory() {
    const category = document.getElementById('categoryFilter').value;
    if (!category) return resetView();
    try {
        const response = await fetch(`${apiUrl}/category/${category}`); // [cite: 59]
        const books = await response.json();
        pageTitle.innerText = `${category} Books`;
        hidePagination();
        renderBooks(books, false);
    } catch (error) { console.error('Error:', error); }
}

// 3. Sort [cite: 62]
async function sortBooks(field) {
    try {
        const response = await fetch(`${apiUrl}/sort/${field}`); // [cite: 65]
        const books = await response.json();
        pageTitle.innerText = `Books Sorted by ${field === 'price' ? 'Lowest Price' : 'Highest Rating'}`;
        hidePagination();
        renderBooks(books, false);
    } catch (error) { console.error('Error:', error); }
}

// 4. Top Rated [cite: 70]
async function getTopRated() {
    try {
        const response = await fetch(`${apiUrl}/top`); // [cite: 72]
        const books = await response.json();
        pageTitle.innerText = `Top Rated Books`;
        hidePagination();
        renderBooks(books, false);
    } catch (error) { console.error('Error:', error); }
}

// 5. Pagination - Load More [cite: 75]
function loadMore() {
    currentPage++;
    fetchBooks(currentPage, true);
}

function resetView() {
    document.getElementById('searchInput').value = '';
    document.getElementById('categoryFilter').value = '';
    pageTitle.innerText = 'Library Catalog';
    currentPage = 1;
    fetchBooks(1, false);
}

function hidePagination() {
    loadMoreBtn.style.display = 'none';
}

function renderBooks(books, append) {
    if (!append) booksGrid.innerHTML = '';
    
    if(books.length === 0 && !append) {
        booksGrid.innerHTML = `<p style="grid-column: 1/-1; text-align: center; color: #64748b;">No books found matching your criteria.</p>`;
        return;
    }

    books.forEach(book => {
        const card = document.createElement('div');
        card.className = 'book-card';
        card.innerHTML = `
            <div class="book-category">${book.category}</div>
            <div class="book-title">${book.title}</div>
            <div class="book-author">By ${book.author} • ${book.year}</div>
            <div class="book-footer">
                <div class="book-price">₹${book.price}</div>
                <div class="book-rating"><i class="fa-solid fa-star"></i> ${book.rating}/5</div>
            </div>
        `;
        booksGrid.appendChild(card);
    });
}