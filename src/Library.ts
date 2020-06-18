import { Book } from "./Book.ts"

export class Library {
  id: number
  numberOfBooks: number
  signUpTime: number
  dailyCapacity: number
  books: Array<Book>

  constructor(id: number, numberOfBooks: number, signUpTime: number, dailyCapacity: number) {
    this.id = id
    this.numberOfBooks = numberOfBooks
    this.signUpTime = signUpTime
    this.dailyCapacity = dailyCapacity
    this.books = []
  }

  addBook(book: Book) {
    this.books.push(book)
  }
}