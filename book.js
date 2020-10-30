let counter = (function () {
  let count = 0;
  return function () {
    return count++;
  };
})();

class Book {
  constructor(name, author, year, category) {
    this.id = counter()
    this.name = name;
    this.author = author;
    this.year = year;
    this.category = category;
  }

  toString() {
    return `${this.name} ${this.author} ${this.year} ${this.category}`;
  }
}

