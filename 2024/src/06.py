from typing import List, Set, Tuple
from utils.api import get_input

def parse_map(input_str: str) -> Tuple[List[str], Tuple[int, int, int]]:
    """Parse the input map and find the guard's starting position and direction.
    Direction is encoded as: 0=up, 1=right, 2=down, 3=left"""
    grid = input_str.strip().split('\n')
    
    # Find guard's starting position
    for i, row in enumerate(grid):
        for j, cell in enumerate(row):
            if cell == '^':
                return grid, (i, j, 0)  # facing up
            elif cell == '>':
                return grid, (i, j, 1)  # facing right
            elif cell == 'v':
                return grid, (i, j, 2)  # facing down
            elif cell == '<':
                return grid, (i, j, 3)  # facing left
    
    raise ValueError("No guard found in the map")

def is_valid_position(pos: Tuple[int, int], grid: List[str]) -> bool:
    """Check if a position is within the grid bounds."""
    row, col = pos
    return 0 <= row < len(grid) and 0 <= col < len(grid[0])

def get_next_position(pos: Tuple[int, int], direction: int) -> Tuple[int, int]:
    """Get the next position based on current position and direction."""
    row, col = pos
    if direction == 0:  # up
        return (row - 1, col)
    elif direction == 1:  # right
        return (row, col + 1)
    elif direction == 2:  # down
        return (row + 1, col)
    else:  # left
        return (row, col - 1)

def simulate_guard_path(grid: List[str], start_pos: Tuple[int, int, int]) -> int:
    """Simulate the guard's movement and count distinct visited positions."""
    visited = {(start_pos[0], start_pos[1])}
    row, col, direction = start_pos
    
    while True:
        # Check position in front
        next_row, next_col = get_next_position((row, col), direction)
        
        # If we're about to leave the grid, stop
        if not is_valid_position((next_row, next_col), grid):
            break
            
        # If there's an obstacle in front, turn right
        if grid[next_row][next_col] == '#':
            direction = (direction + 1) % 4
            continue
            
        # Move forward
        row, col = next_row, next_col
        visited.add((row, col))
    
    return len(visited)

def simulate_guard_path_with_obstruction(grid: List[str], start_pos: Tuple[int, int, int], 
                                       obstruction: Tuple[int, int]) -> bool:
    """
    Simulate guard path with an additional obstruction.
    Returns True if a loop is detected, False otherwise.
    """
    visited_states = set()
    row, col, direction = start_pos
    
    while True:
        current_state = (row, col, direction)
        if current_state in visited_states:
            # Only return True if we've moved at least once
            return len(visited_states) > 1
        
        visited_states.add(current_state)
        next_row, next_col = get_next_position((row, col), direction)
        
        # If we're about to leave the grid, not a loop
        if not is_valid_position((next_row, next_col), grid):
            return False
            
        # Check both original obstacles and the new obstruction
        if grid[next_row][next_col] == '#' or (next_row, next_col) == obstruction:
            direction = (direction + 1) % 4
            continue
            
        # Move forward
        row, col = next_row, next_col

def find_loop_positions(grid: List[str], start_pos: Tuple[int, int, int]) -> int:
    """Find all positions where placing an obstruction creates a loop."""
    valid_positions = 0
    start_row, start_col, _ = start_pos
    
    # Get the original path first
    original_visited = set()
    row, col, direction = start_pos
    original_visited.add((row, col))
    
    while True:
        next_row, next_col = get_next_position((row, col), direction)
        if not is_valid_position((next_row, next_col), grid):
            break
        if grid[next_row][next_col] == '#':
            direction = (direction + 1) % 4
            continue
        row, col = next_row, next_col
        original_visited.add((row, col))
    
    # Try every position except start position and existing obstacles
    for row in range(len(grid)):
        for col in range(len(grid[0])):
            # Skip if:
            # - position is already an obstacle
            # - position is the guard's start position
            # - position was never visited in original path
            if (grid[row][col] == '#' or 
                (row == start_row and col == start_col) or 
                (row, col) not in original_visited):
                continue
            
            if simulate_guard_path_with_obstruction(grid, start_pos, (row, col)):
                valid_positions += 1
    
    return valid_positions

def solve(input_str: str) -> tuple[int, int]:
    """Solve both parts of the puzzle."""
    grid, start_pos = parse_map(input_str)
    part1 = simulate_guard_path(grid, start_pos)
    part2 = find_loop_positions(grid, start_pos)
    return part1, part2

# Test input
test_input = """\
....#.....
.........#
..........
..#.......
.......#..
..........
.#..^.....
........#.
#.........
......#..."""

if __name__ == "__main__":
    # Test the example
    test_part1, _ = solve(test_input)
    print(f"Test result: {test_part1}")  # Should print 41
    
    # Solve the actual puzzle
    input_str = get_input(2024, 6)
    part1, part2 = solve(input_str)
    print(f"Part 1: {part1}")
    print(f"Part 2: {part2}")

