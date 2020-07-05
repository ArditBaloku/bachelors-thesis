import { Book } from "./Book.ts"

export class Library {
  id: number
  numberOfBooks: number
  signUpTime: number
  dailyCapacity: number
  pontential: number
  books: Book[]

  constructor(id: number, numberOfBooks: number, signUpTime: number, dailyCapacity: number) {
    this.id = id
    this.numberOfBooks = numberOfBooks
    this.signUpTime = signUpTime
    this.dailyCapacity = dailyCapacity
    this.pontential = 0
    this.books = []
  }

  addBook(book: Book) {
    this.books.push(book)
  }

  calculateBenefit() {
    this.pontential = (this.books.reduce((acc, book) => acc + book.score, 0) / this.books.length) / this.signUpTime
  }
}