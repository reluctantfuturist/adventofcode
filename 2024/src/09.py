from typing import List
from utils.api import get_input

def parse_disk_map(input_str: str) -> List[int]:
    """Parse the disk map into a list of integers."""
    return [int(x) for x in input_str.strip()]

def create_block_map(lengths: List[int]) -> List[int]:
    """Convert length sequence into block map with file IDs (-1 for free space)."""
    blocks = []
    file_id = 0
    # lengths alternate: file-length, free-length, ...
    # Even indices -> file blocks, Odd indices -> free blocks
    for i, length in enumerate(lengths):
        if length > 0:
            if i % 2 == 0:
                # File block
                blocks.extend([file_id] * length)
                file_id += 1
            else:
                # Free block
                blocks.extend([-1] * length)
    return blocks

def compact_disk_part1(blocks: List[int]) -> List[int]:
    """Compact the disk by moving one file block at a time from the end into the leftmost free space (Part 1 rules)."""
    result = blocks.copy()

    while True:
        # Find the first free space
        try:
            gap_index = result.index(-1)
        except ValueError:
            # No free spaces at all
            break

        # Find the last file block (from the right)
        last_file_index = len(result) - 1
        while last_file_index >= 0 and result[last_file_index] == -1:
            last_file_index -= 1
        if last_file_index < 0:
            # No file blocks at all
            break

        if gap_index > last_file_index:
            # All free spaces are after the last file block => no gaps
            break

        # Move the single block
        result[gap_index] = result[last_file_index]
        result[last_file_index] = -1

    return result

def compact_disk_part2(blocks: List[int]) -> List[int]:
    """
    Compact the disk by moving entire files at once (Part 2 rules).
    We move files in order of decreasing file ID.
    For each file, if there's a contiguous run of free space to the left large enough to fit the file,
    we move it there (just once).
    """
    result = blocks.copy()

    # Identify the highest file ID
    max_file_id = max(b for b in result if b != -1) if any(b != -1 for b in result) else -1
    
    # Function to find contiguous free spaces
    def find_free_spaces(blocks: List[int]) -> List[tuple[int, int]]:
        # Returns a list of (start, length) for each free space run
        spaces = []
        start = None
        for i, val in enumerate(blocks):
            if val == -1:
                if start is None:
                    start = i
            else:
                if start is not None:
                    spaces.append((start, i - start))
                    start = None
        if start is not None:
            spaces.append((start, len(blocks) - start))
        return spaces

    # For each file in decreasing order of file ID
    for fid in range(max_file_id, -1, -1):
        # Find the file
        # We assume files are contiguous (based on problem statement)
        try:
            start_idx = result.index(fid)
        except ValueError:
            # File not found (possibly length 0?), skip
            continue
        end_idx = start_idx
        while end_idx + 1 < len(result) and result[end_idx + 1] == fid:
            end_idx += 1

        file_length = end_idx - start_idx + 1

        # Find a free space block to the left that can hold the file
        # Conditions:
        # - Must be strictly to the left of file_start (so the file moves left)
        # - Must have length >= file_length
        # We attempt the move exactly once.
        free_spaces = find_free_spaces(result)
        # Filter free spaces that end before file_start
        suitable_spaces = [(s, l) for (s, l) in free_spaces if s + l <= start_idx and l >= file_length]

        if not suitable_spaces:
            # No suitable free space, do not move this file
            continue

        # Choose the leftmost suitable space (lowest start index)
        suitable_spaces.sort(key=lambda x: x[0])
        target_start, _ = suitable_spaces[0]

        # Move file there
        # Clear the source
        for i in range(start_idx, end_idx + 1):
            result[i] = -1
        # Place the file blocks into the target space
        for i in range(target_start, target_start + file_length):
            result[i] = fid

    return result

def calculate_checksum(blocks: List[int]) -> int:
    """Calculate filesystem checksum."""
    return sum(pos * file_id for pos, file_id in enumerate(blocks) if file_id != -1)

def solve(input_str: str) -> tuple[int, int]:
    """Solve both parts of the puzzle."""
    # Parse input
    lengths = parse_disk_map(input_str)
    
    # Create initial block map
    blocks = create_block_map(lengths)
    
    # Part 1
    compacted_part1 = compact_disk_part1(blocks)
    part1 = calculate_checksum(compacted_part1)
    
    # Part 2 (move whole files in descending file ID order)
    # Start over from original blocks
    compacted_part2 = compact_disk_part2(blocks)
    part2 = calculate_checksum(compacted_part2)
    
    return part1, part2

# Test input for Part 1 with the known example
test_input = "2333133121414131402"
if __name__ == "__main__":
    test_part1, test_part2 = solve(test_input)
    # For part 1: should print 1928
    # For part 2 (example given): should print 2858
    print(f"Test Part 1: {test_part1}")  # Expect 1928
    print(f"Test Part 2: {test_part2}")  # Expect 2858
    
    # Solve the actual puzzle
    input_str = get_input(2024, 9)
    part1, part2 = solve(input_str)
    print(f"Part 1: {part1}")
    print(f"Part 2: {part2}")
