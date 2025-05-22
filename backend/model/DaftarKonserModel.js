import { DataTypes } from "sequelize";
import db from "../config/Database.js";

const DaftarKonser = db.define("daftar_konser", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  nama_konser: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  harga_tiket: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  tanggal: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
  tempat: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  waktu: {
    type: DataTypes.TIME,
    allowNull: false,
  },
  deskripsi: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  gambar: {
    type: DataTypes.STRING,
    allowNull: true, // Jika gambar opsional (nama file gambar / URL)
  }
}, {
  freezeTableName: true,
  timestamps: true,
  createdAt: "Tanggal_dibuat",
  updatedAt: "Tanggal_diperbarui",
});

export default DaftarKonser;
