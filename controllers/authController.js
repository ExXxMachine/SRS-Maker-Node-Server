const User = require('../models/User')
const Role = require('../models/Role')
const bcrypt = require('bcryptjs')
const { validationResult } = require('express-validator')
const jwt = require('jsonwebtoken')
const { secret } = require('../config')

const generateAccessToken = (id, roles) => {
	const payload = {
		id,
		roles,
	}
	return jwt.sign(payload, secret, { expiresIn: '24h' })
}
class authController {
	async registration(req, res) {
		try {
			const errors = validationResult(req)
			if (!errors.isEmpty()) {
				return res
					.status(400)
					.json({ success: false, message: 'Ошибка при регистрации', errors })
			}
			const { username, password } = req.body
			const candidate = await User.findOne({ username })
			if (candidate) {
				return res.status(400).json({
					success: false,
					message: 'Пользователь с таким именем уже существует',
				})
			}
			const hashPassword = bcrypt.hashSync(password, 7)
			const userRole = await Role.findOne({ value: 'USER' })
			const user = new User({
				username,
				password: hashPassword,
				roles: [userRole.value],
			})
			await user.save()
			return res.json({
				success: true,
				message: 'Пользователь успешно зарегистрирован',
			})
		} catch (e) {
			console.log(e)
			res.status(400).json({ success: false, message: 'Registration error' })
		}
	}

	async login(req, res) {
		try {
			const { username, password } = req.body
			const user = await User.findOne({ username })

			if (!user) {
				return res
					.status(400)
					.json({ message: 'Введен неверный логин или пароль' })
			}

			const validationPassword = bcrypt.compareSync(password, user.password)
			if (!validationPassword) {
				return res
					.status(400)
					.json({ message: 'Введен неверный логин или пароль' })
			}

			const token = generateAccessToken(user._id, user.roles)

			return res.json({
				success: true,
				token,
				userId: user._id,
			})
		} catch (e) {
			console.log(e)
			res.status(400).json({ message: 'Login error' })
		}
	}

	async getUsers(req, res) {
		try {
			const users = await User.find()
			res.json(users)
		} catch (e) {}
	}
}

module.exports = new authController()
