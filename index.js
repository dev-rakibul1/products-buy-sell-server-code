const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();
const port = process.env.PORT || 5000;
const { MongoClient, ServerApiVersion } = require("mongodb");

// middle ware
app.use(cors());
app.use(express.json());

// mongoDB
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.8rcwewi.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

async function run() {
  try {
    await client.connect();
  } finally {
  }
}
run().catch((error) => console.log(error));

// ======================ALL DB COLLECTION HERE==========================
const carSomethingCollection = client
  .db("buy-sell-car-project")
  .collection("car-something");

const microSomethingCollection = client
  .db("buy-sell-car-project")
  .collection("micro-something");

const microCollection = client.db("buy-sell-car-project").collection("micro");
const electCollection = client.db("buy-sell-car-project").collection("elect");
const carCollection = client.db("buy-sell-car-project").collection("car");

const electSomethingCollection = client
  .db("buy-sell-car-project")
  .collection("elect-something");

// car something collection for get api
app.get("/car-something", async (req, res) => {
  try {
    const query = {};
    const result = await carSomethingCollection.find(query).limit(3).toArray();
    res.send(result);
  } catch (e) {
    console.log(e.message);
  }
});

//all car collection for get api
app.get("/all-car", async (req, res) => {
  try {
    const query = {};
    const result = await carCollection.find(query).toArray();
    res.send(result);
  } catch (e) {
    console.log(e.message);
  }
});

// Micro something collection for get api
app.get("/micro-something", async (req, res) => {
  try {
    const query = {};
    const result = await microSomethingCollection
      .find(query)
      .limit(3)
      .toArray();
    res.send(result);
  } catch (e) {
    console.log(e.message);
  }
});

//All Micro  collection for get api
app.get("/all-micro", async (req, res) => {
  try {
    const query = {};
    const result = await microCollection.find(query).toArray();
    res.send(result);
  } catch (e) {
    console.log(e.message);
  }
});

// elect something collection for get api
app.get("/elect-something", async (req, res) => {
  try {
    const query = {};
    const result = await electSomethingCollection
      .find(query)
      .limit(3)
      .toArray();
    res.send(result);
  } catch (e) {
    console.log(e.message);
  }
});

//all elect collection for get api
app.get("/all-elect", async (req, res) => {
  try {
    const query = {};
    const result = await electCollection.find(query).toArray();
    res.send(result);
  } catch (e) {
    console.log(e.message);
  }
});

app.get("/", (req, res) => {
  res.send("Welcome from buy sell store car server.");
});

// server listen
app.listen(port, () => {
  console.log(`Buy sell car store server is running and port is : ${port}`);
});
