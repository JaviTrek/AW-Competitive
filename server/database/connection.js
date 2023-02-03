const {MongoClient} = require('mongodb')

const uri = process.env.ATLAS_URI
const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
const dbName = "users"
async function connectMongo() {
    console.log("i was read")
    try {
        await client.connect();
        console.log("connected correctly")
        const db = client.db(dbName)

        //use the collection
        const collection = db.collection("users")

        let userDocument = {
            _id: 0,
            username: "Femboy",
            armyColor: "pink",
            favoriteCO: "Lash"
        }
        //insert document
        //await collection.insertOne(userDocument);

        // find document
        const myDoc = await collection.find()
        myDoc.forEach(doc => console.log(doc));




    } catch (e) {
        console.error(e);
    } finally {
        await client.close;
    }

}

exports.connectMongo = connectMongo;

