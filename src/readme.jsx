// User visits homepage
// → Home fetches all events
// → User clicks event
// → EventDetails fetches one event

// User registers
// → Register sends POST /api/users
// → redirects to login

// User logs in
// → Login sends POST /api/auth/login
// → saves JWT token in localStorage

// User visits protected page
// → ProtectedLayout checks token
// → if token exists, page shows
// → if no token, redirect to login

// User creates event
// → CreateEvent sends POST /api/events with token
// → backend creates event
// → app redirects home

// npm run seed
// That populated the database with starter events like:
// Oktoberfest
// Berlin Marathon
// Tech Conference
// Summer Festival
































