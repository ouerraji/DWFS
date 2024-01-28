const mongoose = require('mongoose');

const folderSchema = new mongoose.Schema({
  name: { type: String, required: true },
  documents: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'DocumentModel'
    }
  ]
});

module.exports = mongoose.model('FolderModel', folderSchema);
