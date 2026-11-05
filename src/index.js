require("dotenv").config();

const express = require("express");

const productsRouter = require("./routes/products");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use("/api/products", productsRouter);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
