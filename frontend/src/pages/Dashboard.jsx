import { useNavigate } from "react-router-dom";

function Dashboard() {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Tambahkan logika logout seperti menghapus token dari localStorage
    localStorage.removeItem("token"); // jika pakai token
    navigate("/login"); // redirect ke halaman login
  };

  return (
    <div className="min-h-screen bg-purple-50 p-6 relative">
      {/* Tombol Logout di kanan atas */}
      <div className="absolute top-6 right-6">
        <button
          onClick={handleLogout}
          className="bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600 transition"
        >
          Logout
        </button>
      </div>

      <div className="flex flex-col items-center justify-center gap-8 mt-8">
        <img
          src="/logopurple.png"
          alt="Logo"
          className="w-70 gap-8 mt-35 mb-3 drop-shadow-md"
        />

        <div className="flex flex-col md:flex-row gap-8 max-w-4xl w-full justify-center">
          {/* Container Daftar Konser */}
          <div
            onClick={() => navigate("/daftar-konser")}
            className="cursor-pointer bg-white shadow-lg rounded-lg p-10 flex flex-col items-center justify-center
                       w-72 h-48 hover:bg-purple-200 transition-colors duration-300"
            role="button"
            tabIndex={0}
            onKeyDown={(e) => e.key === "Enter" && navigate("/daftar-konser")}
          >
            <img src="/logopurple.png" alt="Daftar Konser Icon" className="h-5 mb-4" />
            <h2 className="text-2xl font-semibold text-purple-800">Daftar Konser</h2>
            <p className="mt-2 text-purple-600 text-center">Lihat dan kelola daftar konser</p>
          </div>

          {/* Container Merchandise */}
          <div
            onClick={() => navigate("/merchandise")}
            className="cursor-pointer bg-white shadow-lg rounded-lg p-10 flex flex-col items-center justify-center
                       w-72 h-48 hover:bg-purple-200 transition-colors duration-300"
            role="button"
            tabIndex={0}
            onKeyDown={(e) => e.key === "Enter" && navigate("/merchandise")}
          >
            <img src="/logopurple.png" alt="Merchandise Icon" className="h-5 mb-8" />
            <h2 className="text-2xl font-semibold text-purple-800">Merchandise</h2>
            <p className="mt-2 text-purple-600 text-center">Kelola produk merchandise</p>
          </div>

          {/* Container Dokumentasi API */}
          <div
            onClick={() => navigate("/documentation")}
            className="cursor-pointer bg-white shadow-lg rounded-lg p-10 flex flex-col items-center justify-center
                       w-72 h-48 hover:bg-purple-200 transition-colors duration-300"
            role="button"
            tabIndex={0}
            onKeyDown={(e) => e.key === "Enter" && navigate("/documentation")}
          >
            <img src="/logopurple.png" alt="Dokumentasi Icon" className="h-5 mb-4" />
            <h2 className="text-2xl font-semibold text-purple-800">Dokumentasi API</h2>
            <p className="mt-2 text-purple-600 text-center">Lihat dan pelajari dokumentasi API</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
