const express = require('express')
const inquirer = require('inquirer')
const mysql = require('mysql2')

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const PORT = process.env.PORT || 3301

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  database: 'user_db'
}
)

app.listen(PORT, () => {
  console.log(`listening on ${PORT}`)
})



