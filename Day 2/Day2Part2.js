const fs = require('fs');
const path = require('path');

// Read input file
const input = fs.readFileSync(path.join(__dirname, 'input.txt'), 'utf-8').trim();

// Parse ranges
const ranges = input.split(',').map(range => {
  const [start, end] = range.split('-').map(Number);
  return { start, end };
});

// Function to check if a number is invalid (sequence repeated at least twice)
function isInvalid(num) {
  const str = num.toString();
  const len = str.length;
  
  // Try all possible pattern lengths (from 1 to len/2)
  for (let patternLen = 1; patternLen <= len / 2; patternLen++) {
    // Check if len is divisible by patternLen
    if (len % patternLen !== 0) continue;
    
    const pattern = str.substring(0, patternLen);
    const repetitions = len / patternLen;
    
    // Check if the pattern repeated 'repetitions' times equals the full string
    if (pattern.repeat(repetitions) === str) {
      return true;
    }
  }
  
  return false;
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
