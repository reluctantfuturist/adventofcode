from utils.api import get_input
import re
from typing import List, Tuple, Set

def parse_input(input_str: str) -> str:
    """Parse input string."""
    return input_str.strip()

def find_multiplications(text: str) -> List[Tuple[int, int]]:
    """Find all valid mul(X,Y) instructions in the text.
    Returns a list of tuples (X,Y) for each valid instruction."""
    pattern = r'mul\((\d{1,3}),(\d{1,3})\)'
    matches = re.finditer(pattern, text)
    return [
        (int(match.group(1)), int(match.group(2)))
        for match in matches
    ]

def find_enabled_multiplications(text: str) -> List[Tuple[int, int]]:
    """Find all enabled mul(X,Y) instructions in the text, considering do() and don't()."""
    # Find all instructions with their positions
    mul_pattern = r'mul\((\d{1,3}),(\d{1,3})\)'
    do_pattern = r'do\(\)'
    dont_pattern = r'don\'t\(\)'
    
    # Find all positions of each instruction type
    muls = [(m.start(), int(m.group(1)), int(m.group(2))) 
            for m in re.finditer(mul_pattern, text)]
    dos = [m.start() for m in re.finditer(do_pattern, text)]
    donts = [m.start() for m in re.finditer(dont_pattern, text)]
    
    # For each multiplication, check if it's enabled
    enabled_muls = []
    for pos, x, y in muls:
        # Find the last do/don't before this position
        last_do = max((p for p in dos if p < pos), default=-1)
        last_dont = max((p for p in donts if p < pos), default=-1)
        
        # If last relevant instruction was 'do' or no instruction found, mul is enabled
        if last_do > last_dont:
            enabled_muls.append((x, y))
        elif last_do == -1 and last_dont == -1:
            enabled_muls.append((x, y))
            
    return enabled_muls

def calculate_sum_of_multiplications(pairs: List[Tuple[int, int]]) -> int:
    """Calculate the sum of all multiplication results."""
    return sum(x * y for x, y in pairs)

# Get input
input_str = get_input(3)
text = parse_input(input_str)

# Part 1: Find all multiplications
all_muls = find_multiplications(text)
result1 = calculate_sum_of_multiplications(all_muls)
print(f"Part 1 - Sum of all multiplication results: {result1}")

# Part 2: Find enabled multiplications
enabled_muls = find_enabled_multiplications(text)
result2 = calculate_sum_of_multiplications(enabled_muls)
print(f"Part 2 - Sum of enabled multiplication results: {result2}")

""" # Debug info
print("\nPart 1 instructions:")
for x, y in all_muls:
    print(f"mul({x},{y}) = {x * y}")

print("\nPart 2 instructions (enabled only):")
for x, y in enabled_muls:
    print(f"mul({x},{y}) = {x * y}")
 """
