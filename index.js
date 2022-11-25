const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();
const port = process.env.PORT || 5000;
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");

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
const userBookingInformation = client
  .db("buy-sell-car-project")
  .collection("user-booking-information");

const electSomethingCollection = client
  .db("buy-sell-car-project")
  .collection("elect-something");

const usersCollection = client.db("buy-sell-car-project").collection("users");
const newProductCollection = client
  .db("buy-sell-car-project")
  .collection("new-products");

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

// temporary  location add in the DB
// app.get("/all-micro", async (req, res) => {
//   const filter = {};
//   const options = { upsert: true };
//   const updateDoc = {
//     $set: {
//       location: "Chittagong, Bangladesh",
//     },
//   };

//   const result = await microCollection.updateMany(filter, updateDoc, options);
//   res.send(result);
// });

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
// single micro api
app.get("/all-micro/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const query = { _id: ObjectId(id) };
    const result = await microCollection.findOne(query);
    res.send(result);
  } catch (e) {
    console.log(e.message);
  }
});

// single micro api
app.get("/all-elect/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const query = { _id: ObjectId(id) };
    const result = await electCollection.findOne(query);
    res.send(result);
  } catch (e) {
    console.log(e.message);
  }
});

// single micro api
app.get("/all-car/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const query = { _id: ObjectId(id) };
    const result = await carCollection.findOne(query);
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

app.get("/user-booking-information", async (req, res) => {
  try {
    const query = {};
    const result = await userBookingInformation.find(query).toArray();
    res.send(result);
  } catch (e) {
    console.log(e.message);
  }
});

app.get("/users", async (req, res) => {
  try {
    const query = {};
    const result = await usersCollection.find(query).toArray();
    res.send(result);
  } catch (e) {
    console.log(e.message);
  }
});

// ========================ALL POST METHOD =========================

app.post("/users", async (req, res) => {
  try {
    const query = req.body;
    const result = await usersCollection.insertOne(query);
    res.send(result);
  } catch (e) {
    console.log(e.message);
  }
});

app.post("/new-products", async (req, res) => {
  try {
    const query = req.body;
    const result = await newProductCollection.insertOne(query);
    res.send(result);
  } catch (e) {
    console.log(e.message);
  }
});

// seller new electronic product added
app.post("/all-elect", async (req, res) => {
  try {
    const query = req.body;
    const result = await electCollection.insertOne(query);
    res.send(result);
  } catch (e) {
    console.log(e.message);
  }
});
// seller new product added
app.post("/all-micro", async (req, res) => {
  try {
    const query = req.body;
    const result = await microCollection.insertOne(query);
    res.send(result);
  } catch (e) {
    console.log(e.message);
  }
});
// seller new product added
app.post("/all-car", async (req, res) => {
  try {
    const query = req.body;
    const result = await carCollection.insertOne(query);
    res.send(result);
  } catch (e) {
    console.log(e.message);
  }
});
//user-booking-information
app.post("/user-booking-information", async (req, res) => {
  try {
    const query = req.body;
    const result = await userBookingInformation.insertOne(query);

    if (result.acknowledged) {
      res.send({
        success: true,
        message: "Booking successfully",
      });
    } else
      res.send({
        success: false,
        error: "Booking fail!",
      });
  } catch (e) {
    console.log(e.message);
  }
});

//  =================GET SINGLE USER FORM DATABASE ===================
app.get("/users/:email", async (req, res) => {
  try {
    const email = req.params.email;
    const user = await usersCollection.findOne({ email });
    res.send(user);
  } catch (e) {
    console.log(e.message);
  }
});

//  =================ALL DELETE METHOD ===================
app.delete("/user-booking-information/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const query = { _id: ObjectId(id) };
    const result = await userBookingInformation.deleteOne(query);
    console.log(result);

    if (result.deletedCount) {
      res.send({
        success: true,
        message: "Delete successfully",
      });
    } else
      res.send({
        success: false,
        error: "Delete fail!",
      });
  } catch (e) {
    console.log(e.message);
  }
});

// delete user/ admin buyer, seller
app.delete("/users/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const query = { _id: ObjectId(id) };
    const result = await usersCollection.deleteOne(query);
    console.log(result);

    if (result.deletedCount) {
      res.send({
        success: true,
        message: "Delete successfully",
      });
    } else
      res.send({
        success: false,
        error: "Delete fail!",
      });
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
