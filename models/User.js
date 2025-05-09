const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
	username: { type: String, unique: true, required: true },
	password: { type: String, required: true },
	roles: [{ type: String, ref: 'Role' }],
	accessToken: { type: String }, 
})

module.exports = mongoose.model('User', UserSchema)



