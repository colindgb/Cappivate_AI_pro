const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const { Pool } = require("pg");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASS,
  port: process.env.DB_PORT,
});

app.post("/api/link-accounts", async (req, res) => {
  try {
    const { user_id, links } = req.body;
    
    if (!user_id || !links) {
      return res.status(400).json({ error: "Invalid data format" });
    }

    const values = Object.entries(links).map(([platform, profile_url]) => 
      `('${user_id}', '${platform}', '${profile_url}')`
    ).join(",");

    const query = `INSERT INTO linked_accounts (user_id, platform, profile_url) VALUES ${values}`;
    await pool.query(query);

    res.status(200).json({ message: "Accounts linked successfully!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
});

app.listen(port, () => console.log(`Server running on port ${port}`));
