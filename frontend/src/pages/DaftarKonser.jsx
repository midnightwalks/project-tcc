import { useState, useEffect } from "react";
import { BASE_URL } from "../utils/utils.js";
import { useNavigate } from "react-router-dom";
import axios from "../api/axiosInstance.js";
import useAuth from "../auth/useAuth.js";

function DaftarKonserApp() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const [konserList, setKonserList] = useState([]);
  const [namaKonser, setNamaKonser] = useState("");
  const [hargaTiket, setHargaTiket] = useState("");
  const [tanggal, setTanggal] = useState("");
  const [tempat, setTempat] = useState("");
  const [waktu, setWaktu] = useState("");
  const [deskripsi, setDeskripsi] = useState("");
  const [gambar, setGambar] = useState("");

  useEffect(() => {
    fetchKonser();
  }, []);

  const fetchKonser = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/daftarkonser`);
      setKonserList(response.data.data);
    } catch (error) {
      console.error("Error fetching daftar konser:", error);
    }
  };

  const addKonser = async () => {
    if (!namaKonser.trim() || !hargaTiket || !tanggal || !tempat.trim() || !waktu.trim() || !deskripsi.trim()) return;

    try {
      const response = await axios.post(`${BASE_URL}/daftarkonser`, {
        nama_konser: namaKonser,
        harga_tiket: Number(hargaTiket),
        tanggal,
        tempat,
        waktu,
        deskripsi,
        gambar,
      });
      if (response.data.data) {
        setKonserList((prev) => [...prev, response.data.data]);
        setNamaKonser("");
        setHargaTiket("");
        setTanggal("");
        setTempat("");
        setWaktu("");
        setDeskripsi("");
        setGambar("");
      }
    } catch (error) {
      console.error("Error adding daftar konser:", error);
    }
  };

  const deleteKonser = async (id) => {
    try {
      await axios.delete(`${BASE_URL}/daftarkonser/${id}`);
      setKonserList((prev) => prev.filter((konser) => konser.id !== id));
    } catch (error) {
      console.error("Error deleting daftar konser:", error);
    }
  };

  const toggleEditMode = (id) => {
    setKonserList((prev) =>
      prev.map((konser) =>
        konser.id === id ? { ...konser, isEditing: !konser.isEditing } : konser
      )
    );
  };

  const handleInputChange = (id, field, value) => {
    setKonserList((prev) =>
      prev.map((konser) =>
        konser.id === id ? { ...konser, [field]: value } : konser
      )
    );
  };

  const saveKonser = async (id, updatedKonser) => {
    if (
      !updatedKonser.nama_konser.trim() ||
      !updatedKonser.harga_tiket ||
      !updatedKonser.tanggal ||
      !updatedKonser.tempat.trim() ||
      !updatedKonser.waktu.trim() ||
      !updatedKonser.deskripsi.trim()
    ) return;

    try {
      const response = await axios.put(`${BASE_URL}/daftarkonser/${id}`, {
        nama_konser: updatedKonser.nama_konser,
        harga_tiket: Number(updatedKonser.harga_tiket),
        tanggal: updatedKonser.tanggal,
        tempat: updatedKonser.tempat,
        waktu: updatedKonser.waktu,
        deskripsi: updatedKonser.deskripsi,
        gambar: updatedKonser.gambar,
      });

      if (response.data.data) {
        await fetchKonser();
      } else {
        alert("Gagal simpan data");
      }
    } catch (error) {
      console.error("Error updating daftar konser:", error);
    }
  };

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  const handleRefresh = async () => {
    await fetchKonser();
  };

  return (
    <div className="min-h-screen bg-purple-100 p-4 flex flex-col">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-4xl font-bold text-purple-700">Daftar Konser</h1>
        <button
          onClick={() => navigate("/dashboard")}
          className="bg-purple-500 hover:bg-purple-600 text-white font-semibold py-2 px-4 rounded-lg shadow"
        >
          Back
        </button>
      </div>

      <div className="flex flex-1 gap-6 flex-col md:flex-row">
        {/* KIRI: List konser dalam kotak-kotak grid */}
        <div className="flex-1 bg-white rounded-lg shadow p-4 overflow-auto max-h-[70vh]">
          <div className="flex justify-between items-center mb-4 border-b border-purple-200 pb-2">
            <h2 className="font-semibold text-lg text-purple-900">List Konser</h2>
          </div>

          {konserList.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {konserList.map((konser) => (
                <div
                  key={konser.id}
                  className="bg-purple-50 rounded-lg p-4 flex flex-col shadow"
                >
                  {konser.isEditing ? (
                    <>
                      <input
                        type="text"
                        value={konser.nama_konser}
                        onChange={(e) => handleInputChange(konser.id, "nama_konser", e.target.value)}
                        placeholder="Nama Konser"
                        className="mb-2 p-2 border rounded focus:outline-none focus:ring-2 focus:ring-purple-400"
                      />
                      <input
                        type="number"
                        value={konser.harga_tiket}
                        onChange={(e) => handleInputChange(konser.id, "harga_tiket", e.target.value)}
                        placeholder="Harga Tiket"
                        className="mb-2 p-2 border rounded focus:outline-none focus:ring-2 focus:ring-purple-400"
                      />
                      <input
                        type="date"
                        value={konser.tanggal}
                        onChange={(e) => handleInputChange(konser.id, "tanggal", e.target.value)}
                        className="mb-2 p-2 border rounded focus:outline-none focus:ring-2 focus:ring-purple-400"
                      />
                      <input
                        type="text"
                        value={konser.tempat}
                        onChange={(e) => handleInputChange(konser.id, "tempat", e.target.value)}
                        placeholder="Tempat"
                        className="mb-2 p-2 border rounded focus:outline-none focus:ring-2 focus:ring-purple-400"
                      />
                      <input
                        type="text"
                        value={konser.waktu}
                        onChange={(e) => handleInputChange(konser.id, "waktu", e.target.value)}
                        placeholder="Waktu (misal: 19:00)"
                        className="mb-2 p-2 border rounded focus:outline-none focus:ring-2 focus:ring-purple-400"
                      />
                      <textarea
                        value={konser.deskripsi}
                        onChange={(e) => handleInputChange(konser.id, "deskripsi", e.target.value)}
                        placeholder="Deskripsi"
                        rows={3}
                        className="mb-2 p-2 border rounded resize-y focus:outline-none focus:ring-2 focus:ring-purple-400"
                      />
                      <input
                        type="file"
                        value={konser.gambar || ""}
                        onChange={(e) => handleInputChange(konser.id, "gambar", e.target.value)}
                        placeholder="URL Gambar"
                        className="mb-4 p-2 border rounded focus:outline-none focus:ring-2 focus:ring-purple-400"
                      />
                      <div className="flex gap-2 mt-auto">
                        <button
                          onClick={() => {
                            saveKonser(konser.id, konser);
                            toggleEditMode(konser.id);
                          }}
                          className="flex-1 bg-green-500 hover:bg-green-600 text-white py-2 rounded"
                        >
                          💾 Simpan
                        </button>
                        <button
                          onClick={() => toggleEditMode(konser.id)}
                          className="flex-1 bg-gray-400 hover:bg-gray-500 text-white py-2 rounded"
                        >
                          ✖ Batal
                        </button>
                      </div>
                    </>
                  ) : (
                    <>
                      {konser.gambar ? (
                        <img
                          src={konser.gambar}
                          alt={konser.nama_konser}
                          className="h-40 w-full object-cover rounded mb-3"
                        />
                      ) : (
                        <div className="h-40 w-full bg-gray-200 rounded mb-3 flex items-center justify-center text-gray-400 italic">
                          No Image
                        </div>
                      )}

                      <h3 className="text-xl font-semibold mb-1">{konser.nama_konser}</h3>
                      <p className="text-purple-700 font-bold mb-1">
                        Rp {Number(konser.harga_tiket).toLocaleString("id-ID")}
                      </p>
                      <p className="mb-1">Tanggal: {konser.tanggal}</p>
                      <p className="mb-1">Tempat: {konser.tempat}</p>
                      <p className="mb-1">Waktu: {konser.waktu}</p>
                      <p className="text-gray-700 text-sm line-clamp-3 mb-4">{konser.deskripsi}</p>
                      <div className="flex gap-2 mt-auto">
                        <button
                          onClick={() => toggleEditMode(konser.id)}
                          className="flex-1 bg-purple-400 hover:bg-purple-500 text-white py-2 rounded"
                        >
                          ✏️ Edit
                        </button>
                        <button
                          onClick={() => deleteKonser(konser.id)}
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
            <p className="text-center text-gray-500 mt-10">Tidak ada data konser.</p>
          )}
        </div>

        {/* KANAN: Form input tambah konser */}
        <div className="w-full md:w-96 bg-purple-50 p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold text-purple-700 mb-4">Tambah Konser</h2>

          <input
            type="text"
            value={namaKonser}
            onChange={(e) => setNamaKonser(e.target.value)}
            placeholder="Nama Konser"
            className="w-full px-3 py-2 border border-purple-300 rounded mb-3 focus:outline-none focus:ring-2 focus:ring-purple-300"
          />
          <input
            type="number"
            value={hargaTiket}
            onChange={(e) => setHargaTiket(e.target.value)}
            placeholder="Harga Tiket"
            className="w-full px-3 py-2 border border-purple-300 rounded mb-3 focus:outline-none focus:ring-2 focus:ring-purple-300"
          />
          <input
            type="date"
            value={tanggal}
            onChange={(e) => setTanggal(e.target.value)}
            className="w-full px-3 py-2 border border-purple-300 rounded mb-3 focus:outline-none focus:ring-2 focus:ring-purple-300"
          />
          <input
            type="text"
            value={tempat}
            onChange={(e) => setTempat(e.target.value)}
            placeholder="Tempat"
            className="w-full px-3 py-2 border border-purple-300 rounded mb-3 focus:outline-none focus:ring-2 focus:ring-purple-300"
          />
          <input
            type="text"
            value={waktu}
            onChange={(e) => setWaktu(e.target.value)}
            placeholder="Waktu (misal: 19:00)"
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
            onClick={addKonser}
            className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 rounded shadow"
          >
            ➕ Tambah Konser
          </button>
        </div>
      </div>
    </div>
  );
}

export default DaftarKonserApp;