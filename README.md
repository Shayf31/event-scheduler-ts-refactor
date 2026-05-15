# Personal Diary App

A React + Vite diary application that allows users to create, view, and store personal diary entries using localStorage.

---

# Deployment

Render URL:

---

# Functional Requirements

- [x] FR001 — Public GitHub Repository  
      Store all code in a single public repo; do not add instructors as collaborators.

- [x] FR002 — Incremental Development with PRs  
      Merge every change into main via Pull Requests.

- [x] FR003 — React + Vite Setup  
      Scaffold the app with Vite and use React as the UI framework.

- [x] FR004 — TailwindCSS via npm  
      Install Tailwind through npm and configure it with Vite.

- [ ] FR005 — State & Effects Management  
      Use React hooks (`useState`, `useEffect`, etc.) appropriately for UI state and side-effects.

- [ ] FR006 — Add Entry Button  
      Provide an “Add Entry” button that opens an entry-creation modal. Control showing/hiding the modal with state.

- [ ] FR007 — Add Entry Form Fields  
      Form must collect:
- Title
- Date
- Image URL
- Content

- [ ] FR008 — LocalStorage Persistence  
      Store diary entries as an array in localStorage.

- [ ] FR009 — One-Entry-Per-Day Check  
      If an entry already exists for the selected day, prompt the user to come back the next day.

- [ ] FR010 — Form Validation  
      Block submission unless all fields are populated.

- [ ] FR011 — Homepage List  
      Display diary entries sorted newest-first.

- [ ] FR012 — Load Entries on Startup  
      Read and render stored entries when the app first mounts.

- [ ] FR013 — Card Layout  
      Show each entry as a card with:
- Preview image
- Date
- Title

- [ ] FR014 — Entry Detail Modal  
      Clicking a card opens a modal showing:
- Title
- Date
- Image
- Content

Control showing/hiding the preview modal with state.

- [ ] FR015 — Static-Site Deployment to Render  
      Build the app with Vite and deploy the static assets on Render.

---

# Main User Journey

1. User opens the application
2. Existing diary entries load from localStorage
3. User clicks “Add Entry”
4. Entry modal opens
5. User fills out:
   - Title
   - Date
   - Image URL
   - Content
6. Form validation checks all fields
7. Entry saves to localStorage
8. Homepage updates with newest diary entry first
9. User clicks an entry card
10. Full diary entry opens in a modal

---
