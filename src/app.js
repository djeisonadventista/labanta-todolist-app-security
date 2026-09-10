const express = require('express');
const session = require('express-session');
require('dotenv').config();

const authRoutes = require('./routes/auth');
//const authRoutes = require('./routes/auth.vulnerable.backup');
const taskRoutes = require('./routes/tasks');
const apiRoutes = require('./routes/api');

const app = express();

// Static files
app.use(express.static('public'));

// EJS
app.set('view engine', 'ejs');
app.set('views', 'views');

// Body parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// ============================================================
// SESSION
// ============================================================

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
        httpOnly: true,
        sameSite: 'lax'
    }
}));

// ============================================================
// ROUTES
// ============================================================

app.get('/', (req, res) => {
    res.redirect('/tasks');
});

app.get('/session-debug', (req, res) => {
    res.json(req.session);
});

app.get('/debug-session', (req, res) => {
    res.json(req.session);
});

app.use(authRoutes);
app.use(taskRoutes);
app.use(apiRoutes);

// ============================================================
// SERVER
// ============================================================

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`TodoList app a correr em http://localhost:${PORT}`);
});