const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const cors = require('cors');

const app = express();
const PORT = 3000;

app.use(cors()); // Enable CORS for all routes
app.use(bodyParser.json());

app.post('/register', (req, res) => {
  const { username, password, score } = req.body;

  // Read the existing user data from the file
  fs.readFile('database.json', 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: 'Error occurred while registering user.' });
    }

    let users = [];
    try {
      users = JSON.parse(data);
    } catch (err) {
      console.error(err);
      return res.status(500).json({ message: 'Error occurred while parsing user data.' });
    }

    const newUserId = users.length + 1;

    const newUser = { id: newUserId, username, password, score };

    users.push(newUser);

    fs.writeFile('database.json', JSON.stringify(users, null, 2), (err) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ message: 'Error occurred while registering user.' });
      }

      res.json({ message: 'User registered successfully!', user: newUser });
    });
  });
});

app.post('/login', (req, res) => {
  const { username, password } = req.body;

  fs.readFile('database.json', 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: 'Error occurred while logging in.' });
    }

    let users = [];
    try {
      users = JSON.parse(data);
    } catch (err) {
      console.error(err);
      return res.status(500).json({ message: 'Error occurred while parsing user data.' });
    }

    const foundUser = users.find((user) => user.username === username && user.password === password);

    if (foundUser) {
      res.json({ message: 'Login successful!', user: foundUser });
    } else {
      res.status(401).json({ message: 'Invalid username or password.' });
    }
  });
});


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
