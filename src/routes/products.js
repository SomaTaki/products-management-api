const express = require('express');

const db = require("../db/db");

const router = express.Router();

router.get("/", async (req, res) => {
    try{
            const entries = await db.select().from(products);
            return res.status(200).json(entries);
    } catch (error) {
        return res.status(500).json({ 
            message: error.message || "Internal server error.",
        });
    }
});


module.exports = router;