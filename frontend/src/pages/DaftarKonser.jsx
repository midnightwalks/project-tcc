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
    <div className="min-h-screen flex bg-purple-100">
      {/* Sidebar input konser */}
      <div className="w-96 bg-purple-50 p-6 shadow-lg space-y-4">
        <h2 className="text-2xl font-bold text-purple-800 mb-4 text-center">Tambah Konser</h2>
        <input
          type="text"
          value={namaKonser}
          onChange={(e) => setNamaKonser(e.target.value)}
          placeholder="Nama Konser"
          className="w-full px-3 py-2 border border-purple-300 rounded"
        />
        <input
          type="number"
          value={hargaTiket}
          onChange={(e) => setHargaTiket(e.target.value)}
          placeholder="Harga Tiket"
          className="w-full px-3 py-2 border border-purple-300 rounded"
        />
        <input
          type="date"
          value={tanggal}
          onChange={(e) => setTanggal(e.target.value)}
          className="w-full px-3 py-2 border border-purple-300 rounded"
        />
        <input
          type="text"
          value={tempat}
          onChange={(e) => setTempat(e.target.value)}
          placeholder="Tempat"
          className="w-full px-3 py-2 border border-purple-300 rounded"
        />
        <input
          type="text"
          value={waktu}
          onChange={(e) => setWaktu(e.target.value)}
          placeholder="Waktu (misal: 19:00)"
          className="w-full px-3 py-2 border border-purple-300 rounded"
        />
        <textarea
          value={deskripsi}
          onChange={(e) => setDeskripsi(e.target.value)}
          placeholder="Deskripsi"
          className="w-full px-3 py-2 border border-purple-300 rounded resize-y"
          rows={3}
        />
        <input
          type="text"
          value={gambar}
          onChange={(e) => setGambar(e.target.value)}
          placeholder="URL Gambar (opsional)"
          className="w-full px-3 py-2 border border-purple-300 rounded"
        />
        <button
          onClick={addKonser}
          className="bg-purple-500 hover:bg-purple-600 text-white font-semibold py-2 px-4 rounded-lg w-full"
        >
          Simpan Konser
        </button>

        <button
          onClick={handleLogout}
          className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-lg w-full mt-6"
        >
          🔓 Logout
        </button>
      </div>

      {/* Konten utama */}
      <div className="flex-1 p-8 overflow-auto">
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={() => navigate("/dashboard")}
            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg shadow"
          >
            🔙 Back
          </button>
          <h1 className="text-3xl font-bold text-purple-600 text-center flex-1">Daftar Konser</h1>
          <div className="w-32" /> {/* Spacer agar tombol back dan title center */}
        </div>

        <div className="flex justify-center mb-4">
          <button
            className="bg-purple-500 hover:bg-purple-600 text-white font-semibold py-2 px-4 rounded-lg shadow"
            onClick={handleRefresh}
          >
            🔄 Refresh
          </button>
        </div>

        {/* Kotak container untuk setiap konser */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {konserList.length > 0 ? (
            konserList.map((konser, index) => (
              <div
                key={konser.id}
                className="bg-white rounded-lg shadow p-4 flex flex-col"
              >
                {konser.isEditing ? (
                  <>
                    <input
                      type="text"
                      value={konser.nama_konser}
                      onChange={(e) => handleInputChange(konser.id, "nama_konser", e.target.value)}
                      className="mb-2 p-2 border rounded"
                      placeholder="Nama Konser"
                    />
                    <input
                      type="number"
                      value={konser.harga_tiket}
                      onChange={(e) => handleInputChange(konser.id, "harga_tiket", e.target.value)}
                      className="mb-2 p-2 border rounded"
                      placeholder="Harga Tiket"
                    />
                    <input
                      type="date"
                      value={konser.tanggal}
                      onChange={(e) => handleInputChange(konser.id, "tanggal", e.target.value)}
                      className="mb-2 p-2 border rounded"
                    />
                    <input
                      type="text"
                      value={konser.tempat}
                      onChange={(e) => handleInputChange(konser.id, "tempat", e.target.value)}
                      className="mb-2 p-2 border rounded"
                      placeholder="Tempat"
                    />
                    <input
                      type="text"
                      value={konser.waktu}
                      onChange={(e) => handleInputChange(konser.id, "waktu", e.target.value)}
                      className="mb-2 p-2 border rounded"
                      placeholder="Waktu (misal: 19:00)"
                    />
                    <textarea
                      value={konser.deskripsi}
                      onChange={(e) => handleInputChange(konser.id, "deskripsi", e.target.value)}
                      className="mb-2 p-2 border rounded resize-y"
                      rows={3}
                      placeholder="Deskripsi"
                    />
                    <input
                      type="text"
                      value={konser.gambar || ""}
                      onChange={(e) => handleInputChange(konser.id, "gambar", e.target.value)}
                      className="mb-4 p-2 border rounded"
                      placeholder="URL Gambar (opsional)"
                    />
                    <div className="flex justify-between">
                      <button
                        onClick={() => {
                          saveKonser(konser.id, konser);
                          toggleEditMode(konser.id);
                        }}
                        className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded"
                      >
                        💾 Simpan
                      </button>
                      <button
                        onClick={() => toggleEditMode(konser.id)}
                        className="bg-gray-400 hover:bg-gray-500 text-white px-3 py-1 rounded"
                      >
                        ❌ Batal
                      </button>
                    </div>
                  </>
                ) : (
                  <>
                    <h3 className="text-xl font-bold mb-2">{konser.nama_konser}</h3>
                    <p className="mb-1">
                      <strong>Harga Tiket:</strong> Rp {Number(konser.harga_tiket).toLocaleString()}
                    </p>
                    <p className="mb-1">
                      <strong>Tanggal:</strong> {konser.tanggal}
                    </p>
                    <p className="mb-1">
                      <strong>Tempat:</strong> {konser.tempat}
                    </p>
                    <p className="mb-1">
                      <strong>Waktu:</strong> {konser.waktu}
                    </p>
                    <p className="mb-2 line-clamp-3">
                      <strong>Deskripsi:</strong> {konser.deskripsi}
                    </p>
                    {konser.gambar ? (
                      <img
                        src={konser.gambar}
                        alt={konser.nama_konser}
                        className="h-32 w-full object-cover rounded mb-4"
                      />
                    ) : (
                      <div className="h-32 w-full bg-gray-100 rounded mb-4 flex items-center justify-center text-gray-400 italic">
                        No Image
                      </div>
                    )}
                    <div className="flex gap-2 justify-end">
                      <button
                        onClick={() => toggleEditMode(konser.id)}
                        className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded"
                      >
                        ✏️ Edit
                      </button>
                      <button
                        onClick={() => deleteKonser(konser.id)}
                        className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                      >
                        🗑️ Hapus
                      </button>
                    </div>
                  </>
                )}
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500 col-span-full">
              Tidak ada data konser
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default DaftarKonserApp;
