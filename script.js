const confirmButton = document.querySelector("#confirm-btn");
const searchButton = document.querySelector("#search-btn");
const resetButton = document.querySelector("#reset-btn");

let dataBaseArray = [];
let line = null;
let localData = JSON.parse(localStorage.getItem("books"));

function searchBooks() {
  let searchInput = document.querySelector("#search-input").value;

  let name = document.querySelector("#search-name").checked;
  let author = document.querySelector("#search-author").checked;
  let year = document.querySelector("#search-year").checked;
  let id = document.querySelector("#search-id").checked;
  let category = document.querySelector("#search-category").value;

  if (!searchInput && !category) {
    alert("Você não selecionou informação nenhuma para pesquisar");
    return;
  }

  document.querySelector("tbody").innerHTML = "";

  if (category && !name && !author && !year && !id) {
    localData.forEach((book) => {
      if (book.category == category) {
        createNewRegister(book);
      }
    });
  }
  if (name) {
    localData.forEach((book) => {
      if (book.name == searchInput) {
        createNewRegister(book);
        console.log(book);
      }
    });
  } else if (author) {
    localData.forEach((book) => {
      if (book.author == searchInput) {
        createNewRegister(book);
        console.log(book);
      }
    });
  } else if (year) {
    localData.forEach((book) => {
      if (book.year == searchInput) {
        createNewRegister(book);
        console.log(book);
      }
    });
  } else if (id) {
    localData.forEach((book) => {
      if (book.id == searchInput) {
        createNewRegister(book);
        console.log(book);
      }
    });
  }
  document.querySelector("#search-input").value = "";
  document.querySelector("#search-name").checked = false;
  document.querySelector("#search-author").checked = false;
  document.querySelector("#search-year").checked = false;
  document.querySelector("#search-id").checked = false;
  document.querySelector("#search-category").value = "";
}

// verifica se já existe um ID pra aplicação
if (localStorage.getItem("id")) {
  var id = localStorage.getItem("id");
} else {
  var id = 1;
}
localStorage.setItem("id", id);

function handleCrudData() {
  let book = createNewBook();

  if (line == null) {
    createNewRegister(book);
    dataBaseArray.push(book);
    localStorage.setItem("id", ++id);
  } else {
    updateRegister(book);
  }
  document.querySelector("form").reset();
  line = null;
  setData();
  location.reload();
}

function createNewBook() {
  let book = new Book(
    localStorage.getItem("id"),
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

  document.querySelector("#reg-name").value = line.cells[1].innerHTML;
  document.querySelector("#reg-author").value = line.cells[2].innerHTML;
  document.querySelector("#reg-year").value = line.cells[4].innerHTML;
  document.querySelector("#reg-category").value = line.cells[3].innerHTML;
}

function updateRegister(book) {
  line.cells[1].innerHTML = book.name;
  line.cells[2].innerHTML = book.author;
  line.cells[3].innerHTML = book.category;
  line.cells[4].innerHTML = book.year;

  let index = line.rowIndex - 1;

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
  var data = JSON.stringify(dataBaseArray);
  localStorage.setItem("books", data);
}

function getData() {
  if (localStorage.hasOwnProperty("books")) {
    dataBaseArray = JSON.parse(localStorage.getItem("books"));
  }
}

function renderTable() {
  getData();
  if (document.querySelector("tbody")) {
    document.querySelector("tbody").innerHTML = "";
  }
  dataBaseArray.forEach(function (book) {
    createNewRegister(book);
  });
}

function renderDefaultTable(arr) {
  getData();
  if (document.querySelector("tbody")) {
    document.querySelector("tbody").innerHTML = "";
  }
  arr.forEach(function (book) {
    createNewRegister(book);
  });
}

function createNewRegister(book) {
  const table = document.querySelector("tbody");

  const tr = document.createElement("tr");
  tr.setAttribute("books", "");

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

  // tr.appendChild(tdOrder);
  tr.appendChild(tdID);
  tr.appendChild(tdName);
  tr.appendChild(tdAuthor);
  tr.appendChild(tdCategory);
  tr.appendChild(tdYear);
  tr.appendChild(tdUpdate);
  tr.appendChild(tdDelete);

  table.appendChild(tr);
}

renderTable(dataBaseArray);
confirmButton.onclick = () => {
  if (
    !document.querySelector("#reg-name").value ||
    !document.querySelector("#reg-author").value ||
    !document.querySelector("#reg-category").value
  ) {
    alert('Informe os campos necessários para preencher os livros!')
  } else {
    handleCrudData();
  }
};
searchButton.addEventListener("click", searchBooks);

document.querySelector("#reset-btn").onclick = () =>
  renderDefaultTable(dataBaseArray);
