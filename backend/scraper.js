import axios from "axios";
import * as cheerio from "cheerio";

export async function scrapePage(url) {
  const { data } = await axios.get(url, {
    headers: {
      "User-Agent": "Mozilla/5.0"
    }
  });
  const $ = cheerio.load(data);

  let content = "";

  $("h1, h2, p, button").each((i, el) => {
    content += $.html(el) + "\n";
  });

  return content;
}