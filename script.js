const listInputElement = document.getElementById("list-input");
const gridInputElement = document.getElementById("grid-input");

const gridForBooksElement = document.getElementById("book-grid-container");
const listForBooksElement = document.getElementById("book-list-container");

const bookListUlElement = document.getElementById("book-list-ul");

const sortingDropdownName = document.getElementById("sortOrderName");
const soriingDropdownDate = document.getElementById("sortOrderDate");

const searchBookElement = document.getElementById("searchInput");

//Store all books globally in an array
let allBooks = [];

//Function to get the books from api
const getFetchData = async () => {
  const url =
    "https://api.freeapi.app/api/v1/public/books?page=1&limit=10&inc=kind%252Cid%252Cetag%252CvolumeInfo&query=tech";
  const options = { method: "GET", headers: { accept: "application/json" } };

  try {
    // Fetch the url with option and hold it in a response variable
    const response = await fetch(url, options);
    if (!response.ok) {
      throw new Error(`Response Status : ${response.status}`);
    }
    // Convert the response to a json object and hold it on a data variable
    const { data } = await response.json();
    // console.log(data);
    return data;
  } catch (error) {
    throw new Error(`Response Status : ${response.status}`);
  }
};

const getBookData = async () => {
  try {
    // const bookData = await getFetchData();
    const data = await getFetchData();
    // console.log(data.data[0].volumeInfo.title);
    return data;
  } catch (error) {
    throw new Error("Book Data not found", error);
  }
};

// //When user select grid
// gridInputElement.addEventListener("click", () => {
//   if (gridInputElement.checked) {
//     listInputElement.checked = false;
//     // console.log("Grid view");
//     listForBooksElement.classList.add("hide");
//     gridForBooksElement.classList.remove("hide");
//     displayBookGrid();
//   }
// });

// Function to display a books in List
const displayBookList = (books) => {
  clearBookList();
  books.map((book) => {
    const li = document.createElement("li");
    const imgLink = book.volumeInfo.imageLinks.thumbnail;
    // console.log(book.volumeInfo.imageLinks.thumbnail);
    const bookImg = document.createElement("img");
    bookImg.src = imgLink;
    const div = document.createElement("div");
    const h2 = document.createElement("h2");
    h2.textContent = book.volumeInfo.title;
    h2.classList.add("book-name-text");
    const p = document.createElement("p");
    p.textContent = ` Author : ${book.volumeInfo.authors[0]}`;
    p.classList.add("author-text");

    const p2 = document.createElement("p");
    p2.textContent = ` Publishers : ${book.volumeInfo.publisher}`;
    p2.classList.add("author-text");

    const p3 = document.createElement("p");
    p3.textContent = ` Published Date : ${book.volumeInfo.publishedDate}`;
    p3.classList.add("author-text");
    // h3.textContent =
    div.append(h2, p, p2, p3);
    li.appendChild(bookImg);
    li.appendChild(div);
    li.classList.add("li-style");
    // Implement Clicking on a book item, should open more details in a new tab (using infoLink)
    li.addEventListener("click", () => {
      const link = book.volumeInfo.infoLink;
      if (link) {
        window.open(link, "_blank");
      } else {
        alert("No details available for this book");
      }
    });

    bookListUlElement.appendChild(li);
  });
};

// Function to display a books in Grid

const displayBookGrid = (books) => {
  clearBookGrid();
  books.map((book) => {
    const div = document.createElement("div");
    const bookImg = document.createElement("img");
    bookImg.src = book.volumeInfo.imageLinks.thumbnail;
    const h4 = document.createElement("h4");
    h4.textContent = book.volumeInfo.title;
    h4.classList.add("book-name-text");
    const p = document.createElement("p");
    p.textContent = ` Author : ${book.volumeInfo.authors[0]}`;
    p.classList.add("author-text");
    const p2 = document.createElement("p");
    p2.textContent = ` Publishers : ${book.volumeInfo.publisher}`;
    p2.classList.add("author-text");

    const p3 = document.createElement("p");
    p3.textContent = ` Published Date : ${book.volumeInfo.publishedDate}`;
    p3.classList.add("author-text");
    div.append(bookImg, h4, p, p2, p3);
    div.classList.add("grid-items");

    // Implement Clicking on a book item, should open more details in a new tab (using infoLink)
    div.addEventListener("click", () => {
      const link = book.volumeInfo.infoLink;
      if (link) {
        window.open(link, "_blank");
      } else {
        alert("No details available for this book");
      }
    });

    gridForBooksElement.appendChild(div);
  });
  gridForBooksElement.classList.remove("hide");
  gridForBooksElement.classList.add("books-grid");
};

//Sort book by its title
const sortBooksByTitle = (books, order) => {
  return books.sort((a, b) => {
    const titleA = a.volumeInfo.title.toUpperCase();
    const titleB = b.volumeInfo.title.toUpperCase();
    return order === "asc"
      ? titleA.localeCompare(titleB)
      : titleB.localeCompare(titleA);
  });
};

//Sort book by its date of release
const sortBooksByDate = (books, order) => {
  return books.sort((a, b) => {
    const publishedDateA = new Date(a.volumeInfo.publishedDate);
    const publishedDateB = new Date(b.volumeInfo.publishedDate);
    // console.log(publishedDateA - publishedDateB);
    return order === "asc"
      ? publishedDateA - publishedDateB
      : publishedDateB - publishedDateA;
  });
};

sortingDropdownName.addEventListener("change", async () => {
  const selectedValue = sortingDropdownName.value;

  const sortedBooks = sortBooksByTitle(allBooks, selectedValue);
  console.log(sortedBooks);

  if (listInputElement.checked) {
    displayBookList(sortedBooks);
  } else {
    displayBookGrid(sortedBooks);
  }
});

soriingDropdownDate.addEventListener("change", async () => {
  const selectedValue = soriingDropdownDate.value;

  const sortedBooks = sortBooksByDate(allBooks, selectedValue);
  console.log(sortedBooks);

  if (listInputElement.checked) {
    displayBookList(sortedBooks);
  } else {
    displayBookGrid(sortedBooks);
  }
});

//When user select list
listInputElement.addEventListener("click", () => {
  if (listInputElement.checked) {
    gridInputElement.checked = false;
    // console.log("List view");
    listForBooksElement.classList.remove("hide");
    gridForBooksElement.classList.add("hide");

    // console.log(data);
    displayBookList(allBooks);
  }
});

gridInputElement.addEventListener("click", () => {
  if (gridInputElement.checked) {
    listInputElement.checked = false;
    // console.log("Grid view");
    listForBooksElement.classList.add("hide");
    gridForBooksElement.classList.remove("hide");

    // console.log(data);

    displayBookList(allBooks);
  }
});

const clearBookList = () => {
  bookListUlElement.innerHTML = "";
};

// Clear grid before loading new books
const clearBookGrid = () => {
  gridForBooksElement.innerHTML = "";
};

// Function to render the page at reload
// with list view and accending order
const firstRender = async () => {
  listInputElement.checked = true;
  gridInputElement.checked = false;
  listForBooksElement.classList.remove("hide");
  gridForBooksElement.classList.add("hide");

  const { data } = await getBookData();
  allBooks = sortBooksByTitle(data, "asc");
  if (allBooks.length < 0) {
    document.getElementById("no-book-found").classList.remove("hide");
  }
  displayBookList(allBooks);
};

// Implement search functionality
searchBookElement.addEventListener("input", () => {
  const searchBook = searchBookElement.value.toLowerCase();
  console.log(searchBook);

  //Use filter to extract the seachBook from the allBooks array
  const filteredBooks = allBooks.filter((book) =>
    book.volumeInfo.title.toLowerCase().includes(searchBook)
  );
  if (listInputElement.checked) {
    displayBookList(filteredBooks);
  } else {
    displayBookGrid(filteredBooks);
  }
});

// Call the firstRender on page load
firstRender();
