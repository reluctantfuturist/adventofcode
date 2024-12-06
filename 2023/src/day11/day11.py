from typing import List, Tuple, Set
from itertools import combinations

def parse_input(input_data: str) -> List[str]:
    """Parse the input data into a grid."""
    return input_data.strip().split('\n')

def find_galaxies(grid: List[str]) -> List[Tuple[int, int]]:
    """Find all galaxy positions (#) in the grid."""
    galaxies = []
    for row in range(len(grid)):
        for col in range(len(grid[0])):
            if grid[row][col] == '#':
                galaxies.append((row, col))
    return galaxies

def find_empty_rows_and_cols(grid: List[str]) -> Tuple[Set[int], Set[int]]:
    """Find rows and columns that contain no galaxies."""
    empty_rows = set()
    empty_cols = set()
    
    # Find empty rows
    for row in range(len(grid)):
        if all(c == '.' for c in grid[row]):
            empty_rows.add(row)
    
    # Find empty columns
    for col in range(len(grid[0])):
        if all(grid[row][col] == '.' for row in range(len(grid))):
            empty_cols.add(col)
    
    return empty_rows, empty_cols

def manhattan_distance(p1: Tuple[int, int], p2: Tuple[int, int], empty_rows: Set[int], empty_cols: Set[int], expansion_factor: int) -> int:
    """Calculate Manhattan distance between two points, accounting for cosmic expansion."""
    row1, col1 = p1
    row2, col2 = p2
    
    # Count empty rows and columns between the points
    empty_rows_between = sum(1 for r in empty_rows if min(row1, row2) < r < max(row1, row2))
    empty_cols_between = sum(1 for c in empty_cols if min(col1, col2) < c < max(col1, col2))
    
    # Basic Manhattan distance plus expansion
    base_distance = abs(row1 - row2) + abs(col1 - col2)
    # Each empty row/col adds (expansion_factor - 1) extra steps
    expansion = (empty_rows_between + empty_cols_between) * (expansion_factor - 1)
    
    return base_distance + expansion

def solve(input_data: str, expansion_factor: int) -> int:
    """Solve the puzzle with given expansion factor."""
    grid = parse_input(input_data)
    galaxies = find_galaxies(grid)
    empty_rows, empty_cols = find_empty_rows_and_cols(grid)
    
    # Calculate sum of shortest paths between all pairs
    total_distance = 0
    for g1, g2 in combinations(galaxies, 2):
        distance = manhattan_distance(g1, g2, empty_rows, empty_cols, expansion_factor)
        total_distance += distance
    
    return total_distance

# Test input
test_input = """\
...#......
.......#..
#.........
..........
......#...
.#........
.........#
..........
.......#..
#...#....."""

if __name__ == "__main__":
    # Test the examples
    print(f"Test result part 1: {solve(test_input, 2)}")  # Should print 374
    print(f"Test result part 2 (10x): {solve(test_input, 10)}")  # Should print 1030
    print(f"Test result part 2 (100x): {solve(test_input, 100)}")  # Should print 8410
    
    # Read and solve actual input
    with open("inputs/day11/part1.txt", "r") as f:
        input_data = f.read()
    print(f"Part 1 solution: {solve(input_data, 2)}")
    print(f"Part 2 solution: {solve(input_data, 1000000)}")