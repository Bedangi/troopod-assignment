import axios from "axios";

export const generatePage = async (adText, url) => {
  const res = await axios.post("https://troopod-assignment-5egd.onrender.com/generate", {
    adText,
    url
  });
  return res.data;
};
