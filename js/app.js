// Book Constructor
function Book(title, author, genre) {
    this.title = title;
    this.author = author;
    this.genre = genre;
}


//UI Constructor
function UI() {}
//Bind UI constructor to addBookToList Method
UI.prototype.addBookToList = function(book) {
    const list = document.getElementById('book-list');

    //Create tr element
    const rowEl = document.createElement('tr');

    //Insert columns
    rowEl.innerHTML =
    `   <td>${book.title}</td>
        <td>${book.author}</td>
        <td>${book.genre}</td> 
        <td><a href="#" class="delete">X</a></td>`

    list.appendChild(rowEl);

}

//Bind UI constructor to clearListMethod
UI.prototype.clearList = function() {
    document.getElementById('title').value = '';
    document.getElementById('author').value = '';
    document.getElementById('genre').value = '';

}

//Event Listeners
document.getElementById('book-form').addEventListener('submit', function(e) {
    //Take in form values
    const title = document.getElementById('title').value,
        author = document.getElementById('author').value,
        genre = document.getElementById('genre').value

    //Instantiate each new book obj
    const book = new Book(title, author, genre);

    //Instantiate UI obj
    const ui = new UI();

    //Add book to list
    ui.addBookToList(book);

    //Clear List
    ui.clearList();

    e.preventDefault();
})