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
        const productsCollection = client.db("techtrovehubDB").collection("products");
        const categoryCollection = client.db("techtrovehubDB").collection("category");


        app.get('/products', async (req, res) => {
            const result = await productsCollection.find().toArray();
            if (result) {
                res.send(result)
            } else {
                res.send({ status: "402" });
            }
        })
        app.get('/category', async (req, res) => {
            const result = await categoryCollection.find().toArray();
            if (result) {
                res.send(result)
            } else {
                res.send({ status: "402" });
            }
        })
        app.get("/category/:name", async (req, res) => {
            const categoryName = req.params.name;
            if (categoryName) {
                const query = { category: categoryName };
                const result = await productsCollection.find(query).toArray();
                return res.send(result)
            }
            res.send({ error: "404" })
        })

        app.get("/offer-products", async (req, res) => {
            const query = { discount: 25 };
            const result = await productsCollection.find(query).toArray();
            if (result) {
                return res.send(result)
            }
            res.send({ error: "404" })
        })
        app.get("/offer-category/:name", async (req, res) => {
            const categoryName = req.params.name;
            if (categoryName) {
                const query = {
                    $and: [
                        { category: categoryName },
                        { discount: 25 }
                    ]
                };
                const result = await productsCollection.find(query).toArray();
                return res.send(result)
            }
            res.send({ error: "404" })
        })


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