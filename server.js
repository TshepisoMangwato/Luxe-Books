const express = require("express");
const books = require("./data");

const app = express();
const PORT = 5000;

// Allow the server to read JSON request bodies
app.use(express.json());

// Home route
app.get("/", (req, res) => {
    res.send(`
        <h1>Welcome to Bookshelf API</h1>
       <p>Explore and discover books through our API.</p>

        <h2>Developers</h2>
        <ul><li><a href="https://github.com/naomithomas458-del" target="_blank"> Naomi Thomas</a>- Software Developer</li>
            <li><a href="https://github.com/TshepisoMangwato" target="_blank">Tshepiso Mangwato</a>- Software Developer</li></ul>

        <h2>Available Endpoints</h2>
        <ul>
        <li><a href="/api/about">GET /api/about</a></li>
        <li><a href="/api/books">GET /api/books</a></li>
        <li><a href="/api/books/random">GET /api/books/random</a></li>
        <li><a href="/api/books/1">GET /api/books/:id</a></li>
        <li><a href="/api/books/genre/Fantasy">GET /api/books/genre/:genre</a></li>
        <li><a href="/api/books/search?q=harry">GET /api/books/search?q=harry</a></li>
        </ul>
    `);
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

// Get all books with optional filtering
app.get("/api/books", (req, res) => {
    const { genre, author, isAvailable, isPopular } = req.query;

    let results = books;

    // Filter by genre
    if (genre) {
        results = results.filter(book =>
            book.genre.toLowerCase() === genre.toLowerCase()
        );
    }

    // Filter by author
    if (author) {
        results = results.filter(book =>
            book.author.toLowerCase().includes(author.toLowerCase())
        );
    }

    // Filter by availability
    if (isAvailable !== undefined) {
        results = results.filter(book =>
            book.isAvailable === (isAvailable === "true")
        );
    }

    // Filter by popularity
    if (isPopular !== undefined) {
        results = results.filter(book =>
            book.isPopular === (isPopular === "true")
        );
    }

    res.json({
        count: results.length,
        data: results
    });
});

// Get books by genre
app.get("/api/books/genre/:genre", (req, res) => {
    const genre = req.params.genre.toLowerCase();

    const results = books.filter(book =>
        book.genre.toLowerCase() === genre
    );

    if (results.length === 0) {
        return res.status(404).json({
            message: "No books found for this genre"
        });
    }

    res.json({
        count: results.length,
        data: results
    });
});

// Search books
app.get("/api/books/search", (req, res) => {
    const { q } = req.query;

    if (!q) {
        return res.status(400).json({
            message: "Please provide a search term"
        });
    }

    const searchTerm = q.toLowerCase();

    const results = books.filter(book =>
        book.title.toLowerCase().includes(searchTerm) ||
        book.author.toLowerCase().includes(searchTerm) ||
        book.genre.toLowerCase().includes(searchTerm) ||
        book.tags.some(tag => tag.toLowerCase().includes(searchTerm))
    );

    res.json({
        count: results.length,
        data: results
    });
});


// Get a random book
app.get("/api/books/random", (req, res) => {
    const randomIndex = Math.floor(Math.random() * books.length);
    const randomBook = books[randomIndex];

    res.json(randomBook);
});

// Get a book by ID
app.get("/api/books/:id", (req, res) => {
    const id = Number(req.params.id);

    const book = books.find(book => book.id === id);

    if (!book) {
        return res.status(404).json({
            message: "Book not found"
        });
    }

    res.json(book);
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