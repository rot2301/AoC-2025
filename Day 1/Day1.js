const fs = require('fs');
const path = require('path');

// Read input
const inputPath = path.join(__dirname, 'input.txt');
const lines = fs.readFileSync(inputPath, 'utf-8').split('\n').filter(line => line.trim());

// Parse rotations
const rotations = lines.map(line => {
    const direction = line[0]; // 'L' or 'R'
    const distance = parseInt(line.substring(1), 10);
    return { direction, distance };
});

// Start at position 50
let position = 50;
let zeroCount = 0;

// Process each rotation
for (const rotation of rotations) {
    if (rotation.direction === 'L') {
        // Rotate left (toward lower numbers)
        position -= rotation.distance;
    } else {
        // Rotate right (toward higher numbers)
        position += rotation.distance;
    }
    
    // Normalize position to 0-99 range (dial is circular)
    position = ((position % 100) + 100) % 100;
    
    // Count if we landed on 0
    if (position === 0) {
        zeroCount++;
    }
}

console.log(`Password (Part 1): ${zeroCount}`);
