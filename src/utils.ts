import { Library } from './Library.ts'
import shuffle from 'https://deno.land/x/lodash/shuffle.js'

export function calculateScore(libraries: Library[], dayLimit: number): {score: number, barrier: number} {
  // Array that holds all the books that have been scanned so far
  const scannedBooks: number[] = []
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

  return {score, barrier: i - 1}
}


// Given a barrier, swaps an element of an array from the left of the barrier with one on the right
export function swapOne(libraries: Library[], barrier: number): Library[] {
  const leftIndex = Math.floor(Math.random() * barrier)
  const rightIndex = Math.floor(Math.random() * (libraries.length - barrier)) + barrier

  const newLib = swap(cloneLibraries(libraries), leftIndex, rightIndex)

  return newLib
}

// Same as swapOne, but with three elements
export function swapThree(libraries: Library[], barrier: number): Library[] {
  let newLib = cloneLibraries(libraries)

  const leftRangeOne = Math.floor(Math.random() * barrier)
  const leftRangeTwo = Math.floor(Math.random() * (barrier - leftRangeOne)) + leftRangeOne

  const rightRangeOne = Math.floor(Math.random() * (newLib.length - barrier)) + barrier
  const rightRangeTwo = Math.floor(Math.random() * (newLib.length - rightRangeOne)) + rightRangeOne

  for (let i = 0; i < 3; i++) {
    let lowest = findLowestPotential(newLib, leftRangeOne, leftRangeTwo)
    let highest = findHighestPotential(newLib, rightRangeOne, rightRangeTwo)
    newLib = swap(newLib, lowest, highest)
  }

  return newLib
}

export function shuffleLeftSide(libraries: Library[], barrier: number): Library[] {
  const newLib = cloneLibraries(libraries)

  const leftSide = newLib.slice(0, barrier + 1)
  const rightSide = newLib.slice(barrier + 1)

  const shuffledLeftSide: Library[] = shuffle(leftSide)
  return shuffledLeftSide.concat(rightSide)
}

// Simple deep clone
export function cloneLibraries(libraries: Library[]): Library[] {
  return JSON.parse(JSON.stringify(libraries))
}

export function getNormalizationValue(instanceName: string): number {
  switch (instanceName[0]) {
    case 'b': return 100000
    case 'c': return 10000
    case 'd': return 100000
    case 'e': return 85000
    case 'f': return 150000
    default: throw new Error('Bad filepath')
  }
}

// Swaps two elements of an array
function swap(arr: any[], firstIndex: number, secondIndex: number): any[] {
  const temp = arr[firstIndex]
  arr[firstIndex] = arr[secondIndex]
  arr[secondIndex] = temp

  return arr
}

function findLowestPotential(libraries: Library[], start: number, stop: number) {
  let min = libraries[start].pontential
  let minIndex = start
  for (let i = start; i < stop; i++) {
    if (libraries[i].pontential < min) {
      min = libraries[i].pontential
      minIndex = i
    }
  }

  return minIndex
}

function findHighestPotential(libraries: Library[], start: number, stop: number) {
  let max = libraries[start].pontential
  let maxIndex = start
  for (let i = start; i < stop; i++) {
    if (libraries[i].pontential > max) {
      max = libraries[i].pontential
      maxIndex = i
    }
  }

  return maxIndex
}