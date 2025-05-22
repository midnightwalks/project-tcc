import DaftarKonser from "../model/DaftarKonserModel.js";

// Create
export const createKonser = async (req, res) => {
  const {
    nama_konser,
    harga_tiket,
    tanggal,
    tempat,
    waktu,
    deskripsi,
    gambar,
  } = req.body;

  try {
    const konser = await DaftarKonser.create({
      nama_konser,
      harga_tiket,
      tanggal,
      tempat,
      waktu,
      deskripsi,
      gambar,
    });

    res.status(201).json({
      message: "Konser berhasil dibuat",
      data: konser,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Read
export const getKonser = async (req, res) => {
  try {
    const konser = await DaftarKonser.findAll();

    res.status(200).json({
      message: "Data konser berhasil diambil",
      data: konser,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update
export const updateKonser = async (req, res) => {
  const { id } = req.params;
  const {
    nama_konser,
    harga_tiket,
    tanggal,
    tempat,
    waktu,
    deskripsi,
    gambar,
  } = req.body;

  try {
    const konser = await DaftarKonser.update(
      {
        nama_konser,
        harga_tiket,
        tanggal,
        tempat,
        waktu,
        deskripsi,
        gambar,
      },
      {
        where: { id },
      }
    );

    res.status(200).json({
      message: "Data konser berhasil diupdate",
      data: konser,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete
export const deleteKonser = async (req, res) => {
  const { id } = req.params;

  try {
    const konser = await DaftarKonser.destroy({
      where: { id },
    });

    res.status(200).json({
      message: "Data konser berhasil dihapus",
      data: konser,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
