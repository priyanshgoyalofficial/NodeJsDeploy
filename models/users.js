const mongoose = require('mongoose'); // import sabse upar hona chahiye
const { Schema } = mongoose;

const userSchema = new Schema({
    username: String,
    password: String
});

module.exports = mongoose.model('users',userSchema); // to use the schema we have to associate it with a name which then it is called a model