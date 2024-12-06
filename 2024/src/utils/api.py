import requests
import os


def get_session_id(filename: str) -> str:
    """Read session ID from file."""
    with open(os.path.join(os.path.dirname(__file__), "../..", filename)) as f:
        return f.read().strip()


def get_input(year: int, day: int) -> str:
    """Get input for a specific day."""
    url = f"https://adventofcode.com/{year}/day/{day}/input"
    session = get_session_id("session.cookie")
    response = requests.get(url, cookies={"session": session})
    response.raise_for_status()
    return response.text


SESSION_ID_FILE = "session.cookie"
SESSION = get_session_id(SESSION_ID_FILE)
