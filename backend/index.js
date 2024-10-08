const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
require("dotenv").config();

const connectDB = require("./config/db");
const userRouter = require("./routes/userRoutes.js");
const adminRouter = require("./routes/adminRoutes.js");
const productRouter = require("./routes/productRoutes.js");
const categoryRouter = require("./routes/categoryRoutes.js");
const cartRouter = require("./routes/cartRoutes.js");
const orderRouter = require("./routes/orderRoutes.js");

const app = express();

const corsOptions = {
  origin: process.env.ALLOWED_ORIGINS,
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE"],
};

app.use(express.json());
app.use(cookieParser());
app.use(cors(corsOptions));

app.use(function (req, res, next) {
  //Enabling CORS
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type,  Accept, x-client-key, x-client-token, x-client-secret, Authorization"
  );
  next();
});

app.use("/api/users", userRouter);
app.use("/api/admin", adminRouter);
app.use("/api/products", productRouter);
app.use("/api/categories", categoryRouter);
app.use("/api/cart", cartRouter);
app.use("/api/orders", orderRouter);

const PORT = 8080 || process.env.PORT;

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});
