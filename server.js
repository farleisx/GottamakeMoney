const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '../frontend')));

// Simple user storage
const usersFile = path.join(__dirname, 'users.json');

// Sign Up
app.post('/signup', (req, res) => {
  const { email, password } = req.body;
  let users = [];
  if (fs.existsSync(usersFile)) {
    users = JSON.parse(fs.readFileSync(usersFile));
  }
  if (users.find(u => u.email === email)) {
    return res.status(400).json({ message: 'User already exists' });
  }
  users.push({ email, password });
  fs.writeFileSync(usersFile, JSON.stringify(users, null, 2));
  res.json({ message: 'Signup successful' });
});

// Sign In
app.post('/signin', (req, res) => {
  const { email, password } = req.body;
  if (!fs.existsSync(usersFile)) return res.status(400).json({ message: 'No users yet' });
  const users = JSON.parse(fs.readFileSync(usersFile));
  const user = users.find(u => u.email === email && u.password === password);
  if (!user) return res.status(401).json({ message: 'Invalid credentials' });
  res.json({ message: 'Signin successful' });
});

// AI generation endpoint (Google Gemini API scaffold)
app.post('/generate', (req, res) => {
  const { prompt } = req.body;
  // TODO: Replace with actual Google Gemini API integration using your API key
  const fakeResponse = `Generated website code for prompt: "${prompt}"`;
  res.json({ result: fakeResponse });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
