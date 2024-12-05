from utils.api import get_input
from typing import List

def parse_input(input_str: str) -> List[List[int]]:
    """Parse input into a list of number sequences."""
    return [
        [int(x) for x in line.split()]
        for line in input_str.strip().split('\n')
    ]

def is_safe_sequence(levels: List[int]) -> bool:
    """Check if a sequence is safe according to the rules:
    1. All numbers must be either increasing or decreasing
    2. Adjacent numbers must differ by 1-3
    """
    if len(levels) < 2:
        return True
    
    # Get differences between adjacent numbers
    diffs = [b - a for a, b in zip(levels, levels[1:])]
    
    # Check if all differences are positive (increasing) or negative (decreasing)
    all_increasing = all(d > 0 for d in diffs)
    all_decreasing = all(d < 0 for d in diffs)
    
    # If neither all increasing nor all decreasing, sequence is unsafe
    if not (all_increasing or all_decreasing):
        return False
    
    # Check if all differences are between 1 and 3 (absolute value)
    return all(1 <= abs(d) <= 3 for d in diffs)

def can_be_made_safe(levels: List[int]) -> bool:
    """Check if sequence is safe or can be made safe by removing one number."""
    # First check if it's already safe
    if is_safe_sequence(levels):
        return True
    
    # Try removing each number one at a time
    for i in range(len(levels)):
        # Create new sequence without the i-th number
        test_sequence = levels[:i] + levels[i+1:]
        if is_safe_sequence(test_sequence):
            return True
    
    return False

# Get and parse input
input_str = get_input(2)
sequences = parse_input(input_str)

# Part 1: Count safe sequences
safe_count = sum(1 for seq in sequences if is_safe_sequence(seq))
print(f"Part 1 - Number of safe reports: {safe_count}")

# Part 2: Count sequences that can be made safe with Problem Dampener
safe_with_dampener = sum(1 for seq in sequences if can_be_made_safe(seq))
print(f"Part 2 - Number of safe reports with Problem Dampener: {safe_with_dampener}")

