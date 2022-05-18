import express from 'express'
import cors from 'cors'
import winston from 'winston'
import UnityRoute from './src/route/unity.route.js'
import ProductRoute from './src/route/product.route.js'
import ClientSupplierRoute from './src/route/client_supplier.route.js'

const app = express()

app.use(express.json())
app.use(cors())

// routes
app.use('/unity', UnityRoute)
app.use('/product', ProductRoute)
app.use('/client_supplier', ClientSupplierRoute)

// winston(log)
const { combine, timestamp, label, printf } = winston.format
const myformat = printf(({ level, message, label, timestamp }) => {
	return `${timestamp} [${label}] ${level} ${message}`
})
global.logger = winston.createLogger({
	level: 'silly',
	transports: [
		new winston.transports.Console(),
		new winston.transports.File({ filename: 'kfp_system' }),
	],
	format: combine(label({ label: 'kfp_system' }), timestamp(), myformat),
})

// erro padrão
app.use((err, req, res, next) => {
	global.logger.error(`${req.method} ${req.baseUrl} - ${err.message}`)
	res.status(400).send({ erros: err.message })
})

export default app
