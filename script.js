const myLibrary = [];

function Book(title, author, pages, isRead) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.isRead = isRead;
}

Book.prototype.toggleReadStatus = function () {
  this.isRead = !this.isRead;
};

function addBookToLibrary(title, author, pages, isRead) {
  const newBook = new Book(title, author, pages, isRead);
  myLibrary.push(newBook);
  displayBooks();
}

function displayBooks() {
  const libraryDiv = document.getElementById("library");
  libraryDiv.innerHTML = ""; // Clear existing books

  myLibrary.forEach((book, index) => {
    const bookCard = document.createElement("div");
    bookCard.classList.add("book-card");

    const bookInfo = `
            <h3>${book.title}</h3>
            <p>Author: ${book.author}</p>
            <p>Pages: ${book.pages}</p>
            <p>Status: ${book.isRead ? "Read" : "Not Read"}</p>
        `;
    bookCard.innerHTML = bookInfo;

    const removeButton = document.createElement("button");
    removeButton.textContent = "Remove";
    removeButton.onclick = () => {
      myLibrary.splice(index, 1);
      displayBooks();
    };

    const toggleReadButton = document.createElement("button");
    toggleReadButton.textContent = "Toggle Read Status";
    toggleReadButton.onclick = () => {
      book.toggleReadStatus();
      displayBooks();
    };

    bookCard.appendChild(removeButton);
    bookCard.appendChild(toggleReadButton);
    libraryDiv.appendChild(bookCard);
  });
}

document.getElementById("new-book-btn").addEventListener("click", () => {
  const formContainer = document.getElementById("form-container");
  formContainer.style.display =
    formContainer.style.display === "none" ? "block" : "none";
});

document.getElementById("book-form").addEventListener("submit", (e) => {
  e.preventDefault();
  const title = document.getElementById("title").value;
  const author = document.getElementById("author").value;
  const pages = document.getElementById("pages").value;
  const isRead = document.getElementById("read").checked;

  addBookToLibrary(title, author, pages, isRead);

  // Reset form and hide it
  document.getElementById("book-form").reset();
  document.getElementById("form-container").style.display = "none";
});

// Initial display of books (if any)
displayBooks();
