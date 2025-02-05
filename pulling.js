document.addEventListener("DOMContentLoaded", async () => {
    const bookList = document.getElementById("book-list");

    try {
        let bookData = [];
        
        // Fetch books from Open Library API
        const response = await fetch("https://openlibrary.org/subjects/fantasy.json?limit=200");
        const data = await response.json();

        data.works.forEach(book => {
            if (book.cover_id) {
                bookData.push({
                    title: book.title,
                    image: `https://covers.openlibrary.org/b/id/${book.cover_id}-M.jpg`
                });
            }
        });

        // Sort alphabetically
        bookData.sort((a, b) => a.title.localeCompare(b.title));

        // Add to the page
        bookData.forEach(book => {
            const listItem = document.createElement("li");
            listItem.innerHTML = `<img src="${book.image}" alt="${book.title}"> ${book.title}`;
            bookList.appendChild(listItem);
        });
    } catch (error) {
        console.error("Error fetching books:", error);
    }
});
