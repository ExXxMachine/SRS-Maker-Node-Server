const express = require('express')
const { body } = require('express-validator')
const ProjectController = require('../controllers/projectController')

const router = express.Router()

router.post(
	'/create',
	[
		body('userId').isMongoId().withMessage('Некорректный ID пользователя'),
		body('name')
			.isString()
			.notEmpty()
			.withMessage('Имя проекта не может быть пустым'),
		body('data').isArray().withMessage('Данные проекта должны быть массивом'),
	],
	ProjectController.createProject
)


router.get('/user/:userId', ProjectController.getProjectsByUserId);
router.get('/:id', ProjectController.getProjectById);
router.delete('/:id', ProjectController.deleteProjectById);
router.put('/:id', ProjectController.updateProjectById);





module.exports = router
