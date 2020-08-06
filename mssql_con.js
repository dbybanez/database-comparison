'use strict';
console.log('Test DB connection for MSSQL or SQL Server');
const mssql = require('mssql')

async function main() {
  const config = {
    user: '',
    password: '',
    server: 'localhost',
    database: 'retaildb_mssql'
  }

  try {
    var connection = new mssql.Connection(config)
    //let pool = await mssql.connect(config)

    employeelist = await getEmployeeList(connection)
    console.log("Employee List:")
    console.log(employeelist)


  } catch (e) {
    console.error(e)
  } finally {
    
  }
}

async function getEmployeeList(connection) {
  return new Promise((resolve, reject)  => {
    var result
    var query_result = []
    var res
    var query = "SELECT * FROM employeelist"
    connection.query(query, function (error, results, fields) {
      if (error) throw error
      if(results.length > 0) {
        for (result in results) {
          query_result.push(results[result])
        }
      }
      res = JSON.parse(JSON.stringify(query_result))
      resolve(res)
    })
  })
}

main().catch(console.error)