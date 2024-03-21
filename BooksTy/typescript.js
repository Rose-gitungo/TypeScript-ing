// //creating an array of books from interface
// // Initialize the books array with some default books
var books = [];
//prevents submitting new record instead of updation
var isUpdating = false;
//read all books
function displayBooks() {
    var tableBody = document.querySelector('tbody');
    if (!tableBody)
        return;
    tableBody.innerHTML = '';
    //retireving data from local storage
    var storedBooks = localStorage.getItem('books');
    if (storedBooks !== null) {
        var books_1 = JSON.parse(storedBooks);
        books_1.forEach(function (book) {
            var row = document.createElement('tr');
            row.innerHTML = "\n            <td>".concat(book.id, "</td>\n            <td>").concat(book.name, "</td>\n            <td>").concat(book.author, "</td>\n            <td>").concat(book.price, "</td>\n            <td>\n                <button class=\"btn btn-warning\" onclick=\"updateBook(").concat(book.id, ")\">Edit</button>\n                <button class=\"btn btn-danger\" onclick=\"deleteBook(").concat(book.id, ")\">Delete</button>\n            </td>\n        ");
            tableBody.appendChild(row);
        });
    }
}
displayBooks();
//update Books
function updateBook(id) {
    var newIdInput = document.getElementById('newId');
    var newNameInput = document.getElementById('newName');
    var newAuthorInput = document.getElementById('newAuthor');
    var newPriceInput = document.getElementById('newPrice');
    var storedBooks = localStorage.getItem('books');
    if (storedBooks !== null) {
        var books_2 = JSON.parse(storedBooks);
        var bookIndex = books_2.map(function (book) { return book.id === id; }).indexOf(true);
        if (bookIndex !== -1) {
            //populate tect fileds with existing data
            newIdInput.value = books_2[bookIndex].id.toString();
            newNameInput.value = books_2[bookIndex].name;
            newAuthorInput.value = books_2[bookIndex].author;
            newPriceInput.value = books_2[bookIndex].price.toString();
            //update the book details based on user edits!
            books_2[bookIndex].id = parseInt(newIdInput.value);
            books_2[bookIndex].name = newNameInput.value;
            books_2[bookIndex].author = newAuthorInput.value;
            books_2[bookIndex].price = parseFloat(newPriceInput.value);
            // Update the localStorage with the modified books array
            localStorage.setItem('books', JSON.stringify(books_2));
            displayBooks();
        }
    }
}
//delete Books
function deleteBook(id) {
    //retreive info from local storage!
    var storedBooks = localStorage.getItem('books');
    if (storedBooks !== null) {
        var books_3 = JSON.parse(storedBooks);
        books_3 = books_3.filter(function (book) { return book.id !== id; });
        // Update the localStorage with the modified books array
        localStorage.setItem('books', JSON.stringify(books_3));
        displayBooks();
    }
}
function validateForm(event) {
    event.preventDefault();
    // Retrieve the books array from localStorage
    var storedBooks = localStorage.getItem('books');
    var bookIdInput = document.querySelector('input[name="Id"]');
    var bookNameInput = document.querySelector('input[name="name"]');
    var bookAuthorInput = document.querySelector('input[name="author"]');
    var bookPriceInput = document.querySelector('input[name="price"]');
    //checking for nulls
    if (!bookIdInput.value || !bookNameInput.value || !bookAuthorInput.value || !bookPriceInput.value) {
        alert('Please fill in all fields.');
        return;
    }
    else if (storedBooks !== null) {
        // Parse the stored books into a Book[] array
        var booksFS = JSON.parse(storedBooks);
        // Check if the entered book ID already exists in the array
        if (booksFS.some(function (book) { return book.id === parseInt(bookIdInput.value); })) {
            // Display an alert indicating that the book ID already exists
            updateBook(parseInt(bookIdInput.value));
            alert('Updation complete!');
            // Return early to prevent further processing
            return;
        }
    }
    //the new book data
    var newBooks = {
        id: parseInt(bookIdInput.value),
        name: bookNameInput.value,
        author: bookAuthorInput.value,
        price: parseFloat(bookPriceInput.value)
    };
    books.push(newBooks);
    //storing in local Storage
    localStorage.setItem('books', JSON.stringify(books));
    displayBooks();
}
