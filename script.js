const listInputElement = document.getElementById("list-input");
const gridInputElement = document.getElementById("grid-input");

const gridForBooksElement = document.getElementById("book-grid-container");
const listForBooksElement = document.getElementById("book-list-container");

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
    const data = await response.json();
    // console.log(data);
    return data;
  } catch (error) {
    throw new Error(`Response Status : ${response.status}`);
  }
};

const getBookData = async () => {
  try {
    // const bookData = await getFetchData();
    const { data } = await getFetchData();
    console.log(data.data[0].volumeInfo.title);
    return data;
  } catch (error) {
    throw new Error("Book Data not found", error);
  }
};

//When user select list
listInputElement.addEventListener("click", () => {
  if (listInputElement.checked) {
    gridInputElement.checked = false;
    console.log("List view");
    listForBooksElement.classList.remove("hide");
    gridForBooksElement.classList.add("hide");
  }
});

//When user select grid
gridInputElement.addEventListener("click", () => {
  if (gridInputElement.checked) {
    listInputElement.checked = false;
    console.log("Grid view");
    listForBooksElement.classList.add("hide");
    gridForBooksElement.classList.remove("hide");
  }
});

// Function to display a books in List
const displayBookList = () => {};
