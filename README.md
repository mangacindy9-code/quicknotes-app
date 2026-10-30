# QuickNotes

A clean, responsive note-taking web application that allows users to create, search, categorize, and store personal notes directly in their browser.

## Features

- **Categorized Notes:** Create notes tagged under Personal, Work, or Study with distinct color highlights.
- **Real-Time Validation:** Input validation ensuring notes are non-empty and under 200 characters.
- **Search Capabilities:** Instant search filtering by key terms.
- **Data Persistence:** Automatic saving and loading using `localStorage`.
- **Dynamic Note Counter:** Dynamic count formatting reflecting total stored notes.
- **Clear All Option:** Single-click action to reset all notes with confirmation prompt.

## How to Run Locally

1. Clone or download this repository.
2. Ensure `index.html`, `style.css`, `script.js`, and `README.md` are in the root directory.
3. Open `index.html` directly in any modern web browser.

## What I Learned

1. Using `createElement` and `textContent` rather than `innerHTML` prevents potential XSS vulnerabilities when dealing with untrusted user text.
2. Managing state with a simple array of objects makes keeping UI elements like list items and note counts synced with `localStorage` straightforward.
3. CSS Flexbox media queries allow form controls to stack cleanly on smaller viewport widths without heavy CSS frameworks.
