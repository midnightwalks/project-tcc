import { useState, useEffect } from "react";
import { BASE_URL } from "../utils/utils.js";
import { useNavigate } from "react-router-dom";
import axios from '../api/axiosInstance.js';
import useAuth from "../auth/useAuth.js";

function DaftarMerchandiseApp() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const [merchList, setMerchList] = useState([]);
  const [namaMerch, setNamaMerch] = useState("");
  const [harga, setHarga] = useState("");
  const [stok, setStok] = useState("");
  const [deskripsi, setDeskripsi] = useState("");
  const [gambar, setGambar] = useState("");

  useEffect(() => {
    fetchMerch();
  }, []);

  const fetchMerch = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/merchandise`);
      const mappedData = response.data.data.map(item => ({
        ...item,
        harga: item.harga_barang,
        isEditing: false,
      }));
      setMerchList(mappedData);
    } catch (error) {
      console.error("Error fetching merchandise:", error);
    }
  };

  const addMerch = async () => {
    if (!namaMerch.trim() || !harga || !stok || !deskripsi.trim()) return;

    try {
      const response = await axios.post(`${BASE_URL}/merchandise`, {
        nama_barang: namaMerch,
        harga_barang: Number(harga),
        stok: Number(stok),
        deskripsi,
        gambar,
      });
      if (response.data.data) {
        const newItem = {
          ...response.data.data,
          harga: response.data.data.harga_barang,
          isEditing: false,
        };
        setMerchList((prev) => [...prev, newItem]);
        setNamaMerch("");
        setHarga("");
        setStok("");
        setDeskripsi("");
        setGambar("");
      }
    } catch (error) {
      console.error("Error adding merchandise:", error);
    }
  };

  const deleteMerch = async (id) => {
    try {
      await axios.delete(`${BASE_URL}/merchandise/${id}`);
      setMerchList((prev) => prev.filter((merch) => merch.id !== id));
    } catch (error) {
      console.error("Error deleting merchandise:", error);
    }
  };

  const toggleEditMode = (id) => {
    setMerchList((prev) =>
      prev.map((merch) =>
        merch.id === id ? { ...merch, isEditing: !merch.isEditing } : merch
      )
    );
  };

  const handleInputChange = (id, field, value) => {
    setMerchList((prev) =>
      prev.map((merch) =>
        merch.id === id ? { ...merch, [field]: value } : merch
      )
    );
  };

  const saveMerch = async (id, updatedMerch) => {
    if (
      !updatedMerch.nama_barang.trim() ||
      !updatedMerch.harga ||
      !updatedMerch.stok ||
      !updatedMerch.deskripsi.trim()
    ) return;

    try {
      const response = await axios.put(`${BASE_URL}/merchandise/${id}`, {
        nama_barang: updatedMerch.nama_barang,
        harga_barang: Number(updatedMerch.harga),
        stok: Number(updatedMerch.stok),
        deskripsi: updatedMerch.deskripsi,
        gambar: updatedMerch.gambar,
      });

      if (response.data.data) {
        await fetchMerch();
      } else {
        alert("Gagal simpan data");
      }
    } catch (error) {
      console.error("Error updating merchandise:", error);
    }
  };

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  const handleRefresh = async () => {
    await fetchMerch();
  };

  return (
    <div className="min-h-screen bg-purple-100 p-4 flex flex-col">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-4xl font-bold text-purple-700">Daftar Merchandise</h1>
        <button
          onClick={() => navigate("/dashboard")}
          className="bg-purple-500 hover:bg-purple-600 text-white font-semibold py-2 px-4 rounded-lg shadow"
        >
        Back
        </button>
      </div>

      <div className="flex flex-1 gap-6 flex-col md:flex-row">
        {/* KIRI: List merchandise dalam kotak-kotak grid */}
        <div className="flex-1 bg-white rounded-lg shadow p-4 overflow-auto max-h-[70vh]">
          <div className="flex justify-between items-center mb-4 border-b border-purple-200 pb-2">
            <h2 className="font-semibold text-lg text-purple-900">List Merchandise</h2>
          </div>

          {merchList.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {merchList.map((merch) => (
                <div
                  key={merch.id}
                  className="bg-purple-50 rounded-lg p-4 flex flex-col shadow"
                >
                  {merch.isEditing ? (
                    <>
                      <input
                        type="text"
                        value={merch.nama_barang}
                        onChange={(e) => handleInputChange(merch.id, "nama_barang", e.target.value)}
                        placeholder="Nama Merchandise"
                        className="mb-2 p-2 border rounded focus:outline-none focus:ring-2 focus:ring-purple-400"
                      />
                      <input
                        type="number"
                        value={merch.harga}
                        onChange={(e) => handleInputChange(merch.id, "harga", e.target.value)}
                        placeholder="Harga"
                        className="mb-2 p-2 border rounded focus:outline-none focus:ring-2 focus:ring-purple-400"
                      />
                      <input
                        type="number"
                        value={merch.stok}
                        onChange={(e) => handleInputChange(merch.id, "stok", e.target.value)}
                        placeholder="Stok"
                        className="mb-2 p-2 border rounded focus:outline-none focus:ring-2 focus:ring-purple-400"
                      />
                      <textarea
                        value={merch.deskripsi}
                        onChange={(e) => handleInputChange(merch.id, "deskripsi", e.target.value)}
                        placeholder="Deskripsi"
                        rows={3}
                        className="mb-2 p-2 border rounded resize-y focus:outline-none focus:ring-2 focus:ring-purple-400"
                      />
                      <input
                        type="text"
                        value={merch.gambar || ""}
                        onChange={(e) => handleInputChange(merch.id, "gambar", e.target.value)}
                        placeholder="URL Gambar"
                        className="mb-4 p-2 border rounded focus:outline-none focus:ring-2 focus:ring-purple-400"
                      />
                      <div className="flex gap-2 mt-auto">
                        <button
                          onClick={() => {
                            saveMerch(merch.id, merch);
                            toggleEditMode(merch.id);
                          }}
                          className="flex-1 bg-green-500 hover:bg-green-600 text-white py-2 rounded"
                        >
                          💾 Simpan
                        </button>
                        <button
                          onClick={() => toggleEditMode(merch.id)}
                          className="flex-1 bg-gray-400 hover:bg-gray-500 text-white py-2 rounded"
                        >
                          ✖ Batal
                        </button>
                      </div>
                    </>
                  ) : (
                    <>
                      {merch.gambar ? (
                        <img
                          src={merch.gambar}
                          alt={merch.nama_barang}
                          className="h-40 w-full object-cover rounded mb-3"
                        />
                      ) : (
                        <div className="h-40 w-full bg-gray-200 rounded mb-3 flex items-center justify-center text-gray-400 italic">
                          No Image
                        </div>
                      )}

                      <h3 className="text-xl font-semibold mb-1">{merch.nama_barang}</h3>
                      <p className="text-purple-700 font-bold mb-1">
                        Rp {Number(merch.harga).toLocaleString("id-ID")}
                      </p>
                      <p className="mb-1">Stok: {merch.stok}</p>
                      <p className="text-gray-700 text-sm line-clamp-3 mb-4">{merch.deskripsi}</p>
                      <div className="flex gap-2 mt-auto">
                        <button
                          onClick={() => toggleEditMode(merch.id)}
                          className="flex-1 bg-purple-400 hover:bg-purple-500 text-white py-2 rounded"
                        >
                          ✏️ Edit
                        </button>
                        <button
                          onClick={() => deleteMerch(merch.id)}
                          className="flex-1 bg-purple-500 hover:bg-purple-600 text-white py-2 rounded"
                        >
                          🗑️ Hapus
                        </button>
                      </div>
                    </>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-500 mt-10">Tidak ada data merchandise.</p>
          )}
        </div>

        {/* KANAN: Form input tambah merchandise */}
        <div className="w-full md:w-96 bg-purple-50 p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold text-purple-700 mb-4">Tambah Merchandise</h2>

          <input
            type="text"
            value={namaMerch}
            onChange={(e) => setNamaMerch(e.target.value)}
            placeholder="Nama Merchandise"
            className="w-full px-3 py-2 border border-purple-300 rounded mb-3 focus:outline-none focus:ring-2 focus:ring-purple-300"
          />
          <input
            type="number"
            value={harga}
            onChange={(e) => setHarga(e.target.value)}
            placeholder="Harga"
            className="w-full px-3 py-2 border border-purple-300 rounded mb-3 focus:outline-none focus:ring-2 focus:ring-purple-300"
          />
          <input
            type="number"
            value={stok}
            onChange={(e) => setStok(e.target.value)}
            placeholder="Stok"
            className="w-full px-3 py-2 border border-purple-300 rounded mb-3 focus:outline-none focus:ring-2 focus:ring-purple-300"
          />
          <textarea
            value={deskripsi}
            onChange={(e) => setDeskripsi(e.target.value)}
            placeholder="Deskripsi"
            rows={4}
            className="w-full px-3 py-2 border border-purple-300 rounded mb-3 resize-y focus:outline-none focus:ring-2 focus:ring-purple-300"
          />
          <input
            type="text"
            value={gambar}
            onChange={(e) => setGambar(e.target.value)}
            placeholder="URL Gambar (optional)"
            className="w-full px-3 py-2 border border-purple-300 rounded mb-5 focus:outline-none focus:ring-2 focus:ring-purple-300"
          />

          <button
            onClick={addMerch}
            className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 rounded shadow"
          >
            ➕ Tambah Merchandise
          </button>
        </div>
      </div>
    </div>
  );
}

export default DaftarMerchandiseApp;
