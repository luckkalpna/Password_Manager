import express from 'express'
import dotenv from 'dotenv';
import { MongoClient } from 'mongodb';
import bodyparser from 'body-parser'

dotenv.config();
// Connection URL
const url = 'mongodb://localhost:27017';
const client = new MongoClient(url);

// Database Name
const dbName = 'passop';
const app = express();

app.use(bodyparser.json())

client.connect();


// Get all the passwords
app.get('/', async (req, res) => {
  const db = client.db(dbName);
  const collection = db.collection('passwords');
  const findResult = await collection.find({}).toArray();
  res.json(findResult)
})

// Save passwords
app.post('/', async (req, res) => {
  const password = req.body
  const db = client.db(dbName);
  const collection = db.collection('passwords');
  const findResult = await collection.insertOne(password);
  res.json({success: true, result: findResult})
})

// Delete passwords
app.delete('/', async (req, res) => {
  const password = req.body
  const db = client.db(dbName);
  const collection = db.collection('passwords');
  const findResult = await collection.deleteOne(password);
  res.json({success: true, result: findResult})
})

app.listen(3000)