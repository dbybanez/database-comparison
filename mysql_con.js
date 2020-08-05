'use strict';
console.log('Test DB connection for MySQL');
var mysql = require('mysql')

async function main() {
  const username = 'root'
  const password = ''
  const host = 'localhost'

  let connection = mysql.createConnection({
    host     : host,
    user     : username,
    password : password,
    database : 'retaildb_mysql'
  })

  let employeelist = ""
  let tablelist = ""

  try {
    connection.connect()
    console.log('Connection successful')

    tablelist = await listTables(connection)
    //console.log(tablelist)
    console.log("Tables:")
    tablelist.forEach(function(elem, index){
      console.log(` - ${elem.Tables_in_retaildb_mysql}`)
    })

    employeelist = await getEmployeeList(connection)
    console.log("Employee List:")
    console.log(employeelist)

    employeelist.forEach(function(elem, index){
      console.log(elem.EmployeeID + " | " + elem.FirstName + " | " + elem.LastName)
    })

  } catch (e) {
    console.error(e)
  } finally {
    // return new Promise ( ( resolve, reject ) => {
    //   connection.end( err => {
    //     if ( err )
    //       return reject( err )
    //     resolve(query_results)
    //   })
    // })
    if( connection && connection.end ) connection.end()
  }
}

async function listTables(connection) {
  return new Promise ( (resolve, reject) => {
    var result
    var query_result = []
    var res
    let query = "SHOW TABLES"
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

async function getEmployeeList( connection ) {
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