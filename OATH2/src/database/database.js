const {MongoClient} = require('mongodb')

const uri = 'mongodb+srv://Jake:1234@awcompetitive.qkf5tqu.mongodb.net/test'
const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
const dbName = "test"
let db = ''
module.exports = {
    connectToServer: async () => {

        try {
            await client.connect();
            db = client.db(dbName)
            console.log('connected correctly')

        } catch (e) {
            console.error(e);
        }

    },
    getDatabase: () => {
        return db
    }

}