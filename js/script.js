////=================== NEXT CHALLENGE TO REFACTOR CODE USING ES6 ==========================///////
class Book {
    constructor(title, author, genre) {
        this.title = title;
        this.author = author;
        this.genre = genre;

    }
}

class UI {
    addBookToList(book) {
        const list = document.getElementById('book-list');


        //Create tr element
        const rowEl = document.createElement('tr');

        //Insert columns
        rowEl.innerHTML = `   
        <td>${book.title}</td>
        <td>${book.author}</td>
        <td>${book.genre}</td> 
        <td><a href="#" class="delete">X</a></td>
        `;

        list.appendChild(rowEl);

    }

    showValidation(message, className) {
        //Create Div element for error message
        const divEl = document.createElement('div');
        //Add Class
        divEl.className = `alert ${className}`;
        //Add Message text
        divEl.appendChild(document.createTextNode(message));
        //Get parent Element to place between container & form
        const container = document.querySelector('.container');
        const form = document.querySelector('#book-form');

        container.insertBefore(divEl, form);

        //Set timeout to disappear
        setTimeout(function() {
            document.querySelector('.alert').remove();
        }, 3000)
    }

    deleteBook(target) {
        if(target.className === 'delete') {
            target.parentElement.parentElement.remove();
        }
    }

    clearList() {
        document.getElementById('title').value = '';
        document.getElementById('author').value = '';
        document.getElementById('genre').value = '';
    }
}

//Local storage class
class Storage {
    static getBooks() {
        let books;
        if(localStorage.getItem('books') === null) {
            books = [];
        } else {
            books = JSON.parse(localStorage.getItem('books'));
        }
        return books;
    }
    static displayBooks() {
        const books = Storage.getBooks();
        books.forEach(function(book) {
            const ui = new UI();

            //Add book to UI
            ui.addBookToList(book);
        });
    }
    static addBook(book) {
        const books = Storage.getBooks();
        books.push(book);
        localStorage.setItem('books', JSON.stringify(books));
    }
    static removeBook(genre) {
        const books = Storage.getBooks();

        books.forEach(function(book,index) {
            if(book.genre === genre) {
             books.splice(index, 1)
            }
        });
        localStorage.setItem('books', JSON.stringify(books));
    }
}
//DOM onLoad Event
window.addEventListener('DOMContentLoaded', Storage.displayBooks);


//Add Book Event Listener
document.getElementById('book-form').addEventListener('submit', function(e) {
    //Take in form values
    const title = document.getElementById('title').value,
        author = document.getElementById('author').value,
        genre = document.getElementById('genre').value

    //Instantiate each new book obj
    const book = new Book(title, author, genre);

    //Instantiate UI obj
    const ui = new UI();

    //validation
    if(title === '' || author === '' || genre === '') {
        //Error Message
        ui.showValidation('Please fill out correct input', 'error');
    }else {
        //Add book to list
        ui.addBookToList(book);
        //Add to LS
        Storage.addBook(book);

        //Success Message
        ui.showValidation('Book Added Successfully!', 'success')
        //Clear List
        ui.clearList();
    }
    e.preventDefault();
});

//Delete Event Listener
document.getElementById('book-list').addEventListener('click', function(e) {
    //Instantiate UI obj
    const ui = new UI();
    ui.deleteBook(e.target);

    //Remove from LS
    Storage.removeBook(e.target.parentElement.previousElementSibling.textContent);

    //Reuse validation method
    ui.showValidation('Book Removed!', 'success');
    e.preventDefault();
})


