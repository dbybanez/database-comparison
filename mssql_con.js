'use strict';
console.log('Test DB connection for MSSQL (SQL Server)');
const mssql = require('mssql')

async function main() {
  const config = {
    user: 'admin',
    password: 'admin',
    server: 'DAVID-LAPTOP\\SQLEXPRESS01',
    database: 'retaildb_mssql',
    port: 1433,
    options: {
      enableArithAbort: false
    }
  }

  let pool = null

  try {
    pool = await mssql.connect(config)
    console.log('Connection successful')

    let tablelist = await listTables(pool)
    console.log("Tables:")
    tablelist.forEach(function (elem, index) {
      console.log(` - ${elem.TABLE_NAME}`)
    })
    
    let employeelist = await getEmployeeList(pool)
    console.log("Employee List:")
    console.log(employeelist)

    employeelist.forEach(function (elem, index) {
      console.log(elem.EmployeeID + " | " + elem.FirstName + " | " + elem.LastName)
    })


  } catch (e) {
    console.error(e)
  } finally {
    pool.close()
  }
}

async function listTables(pool) {
  return new Promise((resolve, reject) => {
    var result
    var query_result = []
    var res
    let query = "SELECT Distinct TABLE_NAME FROM INFORMATION_SCHEMA.TABLES"
    pool.request().query(query, function (error, results, fields) {
      if (error) throw error
      // console.log(results.recordset)
      if (results.recordset.length > 0) {
        for (result in results.recordset) {
          // console.log(results.recordset[result].TABLE_NAME)
          query_result.push(results.recordset[result])
        }
      }
      res = JSON.parse(JSON.stringify(query_result))
      resolve(res)
    })
  })
}

async function getEmployeeList(pool) {
  return new Promise((resolve, reject)  => {
    var result
    var query_result = []
    var res
    var query = "SELECT * FROM EmployeeList"
    pool.request().query(query, function (error, results, fields) {
      if (error) throw error
      // console.log(results.recordset)
      if(results.recordset.length > 0) {
        for (result in results.recordset) {
          query_result.push(results.recordset[result])
        }
      }
      res = JSON.parse(JSON.stringify(query_result))
      resolve(res)
    })
  })
}

main().catch(console.error)