import Sequelize from 'sequelize'
import DbConnection from '../connection/db.connection.js'
import ProductModel from './product.model.js'

const StockActual = DbConnection.define('stock_actual',{
    id:{
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    product_id: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    actual_stock: {
        type: Sequelize.DECIMAL,
        allowNull: false,
    },
    average_cost: {
        type: Sequelize.DECIMAL,
        allowNull: false,
    }
},{tableName: 'stock_actual'})

StockActual.belongsTo(ProductModel, {foreignKey: 'product_id'})

export default StockActual