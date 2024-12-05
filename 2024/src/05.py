from utils.api import get_input
from typing import List, Tuple, Dict, Set
from collections import defaultdict

def parse_input(input_str: str) -> Tuple[Dict[int, Set[int]], List[List[int]]]:
    """Parse input into rules and updates.
    Returns:
        - Dict mapping page X to set of pages Y where X must come before Y
        - List of updates (each update is a list of page numbers)
    """
    # Split input into lines and find where updates start
    lines = input_str.strip().split('\n')
    rules_end = 0
    for i, line in enumerate(lines):
        if not line.strip() or ('|' not in line and ',' in line):
            rules_end = i
            break
    
    # Parse rules
    rules: Dict[int, Set[int]] = defaultdict(set)
    for line in lines[:rules_end]:
        if not line.strip():  # Skip empty lines
            continue
        # Remove semicolon and split on |
        line = line.strip().rstrip(';')
        before_str, after_str = line.split('|')
        before = int(before_str.strip())
        after = int(after_str.strip())
        rules[before].add(after)
    
    # Parse updates
    updates = []
    for line in lines[rules_end:]:
        if not line.strip() or '|' in line:  # Skip empty lines and rule lines
            continue
        # Remove semicolon, split on commas and convert to integers
        line = line.strip().rstrip(';')
        pages = []
        for x in line.split(','):
            x = x.strip()
            if x:  # Only add non-empty values
                pages.append(int(x))
        if pages:  # Only add non-empty updates
            updates.append(pages)
    
    return rules, updates

def is_valid_order(pages: List[int], rules: Dict[int, Set[int]]) -> bool:
    """Check if pages are in valid order according to rules.
    For each page, check if it comes before all pages it must precede."""
    # Get indices for quick position lookup
    positions = {page: i for i, page in enumerate(pages)}
    
    # For each page in the sequence
    for page in pages:
        # Get all pages that this page must come before (that are in this update)
        must_precede = {p for p in rules[page] if p in positions}
        
        # Check if this page comes before all pages it must precede
        for other_page in must_precede:
            if positions[page] > positions[other_page]:
                return False
    
    return True

def must_come_before(page1: int, page2: int, rules: Dict[int, Set[int]], pages: Set[int]) -> bool:
    """Check if page1 must come before page2 according to rules."""
    # Direct rule
    if page2 in rules[page1]:
        return True
    # No rule between these pages
    return False

def sort_pages(pages: List[int], rules: Dict[int, Set[int]]) -> List[int]:
    """Sort pages according to the rules using a topological sort."""
    result = []
    remaining = set(pages)
    
    while remaining:
        # Find a page that can come next (no remaining pages must come before it)
        for page in remaining:
            can_be_next = True
            for other_page in remaining:
                if other_page != page and must_come_before(other_page, page, rules, remaining):
                    can_be_next = False
                    break
            if can_be_next:
                result.append(page)
                remaining.remove(page)
                break
    
    return result

def get_middle_page(pages: List[int]) -> int:
    """Get the middle page number from a list of pages."""
    return pages[len(pages) // 2]

# Get input
input_str = get_input(5)
rules, updates = parse_input(input_str)

# Part 1: Find valid updates and sum their middle pages
valid_updates = []
invalid_updates = []
for update in updates:
    if is_valid_order(update, rules):
        valid_updates.append(update)
    else:
        invalid_updates.append(update)

middle_sum = sum(get_middle_page(update) for update in valid_updates)
print(f"Part 1 - Sum of middle pages from valid updates: {middle_sum}")

# Part 2: Sort invalid updates and sum their middle pages
sorted_updates = [sort_pages(update, rules) for update in invalid_updates]
middle_sum_2 = sum(get_middle_page(update) for update in sorted_updates)
print(f"Part 2 - Sum of middle pages from sorted invalid updates: {middle_sum_2}")

# Debug info
""" print("\nInvalid updates before and after sorting:")
for before, after in zip(invalid_updates, sorted_updates):
    print(f"{before} -> {after} (middle: {get_middle_page(after)})")
 """
