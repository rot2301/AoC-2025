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
    const startPos = position;
    const distance = rotation.distance;
    
    // Calculate how many times we land on 0 during this rotation
    // We need to count each click, not just crossings
    
    if (rotation.direction === 'L') {
        // Moving left (decreasing numbers)
        // Count how many times we hit 0
        // We hit 0 when: (startPos - k) mod 100 = 0, for k = 1, 2, ..., distance
        // This means: startPos - k = 0, 100, 200, 300, ...
        // So: k = startPos, startPos + 100, startPos + 200, ...
        
        // How many multiples of 100 can we subtract and still be within distance?
        const firstZero = startPos === 0 ? 0 : startPos;
        const timesHitZero = Math.floor((distance - firstZero + 100) / 100);
        if (firstZero <= distance && firstZero > 0) {
            zeroCount += timesHitZero;
        } else if (firstZero === 0) {
            // We start at 0, don't count it
            zeroCount += Math.floor(distance / 100);
        }
        
        position = ((startPos - distance) % 100 + 100) % 100;
    } else {
        // Moving right (increasing numbers)
        // We hit 0 when: (startPos + k) mod 100 = 0, for k = 1, 2, ..., distance
        // This means: startPos + k = 100, 200, 300, ...
        // So: k = 100 - startPos, 200 - startPos, ...
        
        const firstZero = startPos === 0 ? 100 : (100 - startPos);
        if (firstZero <= distance) {
            zeroCount += 1 + Math.floor((distance - firstZero) / 100);
        }
        
        position = (startPos + distance) % 100;
    }
}

console.log(`Password (Part 2): ${zeroCount}`);
