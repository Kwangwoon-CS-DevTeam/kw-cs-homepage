const Questions = sequelize.define('Questions', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    admin_id: {
        type: DataTypes.STRING(20),
        allowNull: false,
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
}, {
    tableName: 'Questions',
    timestamps: false,
});

module.exports = Questions;