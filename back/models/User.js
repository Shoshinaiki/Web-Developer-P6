const mongoose = require ("mongoose"); // importer mongoose

const uniqueValidator = require('mongoose-unique-validator'); // sécurité pour ne pas enregistrer 2 fois la même adreese e-mail 

const userSchema = mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }
});

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model("user", userSchema);