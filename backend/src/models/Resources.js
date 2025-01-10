const Resources = sequelize.define('Resources', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    admin_id: {
        type: DataTypes.STRING(20),
        allowNull: false,
    },
    title: {
        type: DataTypes.STRING(30),
        allowNull: false,
    },
    content: {
        type: DataTypes.STRING(50),
        allowNull: true,
    },
    file_url: {
        type: DataTypes.STRING(100),
        allowNull: true,
    },
    provider: {
        type: DataTypes.STRING(20),
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
    tableName: 'Resources',
    timestamps: false,
});

module.exports = Resources;