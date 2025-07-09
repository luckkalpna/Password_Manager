import express from 'express'
import dotenv from 'dotenv';
import { MongoClient } from 'mongodb';

dotenv.config();
// Connection URL
const url = 'mongodb://localhost:27017';
const client = new MongoClient(url);

// Database Name
const dbName = 'passop';
const app = express();
client.connect();

app.get('/', async (req, res) => {
  const db = client.db(dbName);
  const collection = db.collection('documents');
  const findResult = await collection.find({}).toArray();
  res.json(findResult)
})

app.listen(3000)