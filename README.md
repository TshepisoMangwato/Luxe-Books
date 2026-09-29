# Luxe Books - Online Book Store

An Online **Node.js + Express + HTML + CSS + JavaScript** Book Store project.

A frontend project with a REST API without introducing a database yet.

## Features

- View books
- Search books
- Filter books by category
- Responsive design
- Book categories

## Technologies

- HTML
- CSS
- JavaScript
- Node.js
- Express
- Nodemon

## Project structure

```text
Luxe Books/
│
├── public/
│   ├── index.html
│   ├── css/
│   │   └── style.css
│   └── js/
│       └── app.js
│
├── server.js
├── data.js
├── package-lock.json
├── package.json
└── README.md
```

## Installation

Open the project folder in VS Code.

Then open the terminal and run:

```bash
npm install
```

## Start the project

For development:

```bash
npm run dev
```

Or:

```bash
npm start
```

Open:

```text
http://localhost:5000
```

## API endpoints

| Method | Endpoint | Purpose |
|---|---|---|
| GET | `/` | Book Store website |
| GET | `/api/books` | Get all books |
| GET | `/api/books/:id` | Get one book |
| GET | `/api/books?search=atomic` | Search books |
| GET | `/api/books?category=Fiction` | Filter books |


## Project Diagram

The main flow is:

```text
Browser
   ↓
HTML
   ↓
CSS
   ↓
JavaScript
   ↓
fetch()
   ↓
Express API
   ↓
JavaScript array
   ↓
JSON response
   ↓
Book cards
```

Important concepts:

- `app.get()`
- `req.params`
- `req.query`
- `req.body`
- `res.json()`
- `res.status()`
- `fetch()`
- `async`
- `await`
- JSON
- DOM manipulation
- event listeners
