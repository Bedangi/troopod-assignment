import axios from "axios";

export const generatePage = async (adText, url) => {
  const res = await axios.post("http://localhost:5000/generate", {
    adText,
    url
  });
  return res.data;
};