const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const Notices = sequelize.define('Notices', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    admin_id: {
        type: DataTypes.STRING(20),
        allowNull: false,
    },
    category_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    title: {
        type: DataTypes.STRING(50),
        allowNull: false,
    },
    content: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    url: {
        type: DataTypes.STRING(100),
        allowNull: true,
    },
    max_participants: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    current_participants: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    created_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
    },
    updated_at: {
        type: DataTypes.DATE,
        allowNull: true,
    },
    isDeleted: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
    },
}, {
    tableName: 'Notices',
    timestamps: false,
});

module.exports = Notices;