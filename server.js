const express = require("express");
const app = express();

const path = require("path")

require("dotenv").config();

app.use(express.static('public'));

app.get("/", (req, res) => {
  const clientIp = req.ip;
  console.log(`IP: ${clientIp}`)

  const videoPath = path.join(__dirname, 'public', 'video.mp4');
  res.sendFile(videoPath);
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Listening to port ${PORT}`);
});
