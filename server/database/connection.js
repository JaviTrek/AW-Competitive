const {MongoClient} = require('mongodb')

const uri = process.env.ATLAS_URI
const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})

let db = ''
module.exports = {
    connectToServer: async (dbName) => {

        try {
            await client.connect();
            db = client.db(dbName)
            console.log(`connected to mongoDB "${dbName}" collection correctly`)

        } catch (e) {
            console.error(e);
            console.log('failed to connect to mongoDB')
        }

    },
    getDatabase: () => {
        return db
    }

}

/*
            //use the collection


            // find he documents in our collection and iterate through every one of them
            myDoc = await collection.find()
            myDoc.forEach(doc => console.log(doc));


 */