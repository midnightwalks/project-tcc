import db from "../config/Database.js";
import Users from "./UsersModel.js";
import DaftarKonser from "./DaftarKonserModel.js";
import Merchandise from "./MerchandiseModel.js";

// (Jika kamu ingin menambahkan relasi konser/merchandise ke user, tinggal aktifkan contoh di bawah ini)
Users.hasMany(DaftarKonser, { foreignKey: "userId", onDelete: "CASCADE" });
DaftarKonser.belongsTo(Users, { foreignKey: "userId" });

Users.hasMany(Merchandise, { foreignKey: "userId", onDelete: "CASCADE" });
Merchandise.belongsTo(Users, { foreignKey: "userId" });

// Sinkronisasi semua tabel
(async () => {
  try {
    await db.authenticate();
    console.log("Koneksi database berhasil!");

    await db.sync({ alter: true }); // bisa diganti `force: true` untuk reset semua tabel
    console.log("Semua tabel berhasil disinkronisasi.");
  } catch (err) {
    console.error("Gagal konek DB:", err);
  }
})();

export { Users, DaftarKonser, Merchandise };
