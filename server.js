const express = require('express')
const inquirer = require('inquirer')
const mysql = require('mysql2');
const { databaseVersion } = require('./config/connection');
const sequelize = require('./config/connection');
const { departments, roles, employee } = require('./models');
const app = express();
const Rx = require('rxjs');
const employees = require('./models/employees');
const { findOne } = require('./models/employees');
const { UPSERT } = require('sequelize/lib/query-types');



app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const PORT = process.env.PORT || 3301
let answers

const deptQuestions = [
  {type: "input", name: 'deptName', message:'What would you like to name the department?'}
]
const roleQuestions = [
  {type: "input", name: 'roleName', message:'What would you like to name the role?'},
  {type: "number", name: 'roleSalary', message:'What would you like the salary to be?'},
  {type: 'input', name:'roleDept', message:'What department should this role belong to?', validate: async (answer) => { 
    const dept = await departments.findAll({where: { name: answer}})
    if(dept) {
      return true
    } else { console.log('The entered department does not exist. Please enter a different one.')
      return false}
  }}
]

const empQuestions = [
{ type: 'input', name: 'empFirstName', message: 'What is the employees first name?'},
{ type: 'input', name: 'empLastName', message: 'What is the employees last name?'},
{ type: 'input', name: 'empRole', message: `What is the employees role?`},
{ type: 'input', name: 'empManager', message: 'Who is the employees manager? (leave empty if none)'},
]

const updateQs = [
  {type: 'list', name: 'updateEmp', message: 'Which employee would you like to update?',
  choices: getChoices
}, {type:'list', name: 'newEmpRole', message: 'What role would you like to change this employee to?', choices: roleChoices}
]

async function getChoices() {
  let returnArr = []
  const getEmpList = await employees.findAll();
  getEmpList.map((el) => {
    returnArr.push({name: `${el.first_name} ${el.last_name} ${el.role}`, value:`${el.id}`})
  })
  console.log(returnArr)
 return returnArr
}

async function roleChoices() {
  let roleArr = []
  const getRolesList = await roles.findAll();
  getRolesList.map((role) => {
    roleArr.push({name: `${role.job_title}`, value:`${role.id}`})
  })
  return roleArr
}


// const prompts = new Rx.Subject();







  





sequelize.sync({ force: false })

const questions = [ {type: "list", name: 'what_next', message: 'What would you like to do?', choices: ['Show all departments', 'Show all roles', 'Show all employees', 'add a department', 'add a role',
'add an employee', 'update an employee role'], default: [0]
}]

startPrompts()
function startPrompts() {
inquirer.prompt(questions)
.then( async(answers) => {
  console.log(answers)
  if(answers.what_next == 'Show all departments') {
  const resultTables = await departments.findAll()
  console.log('==============================')
  console.log('Departments')
  resultTables.forEach(el => console.log(`==============================\n
  ${el.name}`))
  startPrompts()
  }
  if(answers.what_next == 'Show all roles') {
    const rolesResults = await roles.findAll()
    console.log('==============================')
    console.log('Roles')
    console.log('==============================')
    rolesResults.forEach(async (item) => {
      const curr_Role_Dept = await departments.findOne({where: {id : `${item.departments_id}`}})
      console.log(`${item.job_title},${item.role_id},${curr_Role_Dept.name},${item.salary}`)})
    startPrompts()
    }
  if(answers.what_next == 'Show all employees') {
    const emp_result = await employees.findAll();
    console.log('==============================')
  console.log('Employees')
  console.log("EmployeeID|FirstName LastName| Role| Department| Manager| ")
  emp_result.forEach(el => console.log(`==============================
  ${el.id}|${el.first_name} ${el.last_name}|${el.role}|${el.department}|${el.manager}`))
  startPrompts()
  }
 if(answers.what_next == 'add a department') {
  inquirer.prompt(deptQuestions).then( async(ans) => {
    const createDept = await departments.create({ name: `${ans.deptName}`, created_at : sequelize.literal('CURRENT_TIMESTAMP'), updated_at: sequelize.literal('CURRENT_TIMESTAMP')})
    if(createDept) {
      console.log(`The selected dept ${ans.deptName}  was created successfully.`)
    } else {console.log('Something went wrong in creating your requested department.')}
  })
  startPrompts()
 }
 if(answers.what_next == 'add a role') {
  inquirer.prompt(roleQuestions)
.then( async(someAns) => {
  const searchDept = await departments.findOne({where: { name: someAns.roleDept}})
  const deptId = searchDept.id
  const newRole = await roles.create({job_title: someAns.roleName, salary: someAns.roleSalary, departments_id: deptId, department: someAns.roleDept})
  if(newRole) {
    console.log(`The selected role of ${someAns.roleName} was created.`)
  } else {
    console.log(`Your requested role was not successfully created.`)
  }
  startPrompts()
})

 }
 if(answers.what_next == 'add an employee') {
  inquirer.prompt(empQuestions)
.then( async(ans) => {
  const createEmp = await employee.create({first_name: ans.empFirstName, last_name:ans.empLastName, role:ans.empRole, manager:ans.empManager})
 if(createEmp) {
  console.log(`The requested employee ${ans.empFirstName} ${ans.empLastName} has been successfully created.`)
 } else {
  console.log(`There was an issue creating the employee ${ans.empFirstName} ${ans.empLastName}`)
 }
 startPrompts()
})
 }
if(answers.what_next == 'update an employee role') {
  inquirer.prompt(updateQs)
  .then( async(output) => {
    const newRoleValue = await roles.findOne({where: {id:output.newEmpRole}})
    const findEmp = await employee.update({role:newRoleValue.job_title}, {where: { id:output.updateEmp}})
    if(findEmp) {
      console.log(`Role updated successfully.`)
    } else { console.log(`Role not updated successfully.`)}
    startPrompts()
    }
  )

}

})}




