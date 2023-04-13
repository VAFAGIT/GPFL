const express = require("express");
const app = express();
require("dotenv").config();
const cors = require("cors");
const port = process.env.PORT || 5000;
const dbconfig = require("./config/db");


app.use(cors());
app.use(express.json());

// // Connect to database
// dbconfig();
// Routes
app.use("/api/user", require("./routes/usersRoutes"));
app.use("/api/admin", require("./routes/AdminRoutes"));

app.use("/api/product", require("./routes/productRoutes"));
app.use("/api/category", require("./routes/categorieRoutes"));
app.use("/api/order", require("./routes/orderRoutes"));




// listen to port
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
    }
);

module.exports = app;