const express = require('express');
const app = express();
const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv').config();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.mgf3ixl.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

const run = async () => {
    try {
        const folderCollection = client.db("folderDB").collection("folders");
        //get all folders
        app.get('/folder', async (req, res) => {
            const query = {};
            const cursor = folderCollection.find(query);
            const folder = await cursor.toArray();
            res.send(folder);
        });
        //post a folder
        app.post('/add', async (req, res) => {
            const folder = req.body;
            const result = await folderCollection.insertOne(folder);
            res.send(result);
        })
    }
    finally {
    }
};
run().catch(err => console.log(err));

app.get('/', (req, res) => {
    res.send('Folder Structure Backend Running!')
})


app.listen(port, () => {
    console.log(`Backend Running app listening at http://localhost:${port}`)
})