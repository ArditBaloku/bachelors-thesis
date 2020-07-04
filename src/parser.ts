import { Library } from './Library.ts'
import { Book } from './Book.ts'
import { getNormalizationValue } from './utils.ts'

// Fetch filepath from console args
const filePath = Deno.args[0]

export const normalizationValue = getNormalizationValue(filePath)

// Read the corresponding instance
const instanceBytes = Deno.readFileSync(`../instances/${filePath}`)
const decoder = new TextDecoder('utf-8');
const instance = decoder.decode(instanceBytes).split('\n')

// Save number of books, libraries and days and also all the book scores
export const [bookQuantity, libraryQuantity, dayLimit] = instance[0].split(' ')
const bookScores = instance[1].split(' ')

// Arrays for holding books and libraries
const books: Book[] = []
export const libraries: Library[] = []

// For each entry in the book scores, create a new book and push it into the books array
bookScores.forEach((score: string, index: number) => books.push(new Book(index, parseInt(score))))

for (let i = 2; i < instance.length - 2; i += 2) {
  // Get the number of books, signup time and daily capacity for library (i / 2) - 1 then create that library
  const [numberOfBooks, signUpTime, dailyCapacity] = instance[i].split(' ')
  libraries.push(new Library((i / 2) - 1, parseInt(numberOfBooks), parseInt(signUpTime), parseInt(dailyCapacity)))
  
  // Add all the books the library owns
  instance[i + 1].split(' ').map((bookIndex: string) => libraries[(i / 2) - 1].addBook(books[parseInt(bookIndex)]))

  // Sort the books by score
  libraries[(i / 2) - 1].books.sort((a, b) => (a.score > b.score ? -1 : 1))

  // Calculate possible benefit
  libraries[(i / 2) - 1].calculateBenefit()
}