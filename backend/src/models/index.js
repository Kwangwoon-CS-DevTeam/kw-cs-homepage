const Notices = require('./Notices');
const Category = require('./Category');
const Admin = require('./Admin');
const Resources = require('./Resources');
const Questions = require('./Questions');

// Notices <-> Category
Notices.belongsTo(Category, { foreignKey: 'category_id' });
Category.hasMany(Notices, { foreignKey: 'category_id' });

// Notices, Resources, Questions <-> Admin
Notices.belongsTo(Admin, { foreignKey: 'admin_id' });
Resources.belongsTo(Admin, { foreignKey: 'admin_id' });
Questions.belongsTo(Admin, { foreignKey: 'admin_id' , allowNull: true});
Admin.hasMany(Notices, { foreignKey: 'admin_id' });
Admin.hasMany(Resources, { foreignKey: 'admin_id' });
Admin.hasMany(Questions, { foreignKey: 'admin_id' });

module.exports = {
    Notices,
    Admin,
    Category,
    Resources,
    Questions,
};