## Drive Clone (React + Vite)

A lightweight Google Drive–style web client built with React 19, Vite 7, and Tailwind CSS 4. It supports authenticated file and folder management, list/grid layouts, and theme toggling, backed by a REST API.

### Features

- Email/OTP auth plus Google OAuth (via `@react-oauth/google`).
  - OTP-based signup verification with resend flow.
  - Google one-tap style login and logout with session-aware checks (`/auth/me`).
  - Cookie-based sessions preserved across refreshes.
- Browse folders and files with switchable list/grid views that persist per device.
  - Mobile defaults to list; desktop defaults to grid; last choice is remembered via local storage.
  - Quick toggle in the toolbar to flip between layouts without page reloads.
  - Context-menu aware in both views for consistent actions.
- Upload flows with initiate/complete steps and file previews.
  - Drag-and-drop upload with React Dropzone plus progress feedback.
  - Initiate/complete API sequence for server-side validation and storage handoff.
  - Inline previews for supported file types before opening in a new tab.
- Rename, move to trash, restore, and permanent delete for files/folders.
  - Soft-delete moves items to trash while keeping structure intact.
  - Restore brings items back to their original location.
  - Permanent delete from trash for final cleanup.
- Starred items view and trash view, each with context menus.
  - Dedicated routes for starred (`/drive/starred`) and trash (`/drive/trash`).
  - Star/unstar, restore, and delete actions exposed via right-click menus.
  - Consistent cards/rows whether in grid or list mode.
- Light/dark theme toggle persisted via local storage.
  - Document-level theme class for instant switch without flashes.
  - Toggle lives in the header avatar menu for easy access.
- Toast notifications for feedback and optimistic-feeling interactions.
  - Success/error toasts on CRUD, uploads, and navigation-sensitive actions.
  - Themed to match light/dark modes for readability.

### Tech Stack

- React 19 with React Router 7
- Vite 7 + Tailwind CSS 4
- Axios for API calls, Zod for client-side validation
- Framer Motion for micro animations, React Hot Toast for notifications

### Prerequisites

- Node.js 18+ (recommended: latest LTS)
- npm (bundled with Node)

### Environment Variables

Create a `.env` file at the project root (same level as `package.json`).

```bash
VITE_API_BASE_URL=https://your-api.example.com
VITE_GOOGLE_CLIENT_ID=your-google-oauth-client-id
```

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

The dev server defaults to port 5175 (see `package.json`).

### Production Build

```bash
npm run build
npm run preview   # serve the built assets locally
```

### Project Structure (key parts)

- `src/main.jsx` — App bootstrap with providers (Google OAuth, Router, Theme, Drive).
- `src/App.jsx` — Route definitions and global theme application.
- `src/pages/*` — Top-level screens: drive, starred, trash, auth, OTP verification.
- `src/components/*` — UI building blocks (toolbar, header, layout, context menus, file/folder cards, preview, upload, sidebar).
- `src/services/*` — Validated service layer wrapping `src/api/*` calls.
- `src/contexts/*` — Theme and drive view state persisted via local storage.
- `src/utils/*` — Helpers for formatting, async handling, and string operations.
- `src/validators/*` — Zod schemas for client-side validation.

### API Expectations

- All API calls use `VITE_API_BASE_URL` as the base URL and send credentials (`withCredentials: true`).
- Auth endpoints: `/auth/register`, `/auth/verify-email`, `/auth/login`, `/auth/login/google`, `/auth/logout`, `/auth/me`.
- File endpoints cover initiate/complete upload, get, update (rename/star), delete, and restore from trash.
- Folder endpoints cover listing contents, create, update (rename/star), delete, and restore.

### Notes

- The UI defaults to grid view on desktop and list view on mobile, remembering the last choice per browser.
- Context menus expose item-specific actions (rename, move to trash, restore, delete).
- Tailwind 4 runs via the Vite plugin, no separate PostCSS config needed.

### Running with a Backend

Point `VITE_API_BASE_URL` to a compatible Drive API that supports folders, files, starred items, and trash with cookie-based sessions. Ensure CORS allows the Vite dev origin (default `http://localhost:5175`) and includes credentials.

### Troubleshooting

- Double-check the Google OAuth client ID and that OAuth origins include your dev URL.
- If requests fail with 401, confirm cookies are set; the API must send the proper CORS headers with `Access-Control-Allow-Credentials`.
- For Tailwind class ordering, run `npm run format` to apply Prettier with the Tailwind plugin.
