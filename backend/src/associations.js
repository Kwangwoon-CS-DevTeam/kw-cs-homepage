const Notices = require('./models/Notices');
const Category = require('./models/Category');
const Admin = require('./models/Admin');
const Resources = require('./models/Resources');
const Questions = require('./models/Questions');

// Notices <-> Category
Notices.belongsTo(Category, { foreignKey: 'category_id' });
Category.hasMany(Notices, { foreignKey: 'category_id' });

// Notices, Resources, Questions <-> Admin
Notices.belongsTo(Admin, { foreignKey: 'admin_id' });
Resources.belongsTo(Admin, { foreignKey: 'admin_id' });
Questions.belongsTo(Admin, { foreignKey: 'admin_id' });
Admin.hasMany(Notices, { foreignKey: 'admin_id' });
Admin.hasMany(Resources, { foreignKey: 'admin_id' });
Admin.hasMany(Questions, { foreignKey: 'admin_id' });