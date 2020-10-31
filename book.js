class Book {
  constructor(id, name, author, year, category) {
    this.id = id;
    this.name = name;
    this.author = author;
    this.year = year;
    this.category = category;
  }

  toString() {
    return `${this.name} ${this.author} ${this.year} ${this.category}`;
  }
}
