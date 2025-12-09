# Advent of Code 2025 Solutions

This repository contains solutions for Advent of Code 2025 puzzles, written in JavaScript and PowerShell.

## Project Structure

```
Advent Of Code 2025/
├── Day 1/
│   ├── Day1.js          # Part 1: Dial rotation counting
│   ├── Day1Part2.js     # Part 2: Enhanced dial rotation with zero counting
│   └── input.txt        # Puzzle input
├── Day 2/
│   ├── Day2.js          # Part 1: Invalid product ID detection (repeated sequences)
│   ├── Day2Part2.js     # Part 2: Invalid product ID detection (sequences repeated at least twice)
│   └── input.txt        # Puzzle input
├── Day 8/
│   ├── Day8.ps1         # Part 1: Junction box circuit analysis (PowerShell)
│   ├── Day8Part2.js     # Part 2: Finding last connection in MST (JavaScript)
│   └── input.txt        # Puzzle input
├── Day 9/
│   ├── Day9.js          # Part 1: 
│   ├── 
│   └── input.txt        # Puzzle input
└── README.md            # This file
```

## Solutions Overview

### Day 1: Dial Rotation
- **Part 1**: Count how many times a dial lands on position 0 after a series of rotations
- **Part 2**: Enhanced counting that tracks each individual click passing through position 0

**Language**: JavaScript  
**Files**: `Day1.js`, `Day1Part2.js`

### Day 2: Gift Shop Product IDs
- **Part 1**: Find invalid product IDs (sequences repeated exactly twice)
  - Invalid: 11, 6464, 123123
  - Valid: 12, 1234, 123

- **Part 2**: Find invalid product IDs (sequences repeated at least twice)
  - Invalid: 1111111 (1 seven times), 12341234, 123123123
  - Valid: 123, 1234

**Language**: JavaScript  
**Files**: `Day2.js`, `Day2Part2.js`

### Day 8: Junction Box Networks
- **Part 1**: Analyze junction box coordinates and identify circuit connections using Union-Find
  - Calculates distances between all boxes
  - Connects the 1000 closest pairs
  - Identifies circuit groups and their sizes

- **Part 2**: Find the last connection in a minimum spanning tree
  - Builds MST from closest boxes
  - Returns when fully connected
  - Calculates result from final connection coordinates

**Language**: PowerShell (Part 1), JavaScript (Part 2)  
**Files**: `Day8.ps1`, `Day8Part2.js`

## Running the Solutions

### JavaScript Solutions
```powershell
cd "Day 1"
node Day1.js
node Day1Part2.js

cd "..\Day 2"
node Day2.js
node Day2Part2.js

cd "..\Day 8"
node Day8Part2.js
```

### PowerShell Solutions
```powershell
cd "Day 8"
.\Day8.ps1
```

## Requirements

- Node.js (for JavaScript solutions)
- PowerShell (for PowerShell solutions)

## Notes

- Each solution reads from an `input.txt` file in the same directory
- Input files are parsed according to the puzzle specifications
- Solutions output results directly to the console


