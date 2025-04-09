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
				// Возвращаем все ошибки валидации
				return res.status(400).json({
					success: false,
					message: 'Ошибка при регистрации',
					errors: errors.array(),
				})
			}

			const { username, password } = req.body

			// Проверка длины имени пользователя
			if (username.length < 3 || username.length > 20) {
				return res.status(400).json({
					success: false,
					message: 'Имя пользователя должно быть от 3 до 20 символов',
				})
			}

			// Проверка сложности пароля (например, наличие цифр и букв)
			const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/
			if (!passwordRegex.test(password)) {
				return res.status(400).json({
					success: false,
					message:
						'Пароль минимум 8 символов, включая буквы и цифры',
				})
			}

			const candidate = await User.findOne({ username })
			if (candidate) {
				return res.status(400).json({
					success: false,
					message: 'Пользователь с таким именем уже существует',
				})
			}

			const hashPassword = bcrypt.hashSync(password, 7)
			const userRole = await Role.findOne({ value: 'USER' })

			const newUser = new User({
				username,
				password: hashPassword,
				roles: [userRole.value],
				accessToken: generateAccessToken(Date.now(), [userRole.value]), 
			})

			await newUser.save()

			return res.json({
				success: true,
				message: 'Пользователь успешно зарегистрирован',
				token: newUser.accessToken,
				userId: newUser._id,
			})
		} catch (e) {
			console.log(e)
			res.status(500).json({ success: false, message: 'Ошибка сервера' })
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

			user.accessToken = token
			await user.save()

			return res.json({
				success: true,
				token,
				userId: user._id,
				message: 'Авторизация прошла успешно',
			})
		} catch (e) {
			console.log(e)
			res.status(400).json({ message: 'Login error' })
		}
	}
	async getUserByToken(req, res) {
		try {
			// Получение токена из заголовка Authorization
			const token = req.headers.authorization?.split(' ')[1]

			if (!token) {
				return res.status(401).json({ message: 'Токен не предоставлен' })
			}

			// Расшифровка токена
			const decodedData = jwt.verify(token, secret)

			// Поиск пользователя по ID из токена
			const user = await User.findById(decodedData.id)

			if (!user || user.accessToken !== token) {
				return res
					.status(401)
					.json({ message: 'Неверный токен или пользователь не найден' })
			}

			// Возвращаем данные пользователя
			return res.json({
				success: true,
				user: {
					id: user._id,
					username: user.username,
					roles: user.roles,
				},
			})
		} catch (e) {
			console.log(e)
			return res.status(401).json({ message: 'Ошибка при проверке токена' })
		}
	}
}

module.exports = new authController()
