# Library API

A simple RESTful API for managing a library of books using Express.js and Node.js.

## Installation

1. Clone the repository.
2. Run `npm install` to install dependencies.
3. Run `npm run dev` for development or `npm start` to run the server.

## Endpoints

- GET /books - Returns a list of all books.
- GET /books/:id - Returns details of a specific book.
- POST /books - Adds a new book.
- PUT /books/:id - Updates details of a specific book.
- DELETE /books/:id - Deletes a book.

## Example Request

```json
{
  "id": "1",
  "title": "Node.js Essentials",
  "author": "John Doe",
  "year": 2021
}
