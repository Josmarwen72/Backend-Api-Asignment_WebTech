const express = require('express');
const app = express();
const PORT = 5000;

let books = [
  { id: '1', title: 'Node.js Essentials', author: 'John Doe', year: 2021 },
  { id: '2', title: 'The Unseen City', author: 'Maya Ali', year: 2023 },
];

app.use(express.json());
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

function getNextId() {
  if (books.length === 0) return '1';
  return (Math.max(...books.map(b => parseInt(b.id))) + 1).toString();
}

function validateBookData(data) {
  const { title, author, year } = data;
  if (typeof title !== 'string' || title.trim() === '') return { error: 'Title must be a non-empty string' };
  if (typeof author !== 'string' || author.trim() === '') return { error: 'Author must be a non-empty string' };
  const yearNum = Number(year);
  if (isNaN(yearNum)) return { error: 'Year must be a valid number' };
  return { title: title.trim(), author: author.trim(), year: yearNum };
}

app.get('/books', (req, res) => res.json(books));

app.get('/books/:id', (req, res) => {
  const book = books.find(b => b.id === req.params.id);
  book ? res.json(book) : res.status(404).json({ message: 'Book not found' });
});

app.post('/books', (req, res) => {
  const validation = validateBookData(req.body);
  if (validation.error) return res.status(400).json({ message: validation.error });
  const newBook = { id: getNextId(), ...validation };
  books.push(newBook);
  res.status(201).json(newBook);
});

app.put('/books/:id', (req, res) => {
  const bookIndex = books.findIndex(b => b.id === req.params.id);
  if (bookIndex === -1) return res.status(404).json({ message: 'Book not found' });
  const validation = validateBookData(req.body);
  if (validation.error) return res.status(400).json({ message: validation.error });
  books[bookIndex] = { id: req.params.id, ...validation };
  res.json(books[bookIndex]);
});

app.delete('/books/:id', (req, res) => {
  const bookIndex = books.findIndex(b => b.id === req.params.id);
  if (bookIndex === -1) return res.status(404).json({ message: 'Book not found' });
  books.splice(bookIndex, 1);
  res.status(204).send();
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
