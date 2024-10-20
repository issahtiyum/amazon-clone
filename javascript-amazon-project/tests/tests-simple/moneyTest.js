import { formatCurrency } from "../../scripts/utils/money.js";

console.log('Test suite: formatCurrency')

console.log('converts cents into dollars')

if(formatCurrency(2095) === '20.95') {
  console.log('passed')
} else {
  console.log('failed');
}

console.log('works with zero')
if (formatCurrency(0) === '0.00') {
  console.log('passed')
} else {
  console.log('failed')
}

console.log('rounds up to nearest cent')
if (formatCurrency(2000.5) === '20.01') {
  console.log('passed')
} else {
  console.log('failed')
}

console.log('rounds down to nearest cent')
if (formatCurrency(2000.4) === '20.00') {
  console.log('passed')
} else {
  console.log('failed')
}

console.log('works with negative numbers')
if (formatCurrency(-2095) === '-20.95') {
  console.log('passed')
} else {
  console.log('failed')
}