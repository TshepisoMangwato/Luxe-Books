// Get HTML elements
const booksContainer = document.getElementById("booksContainer");
const bookCount = document.getElementById("bookCount");

const searchInput = document.getElementById("searchInput");
const categoryFilter = document.getElementById("categoryFilter");

const clearFilters = document.getElementById("clearFilters");

const message = document.getElementById("message");


// Load books when the page opens
loadBooks();

// GET BOOKS
async function loadBooks() {

  const search = searchInput.value.trim();
  const category = categoryFilter.value;

  const params = new URLSearchParams();

  if (search) {
    params.append("search", search);
  }

  if (category) {
    params.append("category", category);
  }

  try {

    message.textContent = "Loading books...";

    const query = params.toString();

    const url = query
      ? `/api/books?${query}`
      : "/api/books";

    const response = await fetch(url);

    const result = await response.json();

    if (!response.ok) {
      throw new Error(
        result.message || "Could not load books"
      );
    }

    displayBooks(result.data);

    message.textContent = "";

  } catch (error) {

    message.textContent = error.message;

    booksContainer.innerHTML = `
      <div class="empty-state">

        <h3>
          Could not load books
        </h3>

        <p>
          Make sure the Node.js server is running.
        </p>

      </div>
    `;
  }
}

// DISPLAY BOOKS
function displayBooks(books) {

  bookCount.textContent =
    `${books.length} ${books.length === 1 ? "book" : "books"}`;


  if (books.length === 0) {

    booksContainer.innerHTML = `
      <div class="empty-state">

        <h3>
          No books found
        </h3>

        <p>
          Try a different search or category.
        </p>

      </div>
    `;

    return;
  }


  booksContainer.innerHTML = books
    .map((book) => {

      return `
        <article class="book-card">

          <div class="book-cover">

            <div class="book-cover-inner">

              <h3>
                ${escapeHtml(book.title)}
              </h3>

              <p>
                ${escapeHtml(book.author)}
              </p>

            </div>

          </div>


          <div class="book-content">

            <span class="category">
              ${escapeHtml(book.category)}
            </span>

            <p class="author">
              By ${escapeHtml(book.author)}
            </p>

            <p class="book-description">
              ${escapeHtml(book.description)}
            </p>


            <div class="book-bottom">

              <span class="price">
                R${Number(book.price).toFixed(2)}
              </span>

              <button
                class="buy-button"
                onclick="showBookMessage('${escapeForAttribute(book.title)}')">

                View Book

              </button>

            </div>

          </div>

        </article>
      `;

    })
    .join("");
}

// SEARCH

let searchTimer;

searchInput.addEventListener("input", () => {

  clearTimeout(searchTimer);

  searchTimer = setTimeout(() => {

    loadBooks();

  }, 300);

});

// CATEGORY FILTER

categoryFilter.addEventListener(
  "change",
  loadBooks
);

// CLEAR FILTERS

clearFilters.addEventListener("click", () => {

  searchInput.value = "";

  categoryFilter.value = "";

  loadBooks();

});

// CATEGORY CARDS

document
  .querySelectorAll(".category-card")
  .forEach((card) => {

    card.addEventListener("click", () => {

      const category =
        card.dataset.category;

      categoryFilter.value = category;

      document
        .getElementById("books")
        .scrollIntoView({
          behavior: "smooth"
        });

      loadBooks();

    });

  });

// SIMPLE BOOK MESSAGE

function showBookMessage(title) {

  alert(
    `You selected "${title}".\n\n`
    + "A shopping cart and checkout system "
    + "can be added in the next version."
  );

}

// SECURITY HELPER

function escapeHtml(value) {

  return String(value)

    .replaceAll("&", "&amp;")

    .replaceAll("<", "&lt;")

    .replaceAll(">", "&gt;")

    .replaceAll('"', "&quot;")

    .replaceAll("'", "&#039;");
}


function escapeForAttribute(value) {

  return String(value)
    .replaceAll("\\", "\\\\")
    .replaceAll("'", "\\'");

}