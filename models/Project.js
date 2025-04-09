const mongoose = require('mongoose')

const fieldSchema = new mongoose.Schema({
	fieldId: { type: Number, required: true },
	fieldName: { type: String, required: true },
	fieldValue: { type: String },
})

const chapterSchema = new mongoose.Schema({
	chapterId: { type: Number, required: true },
	chapterName: { type: String, required: true },
	fields: [fieldSchema],
})

const projectSchema = new mongoose.Schema({
	userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
	name: { type: String, required: true },
	data: [chapterSchema],
	createdAt: { type: Date, default: Date.now },
})

module.exports = mongoose.model('Project', projectSchema)
	