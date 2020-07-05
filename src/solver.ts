import { libraries, dayLimit, normalizationValue, restartValue } from './parser.ts'
import { calculateScore, swapThree, shuffleLeftSide } from './utils.ts'
import { Library } from './Library.ts'
import shuffle from 'https://deno.land/x/lodash/shuffle.js'

// Initial variables
let t = 1.0
let S: Library[] = shuffle(libraries)
let { score, barrier } = calculateScore(S, parseInt(dayLimit))
let best = {S, score, t: 1}
let iterations = 0;
console.log(`Initial: { score: ${score}, barrier: ${barrier} }`)

while(t > 0) {
  // Tweak S by swapping 3 used libraries with 3 unused ones
  let R: Library[]
  if (Math.random() < 0.75) {
    R = swapThree(S, barrier)
  } else {
    R = shuffleLeftSide(S, barrier)
  }

  let { score: newScore, barrier: newBarrier } = calculateScore(R, parseInt(dayLimit))

  // If the acceptance function returns true use the newly found solution
  if (Math.random() < Math.exp((newScore - score) / (normalizationValue * t))) {
    S = R
    score = newScore
    barrier = newBarrier
    console.log({score, barrier, t})
  }

  iterations++

  // If the best solution so far has been found, save it
  if (score > best.score) {
    best = {S, score, t}
    console.log('Found new best')
    iterations = 0
  }

  // Restart strategy
  if (iterations === restartValue) {
    S = best.S
    t = best.t
    console.log(`${iterations} iterations since last best solution found. Restarting at best solution.`)
    iterations = 0
  }

  // Decrease the temperature using the Lundy and Mees method
  t = t / (1 + 0.001 * t)
}