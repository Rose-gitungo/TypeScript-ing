interface Book {
    id: number;
    name: string;
    author: string;
    price: number;
}

// //creating an array of books from interface
// // Initialize the books array with some default books
let books: Book[] = [];

//prevents submitting new record instead of updation
let isUpdating = false;

//read all books
function displayBooks() {
    const tableBody = document.querySelector('tbody');
    if (!tableBody) return;
    tableBody.innerHTML = '';

    //retireving data from local storage
    const storedBooks = localStorage.getItem('books');
    if (storedBooks !== null) {
        let books: Book[] = JSON.parse(storedBooks);

        books.forEach(book => {
            const row = document.createElement('tr');
            row.innerHTML = `
            <td>${book.id}</td>
            <td>${book.name}</td>
            <td>${book.author}</td>
            <td>${book.price}</td>
            <td>
                <button class="btn btn-warning" onclick="updateBook(${book.id})">Edit</button>
                <button class="btn btn-danger" onclick="deleteBook(${book.id})">Delete</button>
            </td>
        `;
            tableBody.appendChild(row);
        });
    }

}
displayBooks();

//update Books
function updateBook(id: number) {
    const newIdInput = document.getElementById('newId') as HTMLInputElement;
    const newNameInput = document.getElementById('newName') as HTMLInputElement;
    const newAuthorInput = document.getElementById('newAuthor') as HTMLInputElement;
    const newPriceInput = document.getElementById('newPrice') as HTMLInputElement;

    const storedBooks = localStorage.getItem('books');
    if (storedBooks !== null) {
        let books: Book[] = JSON.parse(storedBooks);

        const bookIndex = books.map(book => book.id === id).indexOf(true);
        if (bookIndex !== -1) {
            //populate tect fileds with existing data
            newIdInput.value = books[bookIndex].id.toString();
            newNameInput.value = books[bookIndex].name;
            newAuthorInput.value = books[bookIndex].author;
            newPriceInput.value = books[bookIndex].price.toString();

            //update the book details based on user edits!
            books[bookIndex].id = parseInt(newIdInput.value);
            books[bookIndex].name = newNameInput.value;
            books[bookIndex].author = newAuthorInput.value;
            books[bookIndex].price = parseFloat(newPriceInput.value);
            // Update the localStorage with the modified books array
            localStorage.setItem('books', JSON.stringify(books));
            displayBooks();
        }
    }
}

//delete Books
function deleteBook(id: number) {
    //retreive info from local storage!
    const storedBooks = localStorage.getItem('books');
    if (storedBooks !== null) {
        let books: Book[] = JSON.parse(storedBooks);
        books = books.filter(book => book.id !== id);

        // Update the localStorage with the modified books array
        localStorage.setItem('books', JSON.stringify(books));
        displayBooks();
    }

}

function validateForm(event: Event) {
    event.preventDefault();
    // Retrieve the books array from localStorage
    const storedBooks = localStorage.getItem('books');

    const bookIdInput = document.querySelector('input[name="Id"]') as HTMLInputElement;
    const bookNameInput = document.querySelector('input[name="name"]') as HTMLInputElement;
    const bookAuthorInput = document.querySelector('input[name="author"]') as HTMLInputElement;
    const bookPriceInput = document.querySelector('input[name="price"]') as HTMLInputElement;

    //checking for nulls
    if (!bookIdInput.value || !bookNameInput.value || !bookAuthorInput.value || !bookPriceInput.value) {
        alert('Please fill in all fields.');
        return;
    } else if (storedBooks !== null) {
        // Parse the stored books into a Book[] array
        const booksFS: Book[] = JSON.parse(storedBooks);
        // Check if the entered book ID already exists in the array
        if (booksFS.some(book => book.id === parseInt(bookIdInput.value))) {
            // Display an alert indicating that the book ID already exists
            updateBook(parseInt(bookIdInput.value));
            alert('Updation complete!');
            // Return early to prevent further processing
            return;
        }
    }
    //the new book data
    const newBooks: Book = {
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

