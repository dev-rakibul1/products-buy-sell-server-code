const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();
const port = process.env.PORT || 5000;
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const jwt = require("jsonwebtoken");

// middle ware
app.use(cors());
app.use(express.json());

function verifyToken(req, res, next) {
  const authorization = req.headers.authorization;

  if (!authorization) {
    return res.status(401).send({
      status: 401,
      message: "unauthorized request",
    });
  }

  const token = authorization.split(" ")[1];
  console.log(token);

  // verify the token
  jwt.verify(token, process.env.JWT_TOKEN_KEY, function (err, decoded) {
    if (err) {
      return res.status(401).send({
        message: "Invalid token",
        status: 401,
      });
    }

    req.decoded = decoded;
  });
  return next();
}

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

const blogCollection = client.db("buy-sell-car-project").collection("blog");
const advertiseCollection = client
  .db("buy-sell-car-project")
  .collection("advertise");

const userReportCollection = client
  .db("buy-sell-car-project")
  .collection("user-report");

const wishlistCollection = client
  .db("buy-sell-car-project")
  .collection("user-wishlist");

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

// ========================JSON WEB TOKEN USING HERE=============================
app.put("/users/:email", async (req, res) => {
  try {
    // const email = req.params.email;
    // const name = req.body.name;
    // const image = req.body.image;
    // const role = req.body.role;
    // // console.log(email, name, image, role);
    // const user = req.body;

    // const filter = { email: email };
    // const options = { upsert: true };
    // const updateDoc = {
    //   $set: {
    //     email: email,
    //     name: name,
    //     image: image,
    //     role: role,
    //   },
    // };

    const email = req.params.email;
    const name = req.body.name;
    const image = req.body.image;
    const role = req.body.role;
    console.log(email);
    const user = req.body;

    const filter = { email: email };
    const options = { upsert: true };
    const updateDoc = {
      $set: {
        email: email,
        name: name,
        image: image,
        role: role,
      },
    };
    const result = await usersCollection.updateOne(filter, updateDoc, options);

    // jwt token
    const token = jwt.sign({ email: email }, process.env.JWT_TOKEN_KEY, {
      expiresIn: "1h",
    });

    res.send({
      status: "success",
      message: "Token create successfully",
      data: token,
    });
    console.log(result);
  } catch (e) {
    console.log(e.message);
  }
});

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
// Blog api
app.get("/blog", async (req, res) => {
  try {
    const query = {};
    const result = await blogCollection.find(query).toArray();
    res.send(result);
  } catch (e) {
    console.log(e.message);
  }
});

// user wishlist get api
app.get("/user-wishlist", async (req, res) => {
  try {
    const query = {};
    const result = await wishlistCollection.find(query).toArray();
    res.send(result);
  } catch (e) {
    console.log(e.message);
  }
});

// user report get api
app.get("/user-report", async (req, res) => {
  try {
    const query = {};
    const result = await userReportCollection.find(query).toArray();
    res.send(result);
  } catch (e) {
    console.log(e.message);
  }
});

// user report get api
app.get("/advertise", async (req, res) => {
  try {
    const query = {};
    const result = await advertiseCollection.find(query).toArray();
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
    // res.send(result);

    if (result.acknowledged) {
      res.send({
        success: true,
        message: "User added successfully in DB",
      });
    } else
      res.send({
        success: false,
        error: "User added fail in DB!",
      });
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

//user wishlist API
app.post("/user-wishlist", async (req, res) => {
  try {
    const query = req.body;
    const result = await wishlistCollection.insertOne(query);

    if (result.acknowledged) {
      res.send({
        success: true,
        message: "Product add successfully your favourite list",
      });
    } else
      res.send({
        success: false,
        error: "Products added fail!",
      });
  } catch (e) {
    console.log(e.message);
  }
});

//user report API
app.post("/user-report", async (req, res) => {
  try {
    const query = req.body;
    const result = await userReportCollection.insertOne(query);

    if (result.acknowledged) {
      res.send({
        success: true,
        message: "Report send successfully",
      });
    } else
      res.send({
        success: false,
        error: "Report send fail!",
      });
  } catch (e) {
    console.log(e.message);
  }
});

//Advertisement products api
app.post("/advertise", async (req, res) => {
  try {
    const query = req.body;
    const result = await advertiseCollection.insertOne(query);

    if (result.acknowledged) {
      res.send({
        success: true,
        message: "Advertise successfully",
      });
    } else
      res.send({
        success: false,
        error: "Advertise fail!",
      });
  } catch (e) {
    console.log(e.message);
  }
});

//  =================GET SINGLE USER FORM DATABASE ===================
app.get("/users/:email", verifyToken, async (req, res) => {
  try {
    const email = req.params.email;
    const user = await usersCollection.findOne({ email });
    res.send(user);
  } catch (e) {
    console.log(e.message);
  }
});

//  =================ALL DELETE METHOD ===================
app.delete("/user-booking-information/:id", verifyToken, async (req, res) => {
  try {
    const id = req.params.id;
    const query = { _id: ObjectId(id) };
    const result = await userBookingInformation.deleteOne(query);
    // console.log(result);

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
app.delete("/users/:id", verifyToken, async (req, res) => {
  try {
    const id = req.params.id;
    const query = { _id: ObjectId(id) };
    const result = await usersCollection.deleteOne(query);
    // console.log(result);

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

// delete user from wishlist
app.delete("/user-wishlist/:id", verifyToken, async (req, res) => {
  try {
    const id = req.params.id;
    const query = { _id: ObjectId(id) };
    const result = await wishlistCollection.deleteOne(query);
    // console.log(result);

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

// delete user from report list
app.delete("/user-report/:id", verifyToken, async (req, res) => {
  try {
    const id = req.params.id;
    const query = { _id: ObjectId(id) };
    const result = await userReportCollection.deleteOne(query);
    // console.log(result);

    if (result.deletedCount) {
      res.send({
        success: true,
        message: "Report delete successfully",
      });
    } else
      res.send({
        success: false,
        error: "Report delete fail!",
      });
  } catch (e) {
    console.log(e.message);
  }
});

// delete my product from db
app.delete("/all-elect/:id", verifyToken, async (req, res) => {
  try {
    const id = req.params.id;
    const query = { _id: ObjectId(id) };
    const result = await electCollection.deleteOne(query);
    // console.log(result);

    if (result.deletedCount) {
      res.send({
        success: true,
        message: "Product delete successfully",
      });
    } else
      res.send({
        success: false,
        error: "Product delete fail!",
      });
  } catch (e) {
    console.log(e.message);
  }
});

// delete my product from db
app.delete("/all-micro/:id", verifyToken, async (req, res) => {
  try {
    const id = req.params.id;
    const query = { _id: ObjectId(id) };
    const result = await microCollection.deleteOne(query);
    // console.log(result);

    if (result.deletedCount) {
      res.send({
        success: true,
        message: "Product delete successfully",
      });
    } else
      res.send({
        success: false,
        error: "Product delete fail!",
      });
  } catch (e) {
    console.log(e.message);
  }
});

// delete my product from db (All Luxurious Car)
app.delete("/all-car/:id", verifyToken, async (req, res) => {
  try {
    const id = req.params.id;
    const query = { _id: ObjectId(id) };
    const result = await carCollection.deleteOne(query);
    // console.log(result);

    if (result.deletedCount) {
      res.send({
        success: true,
        message: "Product delete successfully",
      });
    } else
      res.send({
        success: false,
        error: "Product delete fail!",
      });
  } catch (e) {
    console.log(e.message);
  }
});

// Delete product from advertisement
app.delete("/advertise/:id", verifyToken, async (req, res) => {
  try {
    const id = req.params.id;
    // console.log(id);
    const query = { _id: ObjectId(id) };
    const result = await advertiseCollection.deleteOne(query);
    // console.log(result);
    // console.log(result);

    if (result.deletedCount) {
      res.send({
        success: true,
        message: "Delete success from add board.",
      });
    } else
      res.send({
        success: false,
        error: "Delete fail! from add board.",
      });
  } catch (e) {
    console.log(e.message);
  }
});

// =================== ALL PUT METHOD==================
app.put("/users/admin/:id", verifyToken, async (req, res) => {
  const id = req.params.id;
  const filter = { _id: ObjectId(id) };

  const options = { upsert: true };

  const updateDoc = {
    $set: {
      sellerStatus: "verified",
    },
  };
  const result = await usersCollection.updateOne(filter, updateDoc, options);
  // console.log(result);

  if (result.acknowledged) {
    res.send({
      success: true,
      message: "User verify successfully",
    });
  } else
    res.send({
      success: false,
      error: "User verify fail!",
    });
});

app.get("/", (req, res) => {
  res.send("Welcome from buy sell store car server.");
});

// server listen
app.listen(port, () => {
  console.log(`Buy sell car store server is running and port is : ${port}`);
});
