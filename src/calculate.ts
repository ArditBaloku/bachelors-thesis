import { Library } from './Library.ts'

export function calculateScore(libraries: Array<Library>, dayLimit: number) {
  // Array that holds all the books that have been scanned so far
  const scannedBooks: Array<number> = []
  let daysLeft = dayLimit
  let score = 0
  let i = -1

  // While there are still days for scanning and there are still libraries
  while (daysLeft > 0 && ++i < libraries.length) {
    const currLib = libraries[i]
    daysLeft -= currLib.signUpTime

    if (daysLeft < 0) break

    // Find out which books the library owns haven't been scanned yet and then take only the first (daysLeft * dailyCapacity) books from that
    const qualifiedBooks = currLib.books.filter((book) => !scannedBooks.some(id => book.id === id))
    const finalBooks = qualifiedBooks.slice(0, (daysLeft * currLib.dailyCapacity))
    
    // Calculate the score and add the books to the array of scanned books
    score += finalBooks.reduce((acc, book) => acc + book.score, 0)
    finalBooks.forEach(book => scannedBooks.push(book.id))
  }

  return score
}