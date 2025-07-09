import express from 'express'
import dotenv from 'dotenv';
import { MongoClient } from 'mongodb';
import bodyparser from 'body-parser'
import cors from 'cors'

dotenv.config();

const url = 'mongodb://localhost:27017';
const client = new MongoClient(url);
const dbName = 'passop';
const app = express();

app.use(cors());
app.use(bodyparser.json());

client.connect();

// Get all the passwords
app.get('/', async (req, res) => {
  const db = client.db(dbName);
  const collection = db.collection('passwords');
  const findResult = await collection.find({}).toArray();
  res.json(findResult);
});

// Save new password
app.post('/', async (req, res) => {
  const password = req.body;
  const db = client.db(dbName);
  const collection = db.collection('passwords');
  const result = await collection.insertOne(password);
  res.json({ success: true, result });
});

// Delete by ID
app.delete('/', async (req, res) => {
  const { id } = req.body;
  const db = client.db(dbName);
  const collection = db.collection('passwords');
  const result = await collection.deleteOne({ id });
  res.json({ success: true, result });
});

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
