const listInputElement = document.getElementById("list-input");
const gridInputElement = document.getElementById("grid-input");

const gridForBooksElement = document.getElementById("book-grid-container");
const listForBooksElement = document.getElementById("book-list-container");

const bookListUlElement = document.getElementById("book-list-ul");

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

//When user select list
listInputElement.addEventListener("click", async () => {
  if (listInputElement.checked) {
    gridInputElement.checked = false;
    // console.log("List view");
    listForBooksElement.classList.remove("hide");
    gridForBooksElement.classList.add("hide");
    const { data } = await getBookData();
    console.log(data);
    if (data.length < 0) {
      document.getElementById("no-book-found").classList.remove("hide");
    }
    displayBookList();
  }
});

//When user select grid
gridInputElement.addEventListener("click", () => {
  if (gridInputElement.checked) {
    listInputElement.checked = false;
    // console.log("Grid view");
    listForBooksElement.classList.add("hide");
    gridForBooksElement.classList.remove("hide");
    displayBookGrid();
  }
});

// Function to display a books in List
const displayBookList = async () => {
  const { data } = await getBookData();
  // console.log(data);
  data.map((book) => {
    const li = document.createElement("li");
    const imgLink = book.volumeInfo.imageLinks.thumbnail;
    // console.log(book.volumeInfo.imageLinks.thumbnail);
    const bookImg = document.createElement("img");
    bookImg.src = imgLink;
    const div = document.createElement("div");
    const h4 = document.createElement("h4");
    h4.textContent = book.volumeInfo.title;
    h4.classList.add("book-name-text");
    const p = document.createElement("p");
    p.textContent = book.volumeInfo.authors[0];
    div.append(h4, p);
    li.appendChild(bookImg);
    li.appendChild(div);
    li.classList.add("li-style");
    bookListUlElement.appendChild(li);
  });
};

// Function to display a books in Grid

const displayBookGrid = async () => {
  const { data } = await getBookData();
  console.log(data);

  data.map((book) => {
    const div = document.createElement("div");
    const bookImg = document.createElement("img");
    bookImg.src = book.volumeInfo.imageLinks.thumbnail;
    const h4 = document.createElement("h4");
    h4.textContent = book.volumeInfo.title;
    h4.classList.add("book-name-text");
    const p = document.createElement("p");
    p.textContent = book.volumeInfo.authors[0];
    div.append(bookImg, h4, p);
    div.classList.add("grid-items");
    gridForBooksElement.appendChild(div);
    gridForBooksElement.classList.remove("hide");
    gridForBooksElement.classList.add("books-grid");
  });
};
