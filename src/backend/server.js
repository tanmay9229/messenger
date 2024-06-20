const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2');

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'messenger_db'
});

db.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
    return;
  }
  console.log('Connected to MySQL');
});

const app = express();
const port = 3000;


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));



const createUsersTable = `
    CREATE TABLE IF NOT EXISTS users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        username VARCHAR(255) NOT NULL UNIQUE,
        password VARCHAR(255) NOT NULL
    )
`;
db.query(createUsersTable, (err, result) => {
    if (err) throw err;
    console.log('Users table created or already exists');
});

const createAccountsTable = `
    CREATE TABLE IF NOT EXISTS accounts (
        id INT AUTO_INCREMENT PRIMARY KEY,
        user_id INT,
        mobile_number VARCHAR(15) NOT NULL,
        date_added DATETIME,
        status VARCHAR(50),
        FOREIGN KEY (user_id) REFERENCES users(id)
    )
`;
db.query(createAccountsTable, (err, result) => {
    if (err) throw err;
    console.log('Accounts table created or already exists');
});

const createMessagesTable = `
    CREATE TABLE IF NOT EXISTS messages (
        id INT AUTO_INCREMENT PRIMARY KEY,
        account_id INT,
        message TEXT,
        recipient_numbers TEXT,
        date_sent DATETIME,
        FOREIGN KEY (account_id) REFERENCES accounts(id)
    )
`;
db.query(createMessagesTable, (err, result) => {
    if (err) throw err;
    console.log('Messages table created or already exists');
});

const createResponsesTable = `
    CREATE TABLE IF NOT EXISTS responses (
        id INT AUTO_INCREMENT PRIMARY KEY,
        message_id INT,
        response_message TEXT,
        date_received DATETIME,
        FOREIGN KEY (message_id) REFERENCES messages(id)
    )
`;
db.query(createResponsesTable, (err, result) => {
    if (err) throw err;
    console.log('Responses table created or already exists');
});




app.post('/register', (req, res) => {
  const { username, password } = req.body;

 
  const insertUserQuery = 'INSERT INTO users (username, password) VALUES (?, ?)';
  db.query(insertUserQuery, [username, password], (err, result) => {
    if (err) {
      console.error('Error registering user:', err);
      res.status(500).send('Registration failed');
      return;
    }
    console.log('User registered successfully');
    res.status(200).send('Registration successful');
  });
});


app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
