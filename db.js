
const {MongoClient} = require('mongodb')
let dbConnection
require('dotenv').config();

module.exports ={
    connectToDb: (cb)=>{
        MongoClient.connect(process.env.MONGODB_URI)
        .then((client) => {
            dbConnection = client.db()
            return cb ()
        })
        .catch(err => {
            console.log(err)
            return cb(err)
        })
    },
    getDb: () => dbConnection
}
///zz