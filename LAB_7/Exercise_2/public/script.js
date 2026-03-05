const apiUrl = '/books';
const booksGrid = document.getElementById('booksGrid');
const pageTitle = document.getElementById('pageTitle');
const loadMoreBtn = document.getElementById('loadMoreBtn');

let currentPage = 1;

document.addEventListener('DOMContentLoaded', () => fetchBooks(1, true));

async function fetchBooks(page = 1, append = false) {
    try {
        const response = await fetch(`${apiUrl}?page=${page}`);
        const books = await response.json();
        
        if (books.length < 5) loadMoreBtn.style.display = 'none';
        else loadMoreBtn.style.display = 'inline-block';

        renderBooks(books, append);
    } catch (error) { console.error('Error:', error); }
}

async function searchBooks() {
    const title = document.getElementById('searchInput').value;
    if (!title) return;
    const response = await fetch(`${apiUrl}/search?title=${title}`);
    const books = await response.json();
    pageTitle.innerText = `Search: "${title}"`;
    loadMoreBtn.style.display = 'none';
    renderBooks(books, false);
}

async function filterCategory() {
    const category = document.getElementById('categoryFilter').value;
    if (!category) return resetView();
    const response = await fetch(`${apiUrl}/category/${category}`);
    const books = await response.json();
    pageTitle.innerText = `${category} Category`;
    loadMoreBtn.style.display = 'none';
    renderBooks(books, false);
}

async function sortBooks(field) {
    const response = await fetch(`${apiUrl}/sort/${field}`);
    const books = await response.json();
    pageTitle.innerText = `Sorted by ${field}`;
    loadMoreBtn.style.display = 'none';
    renderBooks(books, false);
}

async function getTopRated() {
    const response = await fetch(`${apiUrl}/top`);
    const books = await response.json();
    pageTitle.innerText = `Top Rated Books`;
    loadMoreBtn.style.display = 'none';
    renderBooks(books, false);
}

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

function renderBooks(books, append) {
    if (!append) booksGrid.innerHTML = '';
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