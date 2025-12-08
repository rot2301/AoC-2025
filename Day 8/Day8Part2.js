const fs = require('fs');
const path = require('path');

// Read input
const inputPath = path.join(__dirname, 'input.txt');
const lines = fs.readFileSync(inputPath, 'utf-8').split('\n').filter(line => line.trim());

// Parse junction box coordinates
const boxes = lines.map(line => {
    const [x, y, z] = line.split(',').map(Number);
    return { x, y, z };
});

console.log(`Loaded ${boxes.length} junction boxes`);

// Generate all pairs with distances
const pairs = [];
for (let i = 0; i < boxes.length; i++) {
    for (let j = i + 1; j < boxes.length; j++) {
        const dx = boxes[i].x - boxes[j].x;
        const dy = boxes[i].y - boxes[j].y;
        const dz = boxes[i].z - boxes[j].z;
        pairs.push({
            i,
            j,
            d: dx * dx + dy * dy + dz * dz
        });
    }
}

console.log(`Generated ${pairs.length} pairs`);

// Sort by distance
pairs.sort((a, b) => a.d - b.d);

// Union-Find
const parent = Array.from({ length: boxes.length }, (_, i) => i);

function find(x) {
    if (parent[x] !== x) {
        parent[x] = find(parent[x]);
    }
    return parent[x];
}

// Connect pairs until one component
let components = boxes.length;
let lastI = -1;
let lastJ = -1;

for (const pair of pairs) {
    const rootX = find(pair.i);
    const rootY = find(pair.j);
    
    if (rootX !== rootY) {
        parent[rootX] = rootY;
        components--;
        lastI = pair.i;
        lastJ = pair.j;
        
        if (components === 1) {
            break;
        }
    }
}

console.log(`Last connection: box ${lastI} at (${boxes[lastI].x},${boxes[lastI].y},${boxes[lastI].z}) and box ${lastJ} at (${boxes[lastJ].x},${boxes[lastJ].y},${boxes[lastJ].z})`);

const result = boxes[lastI].x * boxes[lastJ].x;
console.log(`Product of X coordinates: ${result}`);
