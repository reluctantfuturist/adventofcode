from utils.api import get_input

def count_stones_after_blinks(initial_stones, num_blinks):
    stone_counts = {}  # Store counts of each unique stone value

    for stone in initial_stones:
        stone_counts[stone] = stone_counts.get(stone, 0) + 1

    for _ in range(num_blinks):
        new_stone_counts = {}
        for stone, count in stone_counts.items():
            if stone == 0:
                new_stone_counts[1] = new_stone_counts.get(1, 0) + count
            elif len(str(stone)) % 2 == 0:
                s_stone = str(stone)
                mid = len(s_stone) // 2
                left = int(s_stone[:mid])
                right = int(s_stone[mid:])
                new_stone_counts[left] = new_stone_counts.get(left, 0) + count
                new_stone_counts[right] = new_stone_counts.get(right, 0) + count
            else:
                new_stone = stone * 2024
                new_stone_counts[new_stone] = new_stone_counts.get(new_stone, 0) + count
        stone_counts = new_stone_counts

    return sum(stone_counts.values())

if __name__ == "__main__":
    input_str = get_input(2024, 11)
    initial_stones = [int(x) for x in input_str.split()]

    stones_25 = count_stones_after_blinks(initial_stones, 25)
    print("Number of stones after 25 blinks:", stones_25)

    stones_75 = count_stones_after_blinks(initial_stones, 75)
    print("Number of stones after 75 blinks:", stones_75)