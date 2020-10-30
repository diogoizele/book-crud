const confirmButton = document.querySelector("#confirm-btn");
const dataBaseArray = [];
let line = null;

function handleCrudData() {
  let book = createNewBook();

  if (line == null) {
    createNewRegister(book);
    dataBaseArray.push(book);
  } else {
    updateRegister(book);
    document.querySelector("form").reset();
    line = null;
    setData();
  }
}

function createNewBook() {
  let book = new Book(
    document.querySelector("#reg-name").value,
    document.querySelector("#reg-author").value,
    document.querySelector("#reg-year").value,
    document.querySelector("#reg-category").value
  );
  console.log(book);
  console.log(book.toString());
  return book;
}

function updateCrudData() {
  line = this.parentElement.parentElement;
  console.log(line.innerHTML);

  document.querySelector("#reg-name").value = line.cells[2].innerHTML;
  document.querySelector("#reg-author").value = line.cells[3].innerHTML;
  document.querySelector("#reg-year").value = line.cells[5].innerHTML;
  document.querySelector("#reg-category").value = line.cells[4].innerHTML;
}

function updateRegister(book) {
  line.cells[2].innerHTML = book.name;
  line.cells[3].innerHTML = book.author;
  line.cells[4].innerHTML = book.category;
  line.cells[5].innerHTML = book.year;

  let index = line.rowIndex - 1;

  dataBaseArray[index].id = book.id;
  dataBaseArray[index].name = book.name;
  dataBaseArray[index].author = book.author;
  dataBaseArray[index].category = book.category;
  dataBaseArray[index].year = book.year;
}

function deleteCrudData() {
  if (confirm("Deseja mesmo excluir este registro?")) {
    lin = this.parentElement.parentElement;

    dataBaseArray.splice(lin.rowIndex - 1, 1);

    document.querySelector("table").deleteRow(lin.rowIndex);
    document.querySelector("form").reset;
    setData();
  }
}

function setData() {
  let data = JSON.stringify(dataBaseArray);
  localStorage.setItem("books", data);
}

function getData() {
  if (localStorage.hasOwnProperty("books")) {
    dataBaseArray = JSON.parse(localStorage.getItem("books"));
  }
}

function renderTable() {
  getData();
  // document.querySelector("table tr[books]").innerHTML = "";
  dataBaseArray.forEach((book) => createNewRegister(book));
}

function createNewRegister(book) {
  const table = document.querySelector("tbody");

  const tr = document.createElement("tr");
  tr.setAttribute('books', '')

  const tdOrder = document.createElement("td");
  tdOrder.innerHTML = dataBaseArray.length + 1;

  const tdID = document.createElement("td");
  tdID.innerHTML = book.id;

  const tdName = document.createElement("td");
  tdName.innerHTML = book.name;
  const tdAuthor = document.createElement("td");
  tdAuthor.innerHTML = book.author;
  const tdCategory = document.createElement("td");
  tdCategory.innerHTML = book.category;
  const tdYear = document.createElement("td");
  tdYear.innerHTML = book.year;

  const tdUpdate = document.createElement("td");
  const btnUpdate = document.createElement("button");
  btnUpdate.innerHTML = "⟳";
  tdUpdate.appendChild(btnUpdate);

  const tdDelete = document.createElement("td");
  const btnDelete = document.createElement("button");
  btnDelete.innerHTML = "╳";
  tdDelete.appendChild(btnDelete);

  btnUpdate.addEventListener("click", updateCrudData);
  btnDelete.addEventListener("click", deleteCrudData);

  tr.appendChild(tdOrder);
  tr.appendChild(tdID);
  tr.appendChild(tdName);
  tr.appendChild(tdAuthor);
  tr.appendChild(tdCategory);
  tr.appendChild(tdYear);
  tr.appendChild(tdUpdate);
  tr.appendChild(tdDelete);

  table.appendChild(tr);
}

renderTable();
confirmButton.addEventListener("click", handleCrudData);
