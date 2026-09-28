const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware agar req.body (JSON) dapat dibaca
app.use(express.json());
//data sementara
const scholarships = [
  {
    id: 1,
    namaBeasiswa: "Beasiswa Prestasi Digital",
    penyelenggara: "Yayasan Cendekia",
    nominal: 6000000,
    jenjang: "S1",
    batasPendaftaran: "2026-12-15",
  },
  {
    id: 2,
    namaBeasiswa: "Beasiswa Unggul Indonesia",
    penyelenggara: "Kementerian Pendidikan",
    nominal: 8000000,
    jenjang: "S1",
    batasPendaftaran: "2026-11-30",
  },
  {
    id: 3,
    namaBeasiswa: "Beasiswa Pendidikan Lanjutan",
    penyelenggara: "Universitas Nusantara",
    nominal: 5000000,
    jenjang: "S2",
    batasPendaftaran: "2027-01-20",
  },
];

let nextId = 4;

// GET /
app.get("/", (req, res) => {
  res.json({
    namaMahasiswa: "Aldi Wijaya",
    nim: "2428240162",
    nomorTopik: 36,
    endpoints: [
      "GET /scholarships",
      "GET /scholarships/:id",
      "GET /scholarships?jenjang=S1",
      "POST /scholarships",
      "PUT /scholarships/:id",
      "DELETE /scholarships/:id",
    ],
  });
});

// GET /scholarships semua data bisa filter scholarships?jenjang=S1
app.get("/scholarships", (req, res) => {
  const { jenjang } = req.query;

  if (jenjang) {
    const hasil = scholarships.filter((item) => item.jenjang === jenjang);
    return res.json(hasil);
  }

  res.json(scholarships);
});

// GET /scholarships/:id
app.get("/scholarships/:id", (req, res) => {
  const id = parseInt(req.params.id);

  const data = scholarships.find((item) => item.id === id);

  if (!data) {
    return res.status(404).json({
      status: 404,
      message: "Data beasiswa tidak ditemukan",
      data: null,
    });
  }

  res.json(data);
});

// POST /scholarships
app.post("/scholarships", (req, res) => {
  const { namaBeasiswa, penyelenggara, nominal, jenjang, batasPendaftaran } =
    req.body;

  if (
    !namaBeasiswa ||
    !penyelenggara ||
    !nominal ||
    !jenjang ||
    !batasPendaftaran
  ) {
    return res.status(400).json({
      status: "error",
      message: "Semua data wajib diisi",
      data: null,
    });
  }

  const baru = {
    id: nextId,
    namaBeasiswa: namaBeasiswa,
    penyelenggara: penyelenggara,
    nominal: nominal,
    jenjang: jenjang,
    batasPendaftaran: batasPendaftaran,
  };

  scholarships.push(baru);
  nextId++;

  res.status(201).json({
    status: "success",
    message: "Data beasiswa berhasil ditambahkan",
    data: baru,
  });
});

// PUT /scholarships/:id
app.put("/scholarships/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const index = scholarships.findIndex((item) => item.id === id);

  if (index === -1) {
    return res.status(404).json({
      status: "error",
      message: "Data beasiswa tidak ditemukan",
      data: null,
    });
  }

  const {
    namaBeasiswa,
    penyelenggara,
    nominal,
    jenjang,
    batasPendaftaran,
  } = req.body;

  if (
    !namaBeasiswa ||
    !penyelenggara ||
    !nominal ||
    !jenjang ||
    !batasPendaftaran
  ) {
    return res.status(400).json({
      status: "error",
      message: "Semua data wajib diisi",
      data: null,
    });
  }

  scholarships[index] = {
    id: id,
    namaBeasiswa: namaBeasiswa,
    penyelenggara: penyelenggara,
    nominal: nominal,
    jenjang: jenjang,
    batasPendaftaran: batasPendaftaran,
  };

  res.status(200).json({
    status: "success",
    message: "Data beasiswa berhasil diperbarui",
    data: scholarships[index],
  });
});



// menjalankan aplikasi pada port 3000
app.listen(PORT, () => {
  console.log(`Server berjalan di http://localhost:${PORT}`);
});
