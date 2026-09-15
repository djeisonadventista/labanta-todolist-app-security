/*const express = require('express');
const argon2 = require('argon2');
const pool = require('../db');

const router = express.Router();

// GET /register - Render the registration page
router.get('/register', (req, res) => {
  res.render('register', {
    error: null,
    username: null
  });
});

// POST /register - Registo seguro
router.post('/register', async (req, res) => {
  const { username, password } = req.body;

  // Validação básica
  if (!username || !password) {
    return res.render('register', {
      error: 'Username e password são obrigatórios.',
      username: username || null
    });
  }

  if (password.length < 8) {
    return res.render('register', {
      error: 'A password deve ter pelo menos 8 caracteres.',
      username
    });
  }

  try {
    // Gerar hash seguro usando Argon2id
    const passwordHash = await argon2.hash(password, {
      type: argon2.argon2id
    });

    // Query parametrizada - proteção contra SQL Injection
    const query = `
      INSERT INTO users (username, password_hash)
      VALUES ($1, $2)
    `;

    await pool.query(query, [username, passwordHash]);

    res.redirect('/login');

  } catch (err) {
    console.error('Erro no registo:', err);

    res.render('register', {
      error: 'Utilizador já existe ou dados inválidos.',
      username: null
    });
  }
});

// GET /login
router.get('/login', (req, res) => {
  res.render('login', {
    error: null,
    username: null
  });
});

// POST /login - Login seguro
router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.render('login', {
      error: 'Username e password são obrigatórios.',
      username: username || null
    });
  }

  try {
    // Procurar o utilizador através de query parametrizada
    const query = `
      SELECT *
      FROM users
      WHERE username = $1
    `;

    const result = await pool.query(query, [username]);

    const user = result.rows[0];

    if (!user) {
      return res.render('login', {
        error: 'Credenciais inválidas.',
        username: null
      });
    }

    // Verificar a password através do Argon2
    const passwordValida = await argon2.verify(
      user.password_hash,
      password
    );

    if (!passwordValida) {
      return res.render('login', {
        error: 'Credenciais inválidas.',
        username: null
      });
    }

    // Login efetuado com sucesso
    req.session.userId = user.id;
    req.session.username = user.username;

    res.redirect(`/tasks?userId=${user.id}`);

  } catch (err) {
    console.error('Erro no login:', err);

    return res.render('login', {
      error: 'Ocorreu um erro ao efetuar o login.',
      username: null
    });
  }
});

// POST /logout
router.post('/logout', (req, res) => {
  req.session.destroy(() => {
    res.redirect('/login');
  });
});

module.exports = router;
*/