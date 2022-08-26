const roles = require('./roles')
const departments  = require('./departments')
const employee = require("./employees")

// roles.belongsTo(departments, {
//   foreignKey: 'departments_id',
// })

// departments.hasMany(roles, {
//   foreignKey: 'departments_id',
// })

// employee.hasOne(roles, {
//   foreignKey: 'role_id'
// })

// roles.belongsTo(employee, {
//   foreignKey: 'role_id'
// })


module.exports = {departments, roles, employee};