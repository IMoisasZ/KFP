import Sequelize from 'sequelize'
import dotenv from 'dotenv'
dotenv.config()

const { DB_NAME, DB_USER, DB_PASSWORD } = process.env

console.log(DB_NAME)

const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
	host: 'localhost',
	dialect: 'mysql',
	define: {
		timestamps: true,
	},
})

export default sequelize