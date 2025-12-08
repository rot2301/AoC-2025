# Advent of Code 2025 Day 8

# Read input - expecting input.txt in the same directory
$inputPath = Join-Path $PSScriptRoot "input.txt"
$lines = @(Get-Content $inputPath | Where-Object { $_ -match '\S' })

# Parse junction box coordinates
$boxes = @()
foreach ($line in $lines) {
    $coords = $line -split ',' | ForEach-Object { [int]$_ }
    $boxes += @{
        x = $coords[0]
        y = $coords[1]
        z = $coords[2]
        index = $boxes.Count
    }
}

Write-Host "Loaded $($boxes.Count) junction boxes"

# Function to calculate Manhattan distance (close approximation for this problem)
function Get-Distance {
    param(
        [hashtable]$box1,
        [hashtable]$box2
    )
    
    $dx = $box1.x - $box2.x
    $dy = $box1.y - $box2.y
    $dz = $box1.z - $box2.z
    
    return [Math]::Sqrt($dx * $dx + $dy * $dy + $dz * $dz)
}

# Generate all pairs with distances
$pairs = @()
for ($i = 0; $i -lt $boxes.Count; $i++) {
    for ($j = $i + 1; $j -lt $boxes.Count; $j++) {
        $distance = Get-Distance $boxes[$i] $boxes[$j]
        $pairs += @{
            box1 = $i
            box2 = $j
            distance = $distance
        }
    }
}

Write-Host "Generated $($pairs.Count) pairs"

# Sort by distance and take closest 1000
$pairs = $pairs | Sort-Object -Property distance | Select-Object -First 1000

Write-Host "Taking 1000 closest pairs"

# Union-Find data structure
$parent = @(0..($boxes.Count - 1))
$size = @(1) * $boxes.Count

function Find {
    param([int]$x)
    
    if ($parent[$x] -ne $x) {
        $parent[$x] = Find $parent[$x]
    }
    return $parent[$x]
}

function Union {
    param(
        [int]$x,
        [int]$y
    )
    
    $rootX = Find $x
    $rootY = Find $y
    
    if ($rootX -eq $rootY) {
        return
    }
    
    # Union by size
    if ($size[$rootX] -lt $size[$rootY]) {
        $parent[$rootX] = $rootY
        $size[$rootY] += $size[$rootX]
    } else {
        $parent[$rootY] = $rootX
        $size[$rootX] += $size[$rootY]
    }
}

# Connect the 1000 closest pairs
foreach ($pair in $pairs) {
    Union $pair.box1 $pair.box2
}

# Find all unique circuits and their sizes
$circuits = @{}
for ($i = 0; $i -lt $boxes.Count; $i++) {
    $root = Find $i
    if (-not $circuits.ContainsKey($root)) {
        $circuits[$root] = 0
    }
    $circuits[$root]++
}

# Get the three largest circuit sizes
$ciruitSizes = $circuits.Values | Sort-Object -Descending | Select-Object -First 3

Write-Host "Circuit sizes: $ciruitSizes"
Write-Host "Number of circuits: $($circuits.Count)"

# Calculate the product of the three largest
$result = $ciruitSizes[0] * $ciruitSizes[1] * $ciruitSizes[2]
Write-Host "Product of three largest circuits: $result"
