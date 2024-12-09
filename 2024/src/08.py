from utils.api import get_input
from typing import List, Tuple, Set, Dict
from collections import defaultdict

def parse_map(input_str: str) -> Tuple[List[str], Dict[str, List[Tuple[int, int]]]]:
    """Parse input map and return grid and antenna positions by frequency."""
    grid = input_str.strip().split('\n')
    antennas = defaultdict(list)
    
    # Find all antennas and group by frequency
    for row in range(len(grid)):
        for col in range(len(grid[0])):
            char = grid[row][col]
            if char != '.':
                antennas[char].append((row, col))
                
    return grid, antennas

def find_antinodes(grid: List[str], antennas: Dict[str, List[Tuple[int, int]]]) -> Set[Tuple[int, int]]:
    """Find all antinode positions."""
    height, width = len(grid), len(grid[0])
    antinodes = set()
    
    # For each frequency
    for freq, positions in antennas.items():
        # For each pair of antennas with same frequency
        for i in range(len(positions)):
            for j in range(i + 1, len(positions)):
                pos1, pos2 = positions[i], positions[j]
                
                # Calculate vector between antennas
                dy = pos2[0] - pos1[0]
                dx = pos2[1] - pos1[1]
                
                # For each antenna being the closer one
                for base_pos in [pos1, pos2]:
                    other_pos = pos2 if base_pos == pos1 else pos1
                    
                    # Vector from base to other
                    dy = other_pos[0] - base_pos[0]
                    dx = other_pos[1] - base_pos[1]
                    
                    # Calculate antinode positions on both sides
                    # If base_pos is the closer one, antinode is at -1/2 and 2 times the vector
                    for factor in [-0.5, 2.0]:
                        antinode_row = base_pos[0] + dy * factor
                        antinode_col = base_pos[1] + dx * factor
                        
                        # Check if antinode is at integer coordinates and within bounds
                        if (antinode_row.is_integer() and antinode_col.is_integer() and 
                            0 <= antinode_row < height and 0 <= antinode_col < width):
                            antinodes.add((int(antinode_row), int(antinode_col)))
    
    return antinodes

def is_collinear(p1: Tuple[int, int], p2: Tuple[int, int], p3: Tuple[int, int]) -> bool:
    """Check if three points are collinear using cross product."""
    x1, y1 = p1
    x2, y2 = p2
    x3, y3 = p3
    return (y2 - y1) * (x3 - x1) == (y3 - y1) * (x2 - x1)

def find_antinodes_part2(grid: List[str], antennas: Dict[str, List[Tuple[int, int]]]) -> Set[Tuple[int, int]]:
    """Find all antinode positions for part 2 (collinear points)."""
    height, width = len(grid), len(grid[0])
    antinodes = set()
    
    # For each frequency
    for freq, positions in antennas.items():
        # Skip if there's only one antenna of this frequency
        if len(positions) < 2:
            continue
            
        # Check each point in the grid
        for row in range(height):
            for col in range(width):
                point = (row, col)
                
                # For each pair of antennas
                for i in range(len(positions)):
                    for j in range(i + 1, len(positions)):
                        if is_collinear(positions[i], positions[j], point):
                            antinodes.add(point)
                            break
                    if point in antinodes:
                        break
        
        # Add all antenna positions as antinodes
        for pos in positions:
            antinodes.add(pos)
    
    return antinodes

def solve(input_str: str) -> tuple[int, int]:
    """Solve both parts of the puzzle."""
    grid, antennas = parse_map(input_str)
    
    # Part 1: Count unique antinode locations (original rules)
    antinodes = find_antinodes(grid, antennas)
    part1 = len(antinodes)
    
    # Part 2: Count unique antinode locations (collinear points)
    antinodes_part2 = find_antinodes_part2(grid, antennas)
    part2 = len(antinodes_part2)
    
    return part1, part2

# Test input
test_input = """\
............
........0...
.....0......
.......0....
....0.......
......A.....
............
............
........A...
.........A..
............
............"""

if __name__ == "__main__":
    # Test the example
    test_part1, _ = solve(test_input)
    print(f"Test result: {test_part1}")  # Should print 14
    
    # Solve the actual puzzle
    input_str = get_input(2024, 8)
    part1, part2 = solve(input_str)
    print(f"Part 1: {part1}")
    print(f"Part 2: {part2}")

