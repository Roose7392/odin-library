import './style.css'

const libraryNode = document.querySelector('.library');
const newBookButton = document.querySelector('header button');
const modal = document.querySelector('dialog');
const closeModalButton = document.querySelector('dialog button');
const form = document.querySelector('form');
const titleInput = document.querySelector('input[id="title"]');
const authorInput = document.querySelector('input[id="author"]');
const pagesInput = document.querySelector('input[id="pages"]');
const readInput = document.querySelector('input[id="read"]');

const COLORS = ['orangered', 'green', 'gray', 'rosybrown', 'hotpink', 'goldenrod', 'tan', 'thistle']
const myLibrary = [];

function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = Boolean(read);
}

function addBookToLibrary(book) {
  myLibrary.push(book);
  renderBooks()
}

function renderModal() {
  console.log('hi!')
  modal.addEventListener('click',removeModal)
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
    const bookAuthor = document.createElement('div')
    bookAuthor.innerText = book.author
    bookAuthor.classList.add('book-author')
    bookDiv.appendChild(bookName)
    bookDiv.appendChild(bookAuthor)
    bookShelf.appendChild(bookDiv)
    bookDiv.style.backgroundColor = getRandomColor();
  })
  libraryNode.appendChild(bookShelf)
}

function getRandomColor() {
  return COLORS[Math.floor(Math.random() * COLORS.length)]
}

function init() {
  newBookButton.addEventListener('click', renderModal)
  form.addEventListener('click', (e) => {
    e.preventDefault()
    const title = titleInput.value.trim();
    const author = authorInput.value.trim();
    const pages = pagesInput.value.trim();
    const read = readInput.checked
    const newBook = new Book(title, author, pages, read)
    addBookToLibrary(newBook)
    removeModal()
  })
  renderBooks()
}

init()