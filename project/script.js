document.addEventListener("DOMContentLoaded", function() {
    const books = [
        { title: "The Hobbit", cover: "assets/the-hobbit.jpg", detailsPage: "book-details.html" },
        { title: "1984", cover: "assets/1984.jpg", detailsPage: "book-details.html" },
        { title: "Pride and Prejudice", cover: "assets/pride-and-prejudice.jpg", detailsPage: "book-details.html" },
        { title: "Harry Potter", cover: "assets/harry-potter.jpg", detailsPage: "book-details.html" },
        { title: "The Great Gatsby", cover: "assets/great-gatsby.jpg", detailsPage: "book-details.html" }
    ];

    const bookList = document.getElementById("bookList");

    books.forEach(book => {
        const bookCard = document.createElement("div");
        bookCard.classList.add("book-card");

        bookCard.innerHTML = `
            <img src="${book.cover}" alt="${book.title}">
            <h3>${book.title}</h3>
            <a href="${book.detailsPage}">View Details</a>
        `;

        bookList.appendChild(bookCard);
    });
});

// Book search function
function searchBooks() {
    const query = document.getElementById("searchBar").value.toLowerCase();
    const bookCards = document.querySelectorAll(".book-card");

    bookCards.forEach(card => {
        const title = card.querySelector("h3").textContent.toLowerCase();
        card.style.display = title.includes(query) ? "block" : "none";
    });
}
