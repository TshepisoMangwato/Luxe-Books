const express = require("express");
const destinations = require("./data");

const app = express();
const PORT = 5000;

// Allow the server to read JSON request bodies
app.use(express.json());

// Home route
app.get("/", (req, res) => {
    res.send(`
        <h1>Welcome to Mzansi Travel API</h1>
        <p>Explore beautiful destinations across South Africa.</p>

        <h2>Available endpoints</h2>
        <ul>
            <li>GET /api/destinations</li> 
            <li>GET /api/destinations/:id</li> 
            <li>GET /api/destinations/search?q=kruger</li> 
        </ul>
    `);
});

// Get all destinations
app.get("/api/destinations", (req, res) => {
    const { province, city } = req.query;

    let results = destinations;

    // Filter by province
    if (province) {
        results = results.filter(destination =>
            destination.province.toLowerCase() === province.toLowerCase()
        );
    }

    // Filter by city
    if (city) {
        results = results.filter(destination =>
            destination.city.toLowerCase() === city.toLowerCase()
        );
    }

    res.json({
        count: results.length,
        data: results
    });
});


// Search destinations


// Get by destination ID

// Handle unknown routes
app.use((req, res) => {
    res.status(404).json({
        message: "404 - Page not found"
    });
});

// Start server
app.listen(PORT, () => {
    console.log(`Mzansi Travel API running at http://localhost:${PORT}`);
});