const express = require("express");
const path = require("path");
const books = require("./data");

const app = express();
const PORT = 5000;

// Allow the server to read JSON request bodies
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

// Home route
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "index.html"));
});

// About API
app.get("/api/about", (req, res) => {
    res.json({
        project: "Bookshelf API",
        description: "An API providing information about books and authors.",
        version: "1.0.0",
        developers: [
            {
                name: "Naomi Thomas",
                role: "Software Developer",
                github: "https://github.com/naomithomas458-del"
            },
            {
                name: "Tshepiso Mangwato",
                role: "Software Developer",
                github: "https://github.com/TshepisoMangwato"
            }
        ]
    });
});

// GET all books
// /api/books
// /api/books?search=atomic
// /api/books?category=Fiction
app.get("/api/books", (req, res) => {
  let results = books;

  // Search title or author
  if (req.query.search) {
    const search = req.query.search.toLowerCase();

    results = results.filter((book) =>
      book.title.toLowerCase().includes(search) ||
      book.author.toLowerCase().includes(search) ||
      book.category.toLowerCase().includes(search)
    );
  }

  // Filter by category
  if (req.query.category) {
    results = results.filter(
      (book) =>
        book.category.toLowerCase() === req.query.category.toLowerCase()
    );
  }

  res.json({
    success: true,
    count: results.length,
    data: results
  });
});

// Get books by category
app.get("/api/books/category/:category", (req, res) => {
    const category = req.params.category.toLowerCase();

    const results = books.filter(book =>
        book.category.toLowerCase() === category
    );

    if (results.length === 0) {
        return res.status(404).json({
            success: false,
            message: "No books found for this category"
        });
    }

    res.json({
        success: true,
        count: results.length,
        data: results
    });
});


// Get a random book
app.get("/api/books/random", (req, res) => {
    const randomIndex = Math.floor(Math.random() * books.length);
    const randomBook = books[randomIndex];

    res.json({
        success: true,
        data: randomBook
    });
});

// Get a book by ID
app.get("/api/books/:id", (req, res) => {
    const id = Number(req.params.id);

    const book = books.find((item) => item.id === id);

    if (!book) {
        return res.status(404).json({
            success: false,
            message: "Book not found"
        });
    }

    res.json({
        success: true,
        data: book
    });
});




// Handle unknown routes
app.use((req, res) => {
    res.status(404).json({
        message: "404 - Page not found"
    });
});

// Start server
app.listen(PORT, () => {
    console.log(`Bookshelf API running at http://localhost:${PORT}`);
});