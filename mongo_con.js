'use strict';
console.log('Test DB connection for MongoDB');
const {MongoClient} = require('mongodb')

async function main() {
  const uri = "mongodb://localhost:27017/retaildb_mongodb"
  const client = new MongoClient(uri, {useNewUrlParser: true, useUnifiedTopology: true}) 
  
  try {
    // Connect to the MongoDB cluster
    await client.connect()
    console.log('Connection successful')
    
    const maindb = client.db("retaildb_mongodb")
    // Make the appropriate DB calls
    // await listDatabases(client)
    await listCollections(client)
    await listEmployeeList(client)

  } catch (e) {
      console.error(e)
  } finally {
      await client.close()
  }
}

// async function listDatabases(client){
//   let databasesList = await client.db().admin().listDatabases()

//   console.log("Databases:")
//   databasesList.databases.forEach(db => console.log(` - ${db.name}`))
// }

async function listCollections(client) {
  let collections = await client.db("retaildb_mongodb").listCollections().toArray()
  console.log("Collections:")
  //console.log(collections)
  collections.forEach(db => console.log(` - ${db.name}`));
}

async function listEmployeeList(client) {
  let employeeList = await client.db("retaildb_mongodb").collection('EmployeeList').find().toArray()
  console.log("Employee List:")
  console.log(employeeList)
  console.log(employeeList[0])
  employeeList.forEach(function(elem, index){
    console.log(elem.EmployeeID + " | " + elem.FirstName + " | " + elem.LastName)
  })
}

main().catch(console.error)