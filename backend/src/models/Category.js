const { DataTypes } = require('sequelize');
const sequelize = require('../db'); // 동일한 sequelize 인스턴스 가져오기

const Category = sequelize.define('Category', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    category_name: {
        type: DataTypes.STRING(20),
        allowNull: false,
    },
}, {
    tableName: 'Category',
    timestamps: false,
});

module.exports = Category;