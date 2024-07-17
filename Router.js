const Router = require('express')
const router = new Router()

// router.get('/index.html', function (req, res) {
// 	res.sendfile('public/index.html')
// })
router.get('/', function (req, res) {
	res.sendfile('../client/public/index.html')
})
// router.get('/src/style/mainPage.css', function (req, res) {
// 	res.sendfile('src/style/mainPage.css')
// })
// router.get('/src/style/style.css', function (req, res) {
// 	res.sendfile('src/style/style.css')
// })
// router.get('/src/style/rest.css', function (req, res) {
// 	res.sendfile('src/style/rest.css')
// })
// router.get('/src/style/fonts/GilroyFont.css', function (req, res) {
// 	res.sendfile('src/style/fonts/GilroyFont.css')
// })
// router.get('/src/components/Header/Header.html', function (req, res) {
// 	res.sendfile('src/components/Header/Header.html')
// })
// router.get('/src/style/fonts/Gilroy-Bold.woff', function (req, res) {
// 	res.sendfile('src/style/fonts/Gilroy-Bold.woff')
// })
// router.get('/src/components/Header/Header.module.css', function (req, res) {
// 	res.sendfile('src/components/Header/Header.module.css')
// })
// router.get('/src/components/Footer/Footer.html', function (req, res) {
// 	res.sendfile('src/components/Footer/Footer.html')
// })
// router.get('/src/scripts/Header.js', function (req, res) {
// 	res.sendfile('src/scripts/Header.js')
// })
// router.get('/src/images/logo-desk.png', function (req, res) {
// 	res.sendfile('src/images/logo-desk.png')
// })
// router.get('/src/images/GitHub.png', function (req, res) {
// 	res.sendfile('src/images/GitHub.png')
// })
// router.get('/src/images/favicon.ico', function (req, res) {
// 	res.sendfile('src/images/favicon.ico')
// })
// router.get('/src/components/Footer/Footer.module.css', function (req, res) {
// 	res.sendfile('src/components/Footer/Footer.module.css')
// })

// router.get('/login.html', function (req, res) {
// 	res.sendfile('src/pages/login.html')
// })
// router.get('/src/style/login.css', function (req, res) {
// 	res.sendfile('src/style/login.css')
// })
// router.get('/src/images/login_ico.png', function (req, res) {
// 	res.sendfile('src/images/login_ico.png')
// })
// router.get('/src/images/password_ico.png', function (req, res) {
// 	res.sendfile('src/images/password_ico.png')
// })
// router.get('/src/scripts/authorization.js', function (req, res) {
// 	res.sendfile('src/scripts/authorization.js')
// })
// router.get('/src/images/password_ico.png', function (req, res) {
// 	res.sendfile('src/images/password_ico.png')
// })

// router.get('/src/images/login_ico.png', function (req, res) {
// 	res.sendfile('src/images/login_ico.png')
// })

// router.get('/Singin.html', function (req, res) {
// 	res.sendfile('src/pages/Singin.html')
// })
// router.get('/src/scripts/registration.js', function (req, res) {
// 	res.sendfile('src/scripts/registration.js')
// })

// router.get('/SelectProject.html', function (req, res) {
// 	res.sendfile('src/pages/SelectProject.html')
// })
// router.get('/src/style/selectProject.css', function (req, res) {
// 	res.sendfile('src/style/selectProject.css')
// })

// router.get('/Project.html', function (req, res) {
// 	res.sendfile('src/pages/Project.html')
// })

// router.get('/src/style/project.css', function (req, res) {
// 	res.sendfile('src/style/project.css')
// })
// router.get('/images/download_ico.png', function (req, res) {
// 	res.sendfile('src/images/download_ico.png')
// })
module.exports = router
