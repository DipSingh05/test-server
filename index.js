// server.js

const express = require("express");
const cors = require("cors");
const path = require("path");
const checkXType = require("./middleware");
const crypto = require("crypto");

const app = express();

app.use(cors());

require("dotenv").config();

const hostname = process.env.HOST || "0.0.0.0";
const port = process.env.PORT || 3000;
// const homepage = path.join(__dirname, "./public/home.html");

// app.use(express.static("./public"));
app.use(express.json());

// const { publicKey, privateKey } = crypto.generateKeyPairSync("rsa", {
//   modulusLength: 2048, // Recommended key size
//   publicKeyEncoding: {
//     type: "spki", // Subject Public Key Info
//     format: "pem", // PEM format for easy storage
//   },
//   privateKeyEncoding: {
//     type: "pkcs8", // Private-Key Information Syntax Standard
//     format: "pem",
//     cipher: "aes-256-cbc", // Optional: encrypt private key with a passphrase
//     passphrase: process.env.KEY,
//   },
// });

// app.get("/", (req, res) => {
//   res.sendFile(homepage);
// });

app.post("/test", checkXType, (req, res) => {
  const param = req.body;
  console.log(param);
  res.send(param);
});

app.post("/encrypt", checkXType, (req, res) => {
  const data = req.get('X-Type');
   const encryptedData = crypto.publicEncrypt(
      publicKey,
      Buffer.from(data, 'utf8')
    );
    console.log('Encrypted Data (Base64):', encryptedData.toString('base64'));
    res.send(encryptedData.toString('base64'))
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

process.on("uncaughtException", (err) => {
  console.error("Uncaught Exception:", err.message);
  console.error(err.stack);
  process.exit(1);
});

app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
