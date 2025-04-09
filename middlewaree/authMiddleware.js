const jwt = require('jsonwebtoken')
const { secret } = require('../config')
const User = require('../models/User')

module.exports = async function (req, res, next) {
	if (req.method === 'OPTIONS') {
		return next()
	}

	try {
		const token = req.headers.authorization.split(' ')[1]
		if (!token) {
			return res.status(403).json({ message: 'Пользователь не авторизован' })
		}

		const decodedData = jwt.verify(token, secret)

		// Проверка токена из базы данных
		const user = await User.findById(decodedData.id)
		if (!user || user.accessToken !== token) {
			return res.status(403).json({ message: 'Неверный токен' })
		}

		req.user = decodedData
		next()
	} catch (e) {
		console.log(e)
		return res.status(403).json({ message: 'Пользователь не авторизован' })
	}
}
