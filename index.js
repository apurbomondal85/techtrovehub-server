const express = require('express')
const app = express()
require('dotenv').config()
const cors = require('cors');
const port = 5000

app.use(cors());
app.use(express.json());



const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = `mongodb+srv://${process.env.USER_DB}:${process.env.DB_PASS}@cluster0.ph7tdpg.mongodb.net/?retryWrites=true&w=majority`;

const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

async function run() {
    try {
        // const productsCollection = 


    } finally {

    }
}
run().catch(console.dir);


app.get('/', (req, res) => {
    res.send('TechTroveHub server is running')
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})