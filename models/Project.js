const mongoose = require('mongoose')

const projectSchema = new mongoose.Schema({
	userId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User',
		required: true,
	},
	name: {
		type: String,
		required: true,
	},
	createdAt: {
		type: Date,
		default: Date.now,
	},
	data: [
		{
			fieldName: {
				type: String,
				required: true,
			},
			fieldValue: {
				type: String,
				required: true,
			},
		},
	],
})

module.exports = mongoose.model('Project', projectSchema)
