import { DataTypes } from "sequelize";
import db from "../config/Database.js";

const Merchandise = db.define("merchandise", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  nama_barang: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  harga_barang: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  deskripsi: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  gambar: {
    type: DataTypes.STRING,
    allowNull: true, // nama file atau URL gambar
  },
  stok: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0, // bisa kamu ubah sesuai kebutuhan
  },
}, {
  freezeTableName: true,
  timestamps: true,
  createdAt: "Tanggal_dibuat",
  updatedAt: "Tanggal_diperbarui",
});

export default Merchandise;
