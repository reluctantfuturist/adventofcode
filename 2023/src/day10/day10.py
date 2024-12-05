from typing import List, Tuple, Set, Dict
from collections import deque

def parse_input(input_data: str) -> List[str]:
    """Parse the input data into a grid of pipes."""
    return input_data.strip().split('\n')

def find_start(grid: List[str]) -> Tuple[int, int]:
    """Find the starting position (S) in the grid."""
    for i, row in enumerate(grid):
        for j, char in enumerate(row):
            if char == 'S':
                return i, j
    raise ValueError("No starting position found")

def get_connected_pipes(grid: List[str], pos: Tuple[int, int]) -> List[Tuple[int, int]]:
    """Get all valid connected pipes from the current position."""
    row, col = pos
    height, width = len(grid), len(grid[0])
    current = grid[row][col]
    connected = []
    
    # Define which directions each pipe type can connect to
    pipe_connections = {
        '|': [(1, 0), (-1, 0)],   # North and South
        '-': [(0, 1), (0, -1)],   # East and West
        'L': [(-1, 0), (0, 1)],   # North and East
        'J': [(-1, 0), (0, -1)],  # North and West
        '7': [(1, 0), (0, -1)],   # South and West
        'F': [(1, 0), (0, 1)],    # South and East
        'S': [(1, 0), (-1, 0), (0, 1), (0, -1)]  # All directions for start
    }
    
    if current not in pipe_connections:
        return []
        
    for dr, dc in pipe_connections[current]:
        new_row, new_col = row + dr, col + dc
        
        # Check if the position is within bounds
        if not (0 <= new_row < height and 0 <= new_col < width):
            continue
            
        next_pipe = grid[new_row][new_col]
        # Check if the next pipe can connect back to the current position
        if next_pipe == '.' or next_pipe not in pipe_connections:
            continue
            
        # Check if the connection is valid from both sides
        reverse_dr, reverse_dc = -dr, -dc
        if any((reverse_dr, reverse_dc) == direction for direction in pipe_connections[next_pipe]):
            connected.append((new_row, new_col))
            
    return connected

def find_loop(grid: List[str]) -> Set[Tuple[int, int]]:
    """Find all positions that are part of the main loop."""
    start = find_start(grid)
    loop_positions = {start}
    queue = deque([start])
    
    while queue:
        current = queue.popleft()
        for next_pos in get_connected_pipes(grid, current):
            if next_pos not in loop_positions:
                loop_positions.add(next_pos)
                queue.append(next_pos)
    
    return loop_positions

def determine_start_type(grid: List[str], start_pos: Tuple[int, int], connected: List[Tuple[int, int]]) -> str:
    """Determine what type of pipe the start position represents."""
    row, col = start_pos
    directions = []
    
    for next_row, next_col in connected:
        directions.append((next_row - row, next_col - col))
    
    directions = set(directions)
    
    # Map direction combinations to pipe types
    direction_to_pipe = {
        frozenset([(1, 0), (-1, 0)]): '|',  # North and South
        frozenset([(0, 1), (0, -1)]): '-',  # East and West
        frozenset([(-1, 0), (0, 1)]): 'L',  # North and East
        frozenset([(-1, 0), (0, -1)]): 'J', # North and West
        frozenset([(1, 0), (0, -1)]): '7',  # South and West
        frozenset([(1, 0), (0, 1)]): 'F',   # South and East
    }
    
    return direction_to_pipe[frozenset(directions)]

def count_enclosed_tiles(grid: List[str], loop_positions: Set[Tuple[int, int]]) -> int:
    """Count the number of tiles enclosed by the loop."""
    height, width = len(grid), len(grid[0])
    enclosed_count = 0
    
    # Replace S with its actual pipe type
    start_pos = find_start(grid)
    start_connections = get_connected_pipes(grid, start_pos)
    start_type = determine_start_type(grid, start_pos, start_connections)
    grid = [row.replace('S', start_type) for row in grid]
    
    # For each row, count crossings from left to right
    for row in range(height):
        inside = False
        for col in range(width):
            if (row, col) in loop_positions:
                pipe = grid[row][col]
                # Count vertical segments and north-facing corners
                if pipe == '|':
                    inside = not inside
                elif pipe == 'L' or pipe == 'J':  # Both turn north
                    inside = not inside
            elif inside and (row, col) not in loop_positions:
                enclosed_count += 1
    
    return enclosed_count

def solve_part1(input_data: str) -> int:
    """Solve part 1: Find the point farthest from start."""
    grid = parse_input(input_data)
    start = find_start(grid)
    distances = {start: 0}
    queue = deque([start])
    
    while queue:
        current = queue.popleft()
        current_distance = distances[current]
        
        for next_pos in get_connected_pipes(grid, current):
            if next_pos not in distances:
                distances[next_pos] = current_distance + 1
                queue.append(next_pos)
    
    return max(distances.values())

def solve_part2(input_data: str) -> int:
    """Solve part 2: Find the number of tiles enclosed by the loop."""
    grid = parse_input(input_data)
    loop_positions = find_loop(grid)
    return count_enclosed_tiles(grid, loop_positions)

# Test with example inputs
test_input1 = """\
..F7.
.FJ|.
SJ.L7
|F--J
LJ..."""

test_input2 = """\
FF7FSF7F7F7F7F7F---7
L|LJ||||||||||||F--J
FL-7LJLJ||||||LJL-77
F--JF--7||LJLJ7F7FJ-
L---JF-JLJ.||-FJLJJ7
|F|F-JF---7F7-L7L|7|
|FFJF7L7F-JF7|JL---7
7-L-JL7||F7|L7F-7F7|
L.L7LFJ|||||FJL7||LJ
L7JLJL-JLJLJL--JLJ.L"""

if __name__ == "__main__":
    # Test the examples
    print(f"Test result part 1: {solve_part1(test_input1)}")  # Should print 8
    print(f"Test result part 2: {solve_part2(test_input2)}")  # Should print 10
    
    # Read and solve actual input
    with open("inputs/day10/part1.txt", "r") as f:
        input_data = f.read()
    print(f"Part 1 solution: {solve_part1(input_data)}")
    print(f"Part 2 solution: {solve_part2(input_data)}")