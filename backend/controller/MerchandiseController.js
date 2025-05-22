import Merchandise from "../model/MerchandiseModel.js";

// CREATE
export const createMerchandise = async (req, res) => {
  const {
    nama_barang,
    harga_barang,
    deskripsi,
    gambar,
    stok,
  } = req.body;

  try {
    const merchandise = await Merchandise.create({
      nama_barang,
      harga_barang,
      deskripsi,
      gambar,
      stok,
    });

    res.status(201).json({
      message: "Merchandise berhasil dibuat",
      data: merchandise,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// READ (Get All)
export const getMerchandise = async (req, res) => {
  try {
    const merchandises = await Merchandise.findAll();

    res.status(200).json({
      message: "Data merchandise berhasil diambil",
      data: merchandises,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// UPDATE
export const updateMerchandise = async (req, res) => {
  const { id } = req.params;
  const {
    nama_barang,
    harga_barang,
    deskripsi,
    gambar,
    stok,
  } = req.body;

  try {
    const merchandise = await Merchandise.update(
      {
        nama_barang,
        harga_barang,
        deskripsi,
        gambar,
        stok,
      },
      {
        where: { id },
      }
    );

    res.status(200).json({
      message: "Merchandise berhasil diupdate",
      data: merchandise,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// DELETE
export const deleteMerchandise = async (req, res) => {
  const { id } = req.params;

  try {
    const deleted = await Merchandise.destroy({
      where: { id },
    });

    res.status(200).json({
      message: "Merchandise berhasil dihapus",
      data: deleted,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
