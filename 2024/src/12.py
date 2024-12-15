from utils.api import get_input

def calculate_perimeter(grid, r, c, char):
    perimeter = 0
    rows = len(grid)
    cols = len(grid[0])
    for dr, dc in [(0, 1), (0, -1), (1, 0), (-1, 0)]:
        nr, nc = r + dr, c + dc
        if not (0 <= nr < rows and 0 <= nc < cols and grid[nr][nc] == char):
            perimeter += 1
    return perimeter

def calculate_region(grid, r, c):
    rows = len(grid)
    cols = len(grid[0])
    char = grid[r][c]
    area = 0
    perimeter = 0
    visited = set()
    queue = [(r, c)]

    while queue:
        cr, cc = queue.pop(0)
        if (cr, cc) in visited or not (0 <= cr < rows and 0 <= cc < cols) or grid[cr][cc] != char:
            continue

        visited.add((cr, cc))
        area += 1
        perimeter += calculate_perimeter(grid, cr, cc, char)

        for dr, dc in [(0, 1), (0, -1), (1, 0), (-1, 0)]:
            queue.append((cr + dr, cc + dc))

    return area, perimeter

def solve(grid):
    rows = len(grid)
    cols = len(grid[0])
    total_price = 0
    visited = set()

    for r in range(rows):
        for c in range(cols):
            if (r, c) not in visited:
                area, perimeter = calculate_region(grid, r, c)
                total_price += area * perimeter
                
                # Mark all cells in the region as visited
                region_cells = set()
                queue = [(r, c)]
                while queue:
                    cr, cc = queue.pop(0)
                    if (cr, cc) in region_cells or not (0 <= cr < rows and 0 <= cc < cols) or grid[cr][cc] != grid[r][c]:
                        continue
                    region_cells.add((cr, cc))
                    for dr, dc in [(0, 1), (0, -1), (1, 0), (-1, 0)]:
                        queue.append((cr + dr, cc + dc))
                visited.update(region_cells)

    return total_price


if __name__ == "__main__":
    input_str = get_input(2024, 12)
    grid = [list(line) for line in input_str.splitlines()]
    
    result = solve(grid)
    print(f"Total price: {result}")