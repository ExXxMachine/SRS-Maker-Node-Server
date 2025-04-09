const Project = require('../models/Project')
const { validationResult } = require('express-validator')

class ProjectController {
	async createProject(req, res) {
		try {
			const errors = validationResult(req)
			if (!errors.isEmpty()) {
				console.error(errors.array()) // Логирование ошибок валидации
				return res.status(400).json({
					success: false,
					message: 'Ошибка валидации',
					errors,
				})
			}

			const { userId, name, data } = req.body

			if (!userId || !name || !Array.isArray(data)) {
				console.error(`Некорректные данные: ${JSON.stringify(req.body)}`)
				return res.status(400).json({
					success: false,
					message: 'Некорректные данные для создания проекта',
				})
			}

			const project = new Project({ userId, name, data })

			await project.save()

			return res.json({
				success: true,
				message: 'Проект успешно создан',
				project,
			})
		} catch (e) {
			console.error(e) // Логирование ошибки сервера
			res.status(500).json({
				success: false,
				message: 'Ошибка при создании проекта',
			})
		}
	}

	async getProjectsByUserId(req, res) {
		try {
			const { userId } = req.params

			const projects = await Project.find({ userId }, 'name createdAt')

			if (!projects.length) {
				return res
					.status(404)
					.json({ success: false, message: 'Проекты не найдены' })
			}

			return res.json({
				success: true,
				projects,
			})
		} catch (e) {
			console.error(e)
			res
				.status(500)
				.json({ success: false, message: 'Ошибка при получении проектов' })
		}
	}

	async getProjectById(req, res) {
		try {
			const { id } = req.params

			const project = await Project.findById(id)

			if (!project) {
				return res
					.status(404)
					.json({ success: false, message: 'Проект не найден' })
			}

			return res.json({
				success: true,
				project,
			})
		} catch (e) {
			console.error(e)
			res
				.status(500)
				.json({ success: false, message: 'Ошибка при получении проекта' })
		}
	}

	async deleteProjectById(req, res) {
		try {
			const { id } = req.params

			const deletedProject = await Project.findByIdAndDelete(id)

			if (!deletedProject) {
				return res
					.status(404)
					.json({ success: false, message: 'Проект не найден' })
			}

			return res.json({
				success: true,
				message: 'Проект успешно удален',
				project: deletedProject,
			})
		} catch (e) {
			console.error(e)
			res
				.status(500)
				.json({ success: false, message: 'Ошибка при удалении проекта' })
		}
	}

	async updateProjectById(req, res) {
		try {
			const { id } = req.params
			const { name, data } = req.body

			const project = await Project.findById(id)
			if (!project) {
				return res
					.status(404)
					.json({ success: false, message: 'Проект не найден' })
			}

			if (name) {
				project.name = name
			}
			if (data) {
				project.data = data
			}

			await project.save()

			return res.json({
				success: true,
				message: 'Проект успешно обновлен',
				project,
			})
		} catch (e) {
			console.error(e)
			res
				.status(500)
				.json({ success: false, message: 'Ошибка при обновлении проекта' })
		}
	}
}

module.exports = new ProjectController()
