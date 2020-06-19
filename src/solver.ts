import { libraries, dayLimit } from './parser.ts'
import { calculateScore, swapOne, swapThree } from './utils.ts'
import shuffle from 'https://deno.land/x/lodash/shuffle.js'

// Initial variables
let t = 1.0
let S = shuffle(libraries)
let { score, barrier } = calculateScore(S, parseInt(dayLimit))
let best = {S, score}
console.log(`Initial: { score: ${score}, barrier: ${barrier} }`)

while(t > 0) {
  // Tweak S by swapping 3 used libraries with 3 unused ones
  let R = swapThree(libraries, barrier)
  let { score: newScore, barrier: newBarrier } = calculateScore(R, parseInt(dayLimit))

  // If a better solution has been found or the simulated annealing condition has been met use the newly found solution
  if (newScore > score || Math.random() < Math.exp((newScore - score) / t)) {
    S = R
    score = newScore
    barrier = newBarrier
    console.log({score, barrier, t})
  }

  // Decrease the temperature using the Lundy and Mees method
  t = t / (1 + 0.001 * t)

  // If the best solution so far has been found, save it
  if (score > best.score) {
    best = {S, score}
    console.log('Found new best')
  }
}