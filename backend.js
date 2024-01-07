const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const app = express();

app.use(bodyParser.json());
app.use(cors());
const port = process.env.port || 3306;


const dbConfig = {
    host: 'calensmart.cl6km82coqr3.eu-west-2.rds.amazonaws.com',
    user: 'admin',
    password: 'Calensmart123',
    database: 'calensmart',
    port: 3306
};


const db = mysql.createConnection(dbConfig);


db.connect(err => {
    if (err) {
        console.error('Error connecting to the database:', err);
        return;
    }
    console.log('Connected to the database.');
});

app.get('/', (req, res) => {
    res.send('Server is running!');
});

app.post('/api/users', (req, res) => {
    const { email, password } = req.body;
  
    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required fields' });
    }
  
    const insertUserQuery = 'INSERT INTO users (email, password) VALUES (?, ?)';
    const values = [email, password];
  
    db.query(insertUserQuery, values, (err, result) => {
      if (err) {
        console.error('Error creating user:', err);
        return res.status(500).json({ error: 'Internal Server Error' });
      }
  
      console.log('User created successfully');
      res.status(201).json({ message: 'User created successfully' });
    });
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});



app.post('/api/events', (req, res) => {
    const { date, title, description, location, username_email } = req.body;
  

    if (!date || !title || !description || !location || !username_email) {
      return res.status(400).json({ error: 'All fields are required' });
    }
  
    const insertEventQuery = 'INSERT INTO events (date, title, description, location, username_email) VALUES (?, ?, ?, ?, ?)';
    const values = [date, title, description, location || '',username_email];
  
    db.query(insertEventQuery, values, (err, result) => {
      if (err) {
        console.error('Error creating event:', err);
        return res.status(500).json({ error: 'Internal Server Error' });
      }
  
      res.status(201).json({ message: 'Event created successfully' });
    });
  });
  



app.post('/api/login', (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }

    const findUserQuery = 'SELECT * FROM users WHERE email = ?';

    db.query(findUserQuery, [email], (err, users) => {
        if (err) {
            console.error('Error fetching user:', err);
            return res.status(500).json({ error: 'Internal Server Error' });
        }

        if (users.length === 0) {
            return res.status(401).json({ error: 'Invalid email or password' });
        }

        const user = users[0];

        if (password === user.password) {
            res.status(200).json({ message: 'Login successful' });
        } else {
            res.status(401).json({ error: 'Invalid email or password' });
        }
    });
});
