from utils.api import get_input
from collections import deque

def parse_grid(s):
    # Parse a grid where digits represent heights and '.' represent impassable terrain.
    # Return a 2D list of integers (heights), with '.' mapped to -1.
    lines = s.strip().split('\n')
    grid = []
    for line in lines:
        row = []
        for ch in line:
            if ch == '.':
                row.append(-1)
            else:
                row.append(int(ch))
        grid.append(row)
    return grid

def solve_part1(grid):
    h, w = len(grid), len(grid[0])
    directions = [(1,0),(-1,0),(0,1),(0,-1)]

    def neighbors(r,c):
        for dr,dc in directions:
            nr,nc = r+dr,c+dc
            if 0<=nr<h and 0<=nc<w:
                yield nr,nc

    # Trailheads: height 0
    trailheads = [(r,c) for r in range(h) for c in range(w) if grid[r][c] == 0]

    def reachable_nines(sr,sc):
        seen = {(sr,sc)}
        frontier = deque([(sr,sc)])
        reached_nines = set()
        while frontier:
            r,c = frontier.popleft()
            val = grid[r][c]
            if val == 9:
                reached_nines.add((r,c))
            for nr,nc in neighbors(r,c):
                if (nr,nc) not in seen and 0 <= grid[nr][nc] == val+1:
                    seen.add((nr,nc))
                    frontier.append((nr,nc))
        return reached_nines

    total_score = 0
    for (r,c) in trailheads:
        score = len(reachable_nines(r,c))
        total_score += score

    return total_score

def solve_part2(grid):
    h, w = len(grid), len(grid[0])
    directions = [(1,0),(-1,0),(0,1),(0,-1)]

    def neighbors(r,c):
        for dr,dc in directions:
            nr,nc = r+dr,c+dc
            if 0<=nr<h and 0<=nc<w:
                yield nr,nc

    # Trailheads: height 0
    trailheads = [(r,c) for r in range(h) for c in range(w) if grid[r][c] == 0]

    def count_paths(sr, sc):
        # Use DFS to count all possible paths
        def dfs(r, c):
            val = grid[r][c]
            if val == 9:
                return 1
            
            total = 0
            for nr, nc in neighbors(r,c):
                if 0 <= grid[nr][nc] == val + 1:
                    total += dfs(nr, nc)
            return total
        
        return dfs(sr, sc)

    total_rating = 0
    for (r,c) in trailheads:
        rating = count_paths(r,c)
        total_rating += rating

    return total_rating

if __name__ == "__main__":
    # Test cases for part 1
    test1 = """...0...
...1...
...2...
6543456
7.....7
8.....8
9.....9"""
    print("\n=== Test 1 ===")
    res1 = solve_part1(parse_grid(test1))
    print(f"Expected: 2, Got: {res1}")

    test2 = """..90..9
...1.98
...2..7
6543456
765.987
876....
987...."""
    print("\n=== Test 2 ===")
    res2 = solve_part1(parse_grid(test2))
    print(f"Expected: 4, Got: {res2}")

    test3 = """10..9..
2...8..
3...7..
4567654
...8..3
...9..2
.....01"""
    print("\n=== Test 3 ===")
    res3 = solve_part1(parse_grid(test3))
    print(f"Expected: 3 (1 + 2), Got: {res3}")

    test_large = """89010123
78121874
87430965
96549874
45678903
32019012
01329801
10456732"""
    print("\n=== Larger Example ===")
    res_large = solve_part1(parse_grid(test_large))
    print(f"Expected: 36, Got: {res_large}")

    # Test cases for part 2
    test_p2_1 = """.....0.
..4321.
..5..2.
..6543.
..7..4.
..8765.
..9...."""
    print("\n=== Part 2 Test 1 ===")
    res_p2_1 = solve_part2(parse_grid(test_p2_1))
    print(f"Expected: 3, Got: {res_p2_1}")

    test_p2_2 = """..90..9
...1.98
...2..7
6543456
765.987
876....
987...."""
    print("\n=== Part 2 Test 2 ===")
    res_p2_2 = solve_part2(parse_grid(test_p2_2))
    print(f"Expected: 13, Got: {res_p2_2}")

    test_p2_3 = """012345
123456
234567
345678
4.6789
56789."""
    print("\n=== Part 2 Test 3 ===")
    res_p2_3 = solve_part2(parse_grid(test_p2_3))
    print(f"Expected: 227, Got: {res_p2_3}")

    # Solve actual puzzle
    input_str = get_input(2024, 10)
    grid = parse_grid(input_str)
    
    part1 = solve_part1(grid)
    part2 = solve_part2(grid)
    
    print(f"Part 1: {part1}")
    print(f"Part 2: {part2}")
