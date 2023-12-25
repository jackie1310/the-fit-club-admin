const { Schema, model, models, default: mongoose } = require("mongoose");

const userSchema = new Schema({
    name: String,
    email: String,
    password: String,
    basic: {type: Boolean, default: false},
    premium: {type: Boolean, default: false},
    pro: {type: Boolean, default: false}
}, {timestamps: true});

const User = models.User || model('User', userSchema);

export default User;