from functools import lru_cache
from typing import List

def count_arrangements(row: str, groups: List[int]) -> int:
    if not groups:
        if '#' in row:
            return 0
        return 1
    n = len(row)
    g_count = len(groups)

    @lru_cache(None)
    def dfs(i: int, g: int, r: int) -> int:
        if i == n:
            if g < g_count and r == groups[g]:
                g += 1
                r = 0
            return 1 if g == g_count and r == 0 else 0
        c = row[i]
        ways = 0
        if g == g_count:
            if c == '#':
                return 0
            # c '.' or '?'
            ways += dfs(i+1, g, 0)
            return ways
        else:
            needed = groups[g]
            if c == '#':
                if r < needed:
                    ways += dfs(i+1, g, r+1)
            elif c == '.':
                if r == needed:
                    ways += dfs(i+1, g+1, 0)
                elif r == 0:
                    ways += dfs(i+1, g, 0)
            else:
                if r < needed:
                    ways += dfs(i+1, g, r+1)
                if r == needed:
                    ways += dfs(i+1, g+1, 0)
                elif r == 0:
                    ways += dfs(i+1, g, 0)
        return ways

    return dfs(0, 0, 0)

def solve(input_str: str) -> int:
    lines = input_str.strip().split('\n')
    total = 0
    for line in lines:
        if ' ' in line:
            pattern, group_str = line.split(' ', 1)
            group_str = group_str.strip()
            if group_str:
                groups = list(map(int, group_str.split(',')))
            else:
                groups = []
        else:
            pattern = line.strip()
            groups = []
        total += count_arrangements(pattern, groups)
    return total

def unfold_line(line: str) -> str:
    line = line.strip()
    if ' ' in line:
        pattern, group_str = line.split(' ', 1)
        group_str = group_str.strip()
        # Unfold pattern into P?P?P?P?P
        unfolded_pattern = '?'.join([pattern] * 5)
        if group_str:
            # groups present, unfold groups into G,G,G,G,G where G is the original full group list
            # first parse into a list of groups
            gs = group_str.split(',')
            # replicate 5 times
            all_groups = gs * 5
            # join by commas
            unfolded_groups = ','.join(map(str, all_groups))
            return f"{unfolded_pattern} {unfolded_groups}"
        else:
            # no groups, just unfold pattern
            return unfolded_pattern
    else:
        # Just a pattern with no groups
        pattern = line
        unfolded_pattern = '?'.join([pattern] * 5)
        return unfolded_pattern

def unfold_records(input_str: str) -> str:
    lines = input_str.strip().split('\n')
    unfolded_lines = [unfold_line(line) for line in lines]
    return '\n'.join(unfolded_lines)

if __name__ == "__main__":
    # Read the puzzle input
    with open("inputs/day12/part1.txt", "r") as f:
        puzzle_input = f.read()

    # Part 1 result
    part1_result = solve(puzzle_input)
    print(part1_result)

    # Unfold and solve again for Part 2
    unfolded_input = unfold_records(puzzle_input)
    part2_result = solve(unfolded_input)
    print(part2_result)
