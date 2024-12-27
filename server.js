const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const authRouter = require('./routes/authRouter')
const Router = require('./Router')
const projectRoutes = require('./routes/projectRoutes')
const PORT = process.env.PORT || 5000

const app = express()

app.use(cors())
app.use(express.json())
app.use('/auth', authRouter)
app.use('/', Router)

const start = async () => {
	try {
		await mongoose.connect(
			`mongodb+srv://ExXx_Machine:safarisru@cluster0.onqmbqc.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`
		)
		app.listen(PORT, () => console.log(`server started on PORT ${PORT}`))
	} catch (e) {
		console.log(e)
	}
}

app.use('/api/projects', projectRoutes)

start()
