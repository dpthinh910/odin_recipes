class Book {
  constructor(
    title = "Unknown",
    author = 'Unknown',
    pages = 0,
    isRead = false
  ) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.isRead = isRead;
  }
}

class Library {
  constructor() {
    this.books = [];
  }

  addBook(newBook) {
    if(!this.isInLibrary(newBook)) {
      this.books.push(newBook);
    }
  }

  removeBook(title) {
    return this.books = this.books.filter(book => book.title !== title)
  }

  getBook(title) {
    return this.books.find(book => book.title === title);
  }

  isInLibrary(newBook) {
    const result = this.books.some(book => book.title === newBook.title);
    return result;
  }
}

// Initialize library instance
const library = new Library();

// UI elements

const addBookBtn = document.getElementById('addBookBtn');
const addBookModal = document.getElementById('addBookModal');
const addBookForm = document.getElementById('addBookForm');
const errorMsg = document.getElementById('errorMsg');
const overlay = document.getElementById('overlay');
const booksGrid = document.getElementById('booksGrid');

const openAddBookModal = () => {
  addBookForm.reset();
  addBookModal.classList.add('active');
  overlay.classList.add('active');
}

const closeAddBookModal = () => {
  addBookModal.classList.remove('active');
  overlay.classList.remove('active');
  errorMsg.classList.remove('active');
  errorMsg.textContent = '';
}

const closeAllModal = () => {
  closeAddBookModal();
}

const handleKeyBoardInput = (e) => {
  if (e.key === "Escape") closeAllModal();
}

const updateBooksGrid = () => {
  resetBooksGrid();
  for (let book of library.books) {
    createBookCard(book);
  } 
}

const resetBooksGrid = () => {
  booksGrid.innerHTML = '';
}

const createBookCard = (book) => {
  const bookCard = document.createElement('div');
  const title = document.createElement('h3');
  const author = document.createElement('h3');
  const pages = document.createElement('h3');
  const readBtn = document.createElement('button');
  const removeBtn = document.createElement('button');

  bookCard.classList.add('book-card');
  readBtn.classList.add('btn');
  removeBtn.classList.add('btn', 'btn-light-red');
  readBtn.onclick = toggleRead;
  removeBtn.onclick = removeBook;

  title.textContent = `${book.title}`;
  author.textContent = `${book.author}`;
  pages.textContent = `${book.pages} pages`;
  removeBtn.textContent = "Remove";

  if (book.isRead) {
    readBtn.textContent = 'Read';
    readBtn.classList.add('btn-read')
  } else {
    readBtn.textContent = 'Not read';
    readBtn.classList.add('btn-notRead')
  }

  bookCard.appendChild(title);
  bookCard.appendChild(author);
  bookCard.appendChild(pages);
  bookCard.appendChild(readBtn);
  bookCard.appendChild(removeBtn);
  booksGrid.appendChild(bookCard);
}

const getBookFromInput = () => {
  const title = document.getElementById('title').value;
  const author = document.getElementById('author').value;
  const pages = document.getElementById('pages').value;
  const isRead = document.getElementById('isRead').checked;
  return new Book(title, author, pages, isRead);
}

const addBook = (e) => {
  e.preventDefault();
  const newBook = getBookFromInput()

  if (library.isInLibrary(newBook)) {
    errorMsg.textContent = 'This book already exists in your library';
    errorMsg.classList.add('active');
    return;
  }
  library.addBook(newBook);
  saveLocal()
  updateBooksGrid()
  closeAddBookModal();
}

const removeBook = (e) => {
  const title = e.target.parentNode.firstChild.innerHTML.replaceAll('"', '')
  
  library.removeBook(title)
  saveLocal()
  updateBooksGrid();
}

const toggleRead = (e) => {
  const title = e.target.parentNode.firstChild.innerHTML.replaceAll('"', '');
  const book = library.getBook(title);

  book.isRead = !book.isRead;
  saveLocal();
  updateBooksGrid();
}

addBookBtn.onclick = openAddBookModal;
overlay.onclick = closeAllModal;
addBookForm.onsubmit = addBook;
window.onkeydown = handleKeyBoardInput;

// Local storage
const saveLocal = () => {
  localStorage.setItem('library', JSON.stringify(library.books))
}

const restoreLocal = () => {
  const books = JSON.parse(localStorage.getItem('library'))
  if (books) {
    library.books = books.map(book => JSONToBook(book));
  } else {
    library.books = []
  }
}

const JSONToBook = (book) => {
  return new Book(book.title, book.author, book.pages, book.isRead);
}