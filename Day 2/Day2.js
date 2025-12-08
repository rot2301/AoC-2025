const fs = require('fs');
const path = require('path');

// Read input file
const input = fs.readFileSync(path.join(__dirname, 'input.txt'), 'utf-8').trim();

// Parse ranges
const ranges = input.split(',').map(range => {
  const [start, end] = range.split('-').map(Number);
  return { start, end };
});

// Function to check if a number is invalid (sequence repeated twice)
function isInvalid(num) {
  const str = num.toString();
  const len = str.length;
  
  // Must be even length
  if (len % 2 !== 0) return false;
  
  // Check if first half equals second half
  const half = len / 2;
  const firstHalf = str.substring(0, half);
  const secondHalf = str.substring(half);
  
  return firstHalf === secondHalf;
}

// Find all invalid IDs in all ranges
let total = 0;

for (const { start, end } of ranges) {
  for (let id = start; id <= end; id++) {
    if (isInvalid(id)) {
      total += id;
    }
  }
}

console.log(`Sum of invalid IDs: ${total}`);
