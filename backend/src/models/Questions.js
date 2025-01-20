const { DataTypes } = require('sequelize');
const sequelize = require('../db'); // 동일한 sequelize 인스턴스 가져오기

const Questions = sequelize.define('Questions', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    admin_id: {
        type: DataTypes.STRING(20),
        allowNull: true,
    },
    nickname: {
        type: DataTypes.STRING(20),
        allowNull: false,
    },
    IP: {
        type: DataTypes.STRING(30),
        allowNull: false,
    },
    question: {
        type: DataTypes.STRING(50),
        allowNull: false,
    },
    title: {
        type: DataTypes.STRING(50),
        allowNull: false,
    },
    answer: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    password: {
        type: DataTypes.INTEGER,
        allowNull: false,
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
    title: {
        type: DataTypes.STRING,
        allowNull: false,
    }
}, {
    tableName: 'Questions',
    timestamps: false,
});

module.exports = Questions;