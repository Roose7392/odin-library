import './style.css'

const libraryNode = document.querySelector('.library');
const newBookButton = document.querySelector('header button');
const modal = document.querySelector('dialog');
const closeModalButton = document.querySelector('#close-button');
const form = document.querySelector('form');
const titleInput = document.querySelector('input[id="title"]');
const authorInput = document.querySelector('input[id="author"]');
const pagesInput = document.querySelector('input[id="pages"]');
const readInput = document.querySelector('input[id="read"]');

const COLORS = ['orangered', 'green', 'gray', 'rosybrown', 'hotpink', 'goldenrod', 'tan', 'thistle']
let myLibrary = [];

function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = Boolean(read);
  this.id = crypto.randomUUID()
}

Book.prototype.toggleId = function() {
  this.read = !this.read
}

function addBookToLibrary(book) {
  myLibrary = myLibrary.concat(book)
  renderBooks()
}

function deleteBook(book) {
  myLibrary = myLibrary.filter(b => b.id !== book.id)
  renderBooks()
}

function toggleBook(book) {
  book.toggleId()
}

function renderModal() {
  modal.addEventListener('click', removeModal)
  modal.showModal()
  modal.querySelector('form').addEventListener('click', e => e.stopPropagation())
}

function removeModal() {
  modal.close()
}

function renderBooks() {
  while(libraryNode.firstChild) {
    libraryNode.removeChild(libraryNode.firstChild)
  }
  if(myLibrary.length === 0) {
    const noBooksPara = document.createElement('p')
    noBooksPara.classList.add('library-empty')
    noBooksPara.innerText = 'You don\'t have any books in your library yet. '
    const addPrompt = document.createElement('button')
    addPrompt.addEventListener('click', renderModal)
    addPrompt.innerText = 'Add Book'
    noBooksPara.appendChild(addPrompt)
    libraryNode.appendChild(noBooksPara)
    libraryNode.appendChild(noBooksPara)
    return
  }
  const bookShelf = document.createElement('div');
  bookShelf.classList.add('bookshelf')
  myLibrary.forEach(book => {
    const bookDiv = document.createElement('div')
    bookDiv.classList.add('book')
    const bookName = document.createElement('div')
    bookName.innerText = book.title
    bookName.classList.add('book-name')
    const readButton = document.createElement('button')
    const deleteButton = document.createElement('button')
    const buttonDiv = document.createElement('div')
    buttonDiv.classList.add('hidden')
    readButton.classList.add('read-button')
    deleteButton.innerText = 'Delete Book'
    readButton.addEventListener('click', () => {
      toggleBook(book)
      checkReadStatus(book, bookDiv)
    })
    deleteButton.addEventListener('click', () => deleteBook(book))
    const bookAuthor = document.createElement('div')
    bookAuthor.innerText = book.author
    bookAuthor.classList.add('book-author')
    bookDiv.appendChild(bookName)
    buttonDiv.appendChild(readButton)
    buttonDiv.appendChild(deleteButton) 
    bookDiv.appendChild(buttonDiv)
    bookDiv.appendChild(bookAuthor)
    bookShelf.appendChild(bookDiv)
    bookDiv.style.backgroundColor = getRandomColor();
    checkReadStatus(book, bookDiv)
  })
  libraryNode.appendChild(bookShelf)
}

function checkReadStatus(book, bookDiv) {
  const button = bookDiv.querySelector('.read-button')
  button.innerText = `Mark as ${book.read ? 'unread' : 'read'}`
  bookDiv.style.opacity = book.read ? 0.5 : 1
}

function getRandomColor() {
  return COLORS[Math.floor(Math.random() * COLORS.length)]
}

function init() {
  newBookButton.addEventListener('click', renderModal)
  closeModalButton.addEventListener('click', removeModal)
  form.addEventListener('submit', (e) => {
    e.preventDefault()
    const title = titleInput.value.trim();
    const author = authorInput.value.trim();
    const pages = pagesInput.value.trim();
    const read = readInput.checked
    const newBook = new Book(title, author, pages, read)
    addBookToLibrary(newBook)
    titleInput.value = ''
    authorInput.value = ''
    pagesInput.value = ''
    readInput.checked = false
    removeModal()
  })
  renderBooks()
}

init()