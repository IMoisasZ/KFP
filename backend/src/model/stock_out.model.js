import Sequelize from 'Sequelize'
import DbConnection from '../connection/db.connection.js'
import ProductModel from './product.model.js'
import TechnicianModel from './technician.model.js'

const StockOut = DbConnection.define(
  'stock_out',
  {
    stock_out_id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    date: {
      type: Sequelize.DATE,
      allowNull: false,
    },
    os: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    product_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    technician_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    quantity: {
      type: Sequelize.DECIMAL,
      allowNull: false,
    },
  },
  { tableName: 'stock_out' }
)

StockOut.belongsTo(ProductModel, { foreignKey: 'product_id' })
StockOut.belongsTo(TechnicianModel, { foreignKey: 'technician_id' })

export default StockOut
