const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware agar req.body (JSON) dapat dibaca
app.use(express.json());

//route
app.get("/", (req, res) => {
  res.send("Server Express.js berjalan!");
});

//get







// menjalankan aplikasi pada port 3000
app.listen(PORT, () => {
  console.log(`Server berjalan di http://localhost:${PORT}`);
});
