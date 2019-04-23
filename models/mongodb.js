exports.insert = async function() {
  var database = await require('../services/database').dbConnect()
  var collection = database.collection('collection_name')
  try {
    await collection.insertOne()
  }
  catch (error) {
    throw(new Error(error))
  }
}
