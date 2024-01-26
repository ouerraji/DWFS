const mongoose = require('mongoose');

const documentSchema = new mongoose.Schema({
    chemin: { type: String, required: true },
    nom: { type: String, required: true },
    type: { type: String, required: true },
    extension: { type: String, required: true },
    taille: { type: Number, required: true },
    proprietaire: { type: String, required: true },
});
module.exports = mongoose.model("DocumentModel", documentSchema);
