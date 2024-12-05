from utils.api import get_input
from typing import List, Tuple, Set

def parse_grid(input_str: str) -> List[List[str]]:
    """Convert input string into a 2D grid of characters."""
    return [list(line.strip()) for line in input_str.strip().split('\n')]

def find_xmas(grid: List[List[str]], x: int, y: int, dx: int, dy: int) -> bool:
    """Check if XMAS exists starting at (x,y) going in direction (dx,dy)."""
    rows, cols = len(grid), len(grid[0])
    word = "XMAS"
    
    # Check bounds
    if not (0 <= x + dx * 3 < cols and 0 <= y + dy * 3 < rows):
        return False
    
    # Check each character
    return all(
        grid[y + i*dy][x + i*dx] == word[i]
        for i in range(4)
    )

def check_mas(grid: List[List[str]], x: int, y: int, dx: int, dy: int) -> bool:
    """Check if MAS exists starting at (x,y) going in direction (dx,dy).
    Also checks for SAM in the same direction."""
    rows, cols = len(grid), len(grid[0])
    word = "MAS"
    
    # Check bounds for forward direction
    if not (0 <= x + dx * 2 < cols and 0 <= y + dy * 2 < rows):
        return False
    
    # Check forward direction (MAS)
    forward = all(
        grid[y + i*dy][x + i*dx] == word[i]
        for i in range(3)
    )
    
    # Check backward direction (SAM)
    backward = all(
        grid[y + i*dy][x + i*dx] == word[2-i]
        for i in range(3)
    )
    
    return forward or backward

def count_xmas_occurrences(grid: List[List[str]]) -> int:
    """Count how many times XMAS appears in all 8 directions."""
    rows, cols = len(grid), len(grid[0])
    count = 0
    
    # All possible directions
    directions = [
        (1, 0),   # right
        (-1, 0),  # left
        (0, 1),   # down
        (0, -1),  # up
        (1, 1),   # down-right
        (-1, -1), # up-left
        (1, -1),  # up-right
        (-1, 1)   # down-left
    ]
    
    # Check each starting position and direction
    for y in range(rows):
        for x in range(cols):
            for dx, dy in directions:
                if find_xmas(grid, x, y, dx, dy):
                    count += 1
    
    return count

def find_xmas_pattern(grid: List[List[str]], x: int, y: int) -> bool:
    """Check if there's an X-MAS pattern centered at position (x,y)."""
    rows, cols = len(grid), len(grid[0])
    
    # Check if we can form an X pattern from this center point
    if not (0 <= x-1 < cols and 0 <= x+1 < cols and 
            0 <= y-1 < rows and 0 <= y+1 < rows):
        return False
    
    # Check if center is 'A'
    if grid[y][x] != 'A':
        return False
    
    # Check both diagonal pairs for MAS/SAM
    # First diagonal: upper-left to lower-right
    if check_mas(grid, x-1, y-1, 1, 1):
        # Second diagonal: upper-right to lower-left
        if check_mas(grid, x+1, y-1, -1, 1):
            return True
    
    return False

def count_xmas_patterns(grid: List[List[str]]) -> int:
    """Count how many X-MAS patterns exist in the grid."""
    rows, cols = len(grid), len(grid[0])
    count = 0
    
    # Check each possible center position
    for y in range(rows):
        for x in range(cols):
            if find_xmas_pattern(grid, x, y):
                count += 1
    
    return count

def visualize_patterns(grid: List[List[str]], part2: bool = False) -> None:
    """Create a visualization showing only the letters that form patterns."""
    rows, cols = len(grid), len(grid[0])
    used = [[False] * cols for _ in range(rows)]
    
    if part2:
        # Visualize X-MAS patterns
        for y in range(rows):
            for x in range(cols):
                if find_xmas_pattern(grid, x, y):
                    # Mark the X pattern
                    used[y][x] = True  # center A
                    # Mark the diagonals
                    used[y-1][x-1] = True  # upper-left
                    used[y+1][x+1] = True  # lower-right
                    used[y-1][x+1] = True  # upper-right
                    used[y+1][x-1] = True  # lower-left
    else:
        # Visualize XMAS occurrences
        directions = [(1,0), (-1,0), (0,1), (0,-1), (1,1), (-1,-1), (1,-1), (-1,1)]
        for y in range(rows):
            for x in range(cols):
                for dx, dy in directions:
                    if find_xmas(grid, x, y, dx, dy):
                        for i in range(4):
                            used[y + i*dy][x + i*dx] = True
    
    print("\nVisualization (dots represent unused letters):")
    for y in range(rows):
        print(''.join(grid[y][x] if used[y][x] else '.' for x in range(cols)))

# Get and parse input
input_str = get_input(4)
grid = parse_grid(input_str)

# Part 1: Find all XMAS occurrences
result1 = count_xmas_occurrences(grid)
print(f"Part 1 - Found 'XMAS' {result1} times in the word search")
# visualize_patterns(grid, part2=False)

# Part 2: Find all X-MAS patterns
result2 = count_xmas_patterns(grid)
print(f"\nPart 2 - Found {result2} X-MAS patterns in the word search")
# visualize_patterns(grid, part2=True)

