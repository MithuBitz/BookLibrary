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


getBookData();
// console.log(bookData);