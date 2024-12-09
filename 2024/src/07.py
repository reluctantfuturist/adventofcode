from typing import List, Tuple
from utils.api import get_input
from itertools import product

def parse_input(input_str: str) -> List[Tuple[int, List[int]]]:
    """Parse input into list of (test_value, numbers) tuples."""
    equations = []
    for line in input_str.strip().split('\n'):
        test_value, numbers = line.split(': ')
        numbers = [int(x) for x in numbers.split()]
        equations.append((int(test_value), numbers))
    return equations

def evaluate_expression(numbers: List[int], operators: List[str]) -> int:
    """Evaluate expression left-to-right with given operators."""
    result = numbers[0]
    for i, op in enumerate(operators):
        if op == '+':
            result += numbers[i + 1]
        elif op == '*':
            result *= numbers[i + 1]
        else:  # op == '||'
            # Convert both numbers to strings, concatenate, then back to int
            result = int(str(result) + str(numbers[i + 1]))
    return result

def can_make_value(test_value: int, numbers: List[int], include_concat: bool = False) -> bool:
    """Check if test_value can be made with any combination of operators."""
    # Generate all possible operator combinations
    num_operators = len(numbers) - 1
    operators = ['+', '*', '||'] if include_concat else ['+', '*']
    
    for ops in product(operators, repeat=num_operators):
        try:
            if evaluate_expression(numbers, ops) == test_value:
                return True
        except ValueError:
            # Skip invalid concatenations (e.g., if result becomes too large)
            continue
    
    return False

def solve(input_str: str) -> tuple[int, int]:
    """Solve both parts of the puzzle."""
    equations = parse_input(input_str)
    
    # Part 1: Sum of test values for valid equations (only + and *)
    part1 = sum(
        test_value 
        for test_value, numbers in equations 
        if can_make_value(test_value, numbers)
    )
    
    # Part 2: Sum of test values for valid equations (including concatenation)
    part2 = sum(
        test_value 
        for test_value, numbers in equations 
        if can_make_value(test_value, numbers, include_concat=True)
    )
    
    return part1, part2

# Test input
test_input = """\
190: 10 19
3267: 81 40 27
83: 17 5
156: 15 6
7290: 6 8 6 15
161011: 16 10 13
192: 17 8 14
21037: 9 7 18 13
292: 11 6 16 20"""

if __name__ == "__main__":
    # Test the example
    test_part1, _ = solve(test_input)
    print(f"Test result: {test_part1}")  # Should print 3749
    
    # Solve the actual puzzle
    input_str = get_input(2024, 7)
    part1, part2 = solve(input_str)
    print(f"Part 1: {part1}")
    print(f"Part 2: {part2}")

