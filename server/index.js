const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const cors = require('cors');

const app = express();
const PORT = 3000;

app.use(cors()); // Enable CORS for all routes
app.use(bodyParser.json());

app.post('/register', (req, res) => {
  const { username, password } = req.body;

  // Store credentials in a local file (JSON format)
  const user = { username, password };
  fs.appendFile('database.json', JSON.stringify(user) + '\n', (err) => {
    if (err) {
      console.error(err);
      res.status(500).json({ message: 'Error occurred while registering user.' });
    } else {
      res.json({ message: 'User registered successfully!' });
    }
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
