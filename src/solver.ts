import { libraries, dayLimit } from './parser.ts'
import { calculateScore } from './calculate.ts'

console.log(calculateScore(libraries, parseInt(dayLimit)))