from utils.api import get_input
from collections import Counter

def parse_input(input_str: str) -> tuple[list[int], list[int]]:
    """Parse input string into two lists of numbers.
    Each line contains a pair of numbers separated by spaces."""
    left_list = []
    right_list = []
    
    for line in input_str.strip().split('\n'):
        left, right = map(int, line.split())
        left_list.append(left)
        right_list.append(right)
    
    return left_list, right_list

def calculate_total_distance(left: list[int], right: list[int]) -> int:
    """Calculate total distance between sorted lists."""
    # Sort both lists
    left_sorted = sorted(left)
    right_sorted = sorted(right)
    
    # Calculate distances between pairs
    total_distance = sum(
        abs(l - r) 
        for l, r in zip(left_sorted, right_sorted)
    )
    
    return total_distance

def calculate_similarity_score(left: list[int], right: list[int]) -> int:
    """Calculate similarity score by multiplying each number in the left list
    by the number of times it appears in the right list."""
    # Count occurrences in right list
    right_counts = Counter(right)
    
    # For each number in left list, multiply by its count in right list
    total_score = sum(
        num * right_counts[num]
        for num in left
    )
    
    return total_score

# Get and parse input
input_str = get_input(1)
left_list, right_list = parse_input(input_str)

# Part 1: Calculate total distance
distance = calculate_total_distance(left_list, right_list)
print(f"Part 1 - Total distance between lists: {distance}")

# Part 2: Calculate similarity score
similarity = calculate_similarity_score(left_list, right_list)
print(f"Part 2 - Similarity score: {similarity}")
