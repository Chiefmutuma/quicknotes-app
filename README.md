# QuickNotes

QuickNotes is a simple note-taking web app that lets you capture quick thoughts, sort them into Personal, Work or Study categories, and find them later with search. Notes are saved in your browser, so they stay in place after you refresh the page. The app is built with plain HTML, CSS and JavaScript, with no frameworks or libraries.

## Features

- Add a note with a category (Personal, Work or Study)
- Each note shows its text, category, date and time, and a Delete button
- Each category has its own colour, shown on the left border of the note card
- Validation: empty notes and notes over 200 characters show a clear error message
- Live search that is not case-sensitive and matches every word you type
- A count message that handles zero, one and many notes
- Notes are saved in localStorage, so they survive a page refresh
- Responsive layout: the form stacks vertically on screens 600px wide or narrower

## How to run locally

1. Download or clone this repository to your computer.
2. Open the `quicknotes-app` folder in VS Code.
3. Right-click `index.html` and select **Open with Live Server**.

You can also double-click `index.html` to open it directly in your browser.

## What I learned

- **Structure first, then style, then behaviour.** Building the HTML before the CSS and JavaScript made each task easier to test on its own.
- **Never trust user input in `innerHTML`.** Building elements with `createElement` and setting `textContent` keeps user text as plain text, which protects the page from harmful code.
- **Save data in a format the browser can store.** Converting the notes array with `JSON.stringify` and back with `JSON.parse` lets localStorage keep the notes between visits.
- **Validate before you save.** Checking the text for empty and over-length values first means the notes array only ever holds valid notes.
- **Commit in small steps.** Each commit recorded one finished task, which made it easy to see what changed and why.
