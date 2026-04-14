import dotenv from "dotenv";
import express from "express";
import cors from "cors";

import { scrapePage } from "./scraper.js";
import { generateModifiedHTML } from "./ai.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.post("/generate", async (req, res) => {
  try {
    console.log("Request received:", req.body);
    const { adText, url } = req.body;

    const originalHTML = await scrapePage(url);
    console.log("Scraped HTML:", originalHTML);
    const modifiedHTML = await generateModifiedHTML(adText, originalHTML);
    console.log("Modified HTML:", modifiedHTML);

    res.json({ originalHTML, modifiedHTML });
  } catch (err) {
    console.error("ERROR:", err.message);
    res.status(500).json({ error: err.message });
  }
});

app.listen(5000, () => console.log("Server running on port 5000"));