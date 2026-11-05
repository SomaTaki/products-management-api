const express = require("express");

const db = require("../db/db");
const { eq } = require("drizzle-orm");
const { products } = require("../db/schema");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const entries = await db.select().from(products);
    return res.status(200).json(entries);
  } catch (error) {
    return res.status(500).json({
      message: error.message || "Internal server error.",
    });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const [entry] = await db
      .select()
      .from(products)
      .where(eq(products.id, +req.params.id));

    if (!entry) {
      return res.status(404).json({ message: "Product not found" });
    }
    return res.status(200).json(entry);
  } catch (error) {
    return res.status(500).json({
      message: error.message || "Internal server error.",
    });
  }
});

router.post("/", async (req, res) => {
  try {
    const { name, price, inStock } = req.body;

    if (!name) {
      return res.status(400).json({ message: "Name is required" });
    }
    if (!price) {
      return res.status(400).json({ message: "Price is required" });
    }
    if (!inStock === undefined) {
      return res.status(400).json({ message: "InStock is required" });
    }

    await db.insert(products).values({
      name,
      price,
      inStock,
    });

    return  res.status(201).json({ message: "Product created successfully" });
    
  } catch (error) {
    return res.status(500).json({
      message: error.message || "Internal server error.",
    });
  }
});

module.exports = router;
