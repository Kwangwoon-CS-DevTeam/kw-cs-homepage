const Admin = sequelize.define('Admin', {
    id: {
        type: DataTypes.STRING(20),
        primaryKey: true,
    },
    password: {
        type: DataTypes.STRING(20),
        allowNull: false,
    },
    department: {
        type: DataTypes.STRING(500),
        allowNull: true,
    },
    created_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
    },
}, {
    tableName: 'Admin',
    timestamps: false,
});

module.exports = Admin;