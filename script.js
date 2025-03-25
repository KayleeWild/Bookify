document.addEventListener("DOMContentLoaded", function () {
    const searchBar = document.getElementById("searchBar");
    const bookList = document.getElementById("bookList");

    searchBar.addEventListener("keyup", function (event) {
        const query = event.target.value;
        if (query.length > 2) {
            fetch(`https://openlibrary.org/search.json?q=${encodeURIComponent(query)}`)
                .then(response => response.json())
                .then(data => {
                    const books = data.docs.slice(0, 10);
                    bookList.innerHTML = "";

                    books.forEach(book => {
                        const bookCard = document.createElement("div");
                        bookCard.classList.add("book-card");
                        const coverImg = book.cover_i
                            ? `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`
                            : "https://via.placeholder.com/150x200?text=No+Cover";

                        bookCard.innerHTML = `
                            <img src="${coverImg}" alt="${book.title}">
                            <h3>${book.title}</h3>
                            <p>${book.author_name ? book.author_name.join(', ') : 'Unknown Author'}</p>
                            <button class="btn favorite" data-title="${book.title}" data-author="${book.author_name ? book.author_name[0] : 'Unknown'}">Add to Favorite</button>
                        `;
                        bookList.appendChild(bookCard);
                    });

                    document.querySelectorAll(".favorite").forEach(btn => {
                        btn.addEventListener("click", function () {
                            const title = this.getAttribute("data-title");
                            const author = this.getAttribute("data-author");
                            addToFavorites(1, title, author); // User ID hardcoded for now
                        });
                    });
                });
        }
    });
});

function addToFavorites(userId, title, author) {
    fetch("/api/user_favorites", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user_id: userId, title: title, author: author })
    })
    .then(response => {
        if (response.ok) {
            alert(`${title} added to your favorites!`);
        } else {
            alert(`Failed to add favorite.`);
        }
    });
}
