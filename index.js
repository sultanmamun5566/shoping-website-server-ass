const express = require('express')
const { MongoClient } = require('mongodb');
require('dotenv').config()
const ObjectId = require('mongodb').ObjectId;
const cors = require('cors');
const app = express()
const port =process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.ututi.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
console.log(uri)

async function run() {
    try {
      await client.connect();
      const database = client.db("shopingWebsite");
      const shopCollection = database.collection("shop");

        app.get('/shop', async (req, res) => {
            const cursor = shopCollection.find({})
            const result=await cursor.toArray()

          res.send(result)
      });

      app.delete('/shop/:id', async (req, res) => {
        const id = req.params.id;
        const query = { _id: ObjectId(id) }
        const result = await shopCollection.deleteOne(query);
        res.json(result);
      });

    }
    finally {
    //   await client.close();
    }
  }
  run().catch(console.dir);


app.get('/', (req, res) => {
  res.send('Hello World!')
})
app.get('/home', (req, res) => {
  res.send('hitted id')
}),

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
