const fs = require('fs');
const path = require('path');

// Read input file
const input = fs.readFileSync(path.join(__dirname, 'input.txt'), 'utf-8').trim();

// Parse red tile coordinates
const tiles = input.split('\n').map(line => {
  const [x, y] = line.split(',').map(Number);
  return { x, y };
});

console.log(`Loaded ${tiles.length} red tiles`);

// Convert to Set for O(1) lookup
const tileSet = new Set(tiles.map(t => `${t.x},${t.y}`));

// Find the largest rectangle
let maxArea = 0;
let bestTiles = null;

// Try all pairs of tiles as opposite corners
for (let i = 0; i < tiles.length; i++) {
  for (let j = i + 1; j < tiles.length; j++) {
    const tile1 = tiles[i];
    const tile2 = tiles[j];
    
    // The two tiles are opposite corners of a rectangle
    // Calculate the dimensions of the rectangle
    const x1 = Math.min(tile1.x, tile2.x);
    const x2 = Math.max(tile1.x, tile2.x);
    const y1 = Math.min(tile1.y, tile2.y);
    const y2 = Math.max(tile1.y, tile2.y);
    
    // The rectangle area includes both corners (inclusive)
    const width = x2 - x1 + 1;
    const height = y2 - y1 + 1;
    const area = width * height;
    
    // Track the maximum area
    if (area > maxArea) {
      maxArea = area;
      bestTiles = { tile1, tile2, width, height };
    }
  }
}

console.log(`Largest rectangle area: ${maxArea}`);
if (bestTiles) {
  console.log(`Between (${bestTiles.tile1.x},${bestTiles.tile1.y}) and (${bestTiles.tile2.x},${bestTiles.tile2.y}): ${bestTiles.width} x ${bestTiles.height}`);
}
