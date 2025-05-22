import express from "express";
import cors from "cors";
import route from "./routes/route.js";
import "./model/index.js"; // <- PENTING: memicu sinkronisasi DB
import cookieParser from "cookie-parser";

const app = express();
const port = process.env.PORT || 5000;

// Konfigurasi CORS agar mengizinkan domain frontend terdeploy
const corsOptions = {
 origin: [
    "http://localhost:3000", // Tambahkan localhost untuk pengembangan lokal
  ], // Ganti dengan URL frontend yang terdeploy
  credentials: true, // Memungkinkan penggunaan cookies
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

app.use(cors(corsOptions)); // Menggunakan opsi CORS

// Menambahkan penanganan preflight request (OPTIONS)
app.options("*", cors(corsOptions)); // Menanggapi preflight requests

app.use(express.json());
app.use(cookieParser());
app.use(route);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
