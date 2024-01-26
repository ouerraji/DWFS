// Example backend code using Node.js, Express, and Mongoose

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const UserModel = require('./models/user'); // Import your Mongoose user model
const DocumentModel=require('./models/document')


const app = express();
const PORT = 3000;
const cors = require('cors');
app.use(cors());
mongoose.connect('mongodb://localhost:27017/angular-app-db', { useNewUrlParser: true, useUnifiedTopology: true });

app.use(bodyParser.json());

// Test connection route
app.get('/', (req, res) => {
  res.send('Welcome to the server!');
});


// Handle registration
app.post('/register', async (req, res) => {
  try {
    console.log('Received registration data:', req.body);

    const newUser = new UserModel(req.body);
    const savedUser = await newUser.save();

    console.log('User saved to the database:', savedUser);

    res.status(201).json({ message: 'User registered successfully', user: savedUser });
  } catch (error) {
    console.error('Registration failed:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


app.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;

    // Find the user by username and password
    const user = await UserModel.findOne({ username, password });

    if (user) {
      
      // Login successful
      res.status(200).json({ message: 'Login successful', user });
    } else {
      // Login failed
      res.status(401).json({ error: 'Invalid credentials' });
    }
  } catch (error) {
    console.error('Login failed:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});



app.get('/users', async (req, res) => {
  try {
    // Get the role parameter from the query string, default to 'standard' if not provided
    const role = req.query.role || 'standard';

    // Retrieve users with the specified role from the database
    const users = await UserModel.find({ role });

    res.status(200).json(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});




app.delete('/users/:id', async (req, res) => {
  try {
    const userId = req.params.id;

    // Delete the user from the database
    await UserModel.findByIdAndDelete(userId);

    res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    console.error('User deletion failed:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


// Activate user route
app.put('/users/:id/activate', async (req, res) => {
  try {
    const userId = req.params.id;

    // Update user status to active
    await UserModel.findByIdAndUpdate(userId, { isActive: true });

    res.status(200).json({ message: 'User activated successfully' });
  } catch (error) {
    console.error('User activation failed:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Deactivate user route
app.put('/users/:id/deactivate', async (req, res) => {
  try {
    const userId = req.params.id;

    // Update user status to inactive
    await UserModel.findByIdAndUpdate(userId, { isActive: false });

    res.status(200).json({ message: 'User deactivated successfully' });
    
  } catch (error) {
    console.error('User deactivation failed:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});




// Get all documents route
app.get('/documents', async (req, res) => {
  try {
    const username = req.query.username; // Get the username from the query parameter

    // Filter documents based on the username
    const documents = await DocumentModel.find({ proprietaire: username });

    res.status(200).json(documents);
  } catch (error) {
    console.error('Error fetching documents:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Add new document route
// Handle document creation
app.post('/documents', async (req, res) => {
  try {
    console.log('recieved data:',req.body)
    // Save the document to the database
    const newDocument = new DocumentModel(req.body);
    const savedDocument = await newDocument.save();
    console.log('Document added to database:',req.body)

    res.status(201).json({ message: 'Document added successfully', document: savedDocument });
  } catch (error) {
    console.error('Document addition failed:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


// Modify existing document route
app.put('/documents/:id', async (req, res) => {
  try {
    const updatedDocument = await DocumentModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(updatedDocument);
  } catch (error) {
    console.error('Error modifying document:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Delete document route
app.delete('/documents/:id', async (req, res) => {
  try {
    const deletedDocument = await DocumentModel.findByIdAndDelete(req.params.id);
    res.json(deletedDocument);
  } catch (error) {
    console.error('Error deleting document:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});






app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
