import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js'
import isSatSun from './isWeekend.js';

const today = dayjs()

const fiveDaysTime = today.add(5, 'days');

const oneMonthAhead = today.add(1, 'month')

console.log(oneMonthAhead.format('MMMM DD'))

const day = oneMonthAhead.format('dddd')

console.log(day)


console.log(isSatSun(day))