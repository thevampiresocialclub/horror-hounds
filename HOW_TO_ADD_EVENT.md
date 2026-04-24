# How to Add a New Event to The Horror Hounds Website

No coding experience needed! Follow these steps to add a new event.

---

## The Easiest Way: Use the Event Manager

1. Open `event-manager.html` in your browser (double-click the file locally, or visit `yoursite.com/event-manager.html` if deployed).
2. Fill in the **"Add New Event"** form.
3. Click **Add Event**.
4. At the bottom of the page, click **"Save to events.json"** (Chrome/Edge only — picks your existing `events.json` file and overwrites it). Or click **Download File** and replace `events.json` manually.
5. Commit the updated `events.json` to GitHub.

That's it. Skip the rest of this document unless something goes wrong.

---

## Manual Method (GitHub Web Editor)

### What You'll Need
- A GitHub account (free)
- Access to the repository (ask the admin to add you as a collaborator)
- Your event flyer image (JPG or PNG)

### Step 1: Upload the Flyer Image

1. Go to the repository on GitHub: `https://github.com/YOUR-USERNAME/horror-hounds`
2. Click the **`images/events`** folder
3. Click **"Add file"** > **"Upload files"** (top right)
4. Drag your flyer image in, or click "choose your files"
5. **Name your file something simple** like `e100.jpg` or `halloween-2026.jpg` (no spaces — use dashes)
6. Click the green **"Commit changes"** button at the bottom

### Step 2: Add the Event to events.json

1. Go back to the main repository page
2. Click on **`events.json`**
3. Click the **pencil icon** (top right of the file) to edit
4. Find the `"events": [` line and paste a new event object inside the brackets:

```json
    {
      "id": 999,
      "title": "Your Event Title Here",
      "date": "2026-01-15",
      "time": "7:00 PM",
      "venue": "Venue Name",
      "address": "123 Main St, Santa Ana, CA",
      "description": "A short description of the event. Keep it to 1-2 sentences.",
      "attendees": 0,
      "image": "images/events/e100.jpg",
      "category": "Movie Night",
      "status": "upcoming",
      "cancelled": false
    }
```

5. **Edit each field** with your event's info:
   - **id**: Any number unique to this file (just pick one higher than the last event)
   - **title**: The event name
   - **date**: Format MUST be `YYYY-MM-DD` (e.g., `2026-01-15` for January 15, 2026)
   - **time**: The start time (e.g., `7:00 PM`)
   - **venue**: The venue name (e.g., `The Frida Cinema`)
   - **address**: Full street address (e.g., `305 E 4th St, Santa Ana, CA`)
   - **description**: Short blurb about the event
   - **attendees**: Set to 0 for new events, update later if you want
   - **image**: Must match the filename you uploaded in Step 1 (starts with `images/events/`)
   - **category**: One of: `Movie Night`, `Book Club`, `Goth Night`, `Meet & Greet`, `Art/Craft`, `Outdoor/Social`, `Live Show`, `Festival`, `Holiday`
   - **status**: Use `"upcoming"` for future events, `"past"` for completed
   - **cancelled**: Set to `true` if the event is cancelled, otherwise `false`

6. Click the green **"Commit changes"** button

### Step 3: Wait ~1 Minute

GitHub Pages takes about 30-60 seconds to update. Refresh the website and your new event should appear in the **"Upcoming Events"** section!

---

## After the Event Happens

Once an event has passed, you can optionally:

1. Open `event-manager.html` (or edit `events.json` directly)
2. Find your event and click **Archive** (or change `"status"` to `"past"`)
3. Update the `"attendees"` count if you want

(The website will also automatically move events to "Past" if their date has passed, even if you forget to update the status.)

---

## Where the data lives

**Every event — upcoming and past — lives in a single file: `events.json`** at the root of the repo. The Event Manager loads that file, lets you edit it, and writes it back. The website reads the exact same file.

The old `js/events-data.js` archive has been retired to `backup/events-data.js.bak` and is no longer used by the site.

---

## Common Mistakes to Avoid

- **Missing comma**: Make sure there's a comma after the `}` of your event (before the next event). The LAST event in the file should NOT have a trailing comma.
- **Wrong date format**: Use `YYYY-MM-DD`, not `MM/DD/YYYY`
- **Wrong image path**: Make sure it starts with `images/events/` and matches your filename exactly (case-sensitive)
- **Forgetting quotes**: Every text value needs to be in double quotes. Numbers (`attendees`, `id`) and booleans (`true`/`false`) do NOT get quotes.

---

## Need Help?

If something breaks, don't panic! GitHub keeps a history of every change. Click the "History" button on events.json to see past versions and revert if needed.

Questions? Ask in the Discord!
