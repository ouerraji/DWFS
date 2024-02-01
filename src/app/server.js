
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const UserModel = require('./models/user'); 
const DocumentModel=require('./models/document')
const FolderModel=require('./models/folder')



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
    console.log(' data:', req.body);

    const newUser = new UserModel(req.body);
    const savedUser = await newUser.save();

    console.log('User enregistrer:', savedUser);

    res.status(201).json({ message: 'User enregistrer en success', user: savedUser });
  } catch (error) {
    console.error('erreur de Registration:', error);
    res.status(500).json({ error: ' Server Error' });
  }
});


app.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await UserModel.findOne({ username, password });

    if (user) {
      
      res.status(200).json({ message: 'Login successful', user });
    } else {
      res.status(401).json({ error: 'Invalid infos' });
    }
  } catch (error) {
    console.error('Login failed:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});



app.get('/users', async (req, res) => {
  try {
    const role = req.query.role || 'standard';

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

    await UserModel.findByIdAndDelete(userId);

    res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    console.error('User deletion failed:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


app.put('/users/:id/activate', async (req, res) => {
  try {
    const userId = req.params.id;

    await UserModel.findByIdAndUpdate(userId, { isActive: true });

    res.status(200).json({ message: 'User activated successfully' });
  } catch (error) {
    console.error('User activation failed:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.put('/users/:id/deactivate', async (req, res) => {
  try {
    const userId = req.params.id;

    await UserModel.findByIdAndUpdate(userId, { isActive: false });

    res.status(200).json({ message: 'User deactivated successfully' });
    
  } catch (error) {
    console.error('User deactivation failed:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});




app.get('/documents/:username', async (req, res) => {
  try {
    const user = req.params.username;
console.log(user)
    const documents = await DocumentModel.find({ proprietaire: user });

    res.status(200).json(documents);
  } catch (error) {
    console.error('Error fetching documents:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


app.post('/documents', async (req, res) => {
  try {
    console.log('recieved data:',req.body)
    const newDocument = new DocumentModel(req.body);
    const savedDocument = await newDocument.save();
    console.log('Document added to database:',req.body)

    res.status(201).json({ message: 'Document added successfully', document: savedDocument });
  } catch (error) {
    console.error('Document addition failed:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


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

app.delete('/documents/:id', async (req, res) => {
  try {
    const deletedDocument = await DocumentModel.findByIdAndDelete(req.params.id);
    res.json(deletedDocument);
  } catch (error) {
    console.error('Error deleting document:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.post('/createfolder', async (req, res) => {
  try {
    console.log('in server creating folder data', req.body);

    const newFolder = new FolderModel(req.body);
    const savedFolder = await newFolder.save();

    console.log('folder saved', savedFolder);

    res.status(201).json({ message: 'folder created successfully', user: savedFolder });
  } catch (error) {
    console.error('creation failed:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('/getfolders/:username', async (req, res) => {
  try {
    const user = req.params.username;
    const folders = await FolderModel.find({proprietaire:user});

    res.status(200).json(folders);
  } catch (error) {
    console.error('Error fetching folders:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});



app.get('/getdocinfolder/:folderId', async (req, res) => {
  try {
    const folderId = req.params.folderId;

    const folder = await FolderModel.findById(folderId).populate('documents');

    if (!folder) {
      return res.status(404).json({ error: 'Folder not found' });
    }

    return res.json(folder.documents);
  } catch (error) {
    console.error('Error retrieving documents in folder:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('/getfolderbyid/:folderId', async (req, res) => {
  try {
    const folderId = req.params.folderId;

    const folder = await FolderModel.findById(folderId);

    if (!folder) {
      return res.status(404).json({ error: 'Folder not found' });
    }

    return res.json(folder);
  } catch (error) {
    console.error('Error retrieving documents in folder:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.post('/folders/:folderId/add-document', async (req, res) => {
  try {
    const { documentId } = req.body;
    const folderId = req.params.folderId;

    const folder = await FolderModel.findByIdAndUpdate(
      folderId,
      { $push: { documents: documentId } },
      { new: true }
    );

    res.json(folder);
  } catch (error) {
    console.error('Error adding document to folder:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});






app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
