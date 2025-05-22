import { useNavigate } from "react-router-dom";

function Dashboard() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-purple-50 flex flex-col items-center justify-center p-6 gap-8">
      <h1 className="text-5xl font-bold text-purple-700 mb-12">Dashboard</h1>

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
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-16 w-16 mb-4 text-purple-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 19V6h13M9 6H5a2 2 0 00-2 2v12a2 2 0 002 2h4z"
            />
          </svg>
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
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-16 w-16 mb-4 text-purple-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M20 13V7a2 2 0 00-2-2H6a2 2 0 00-2 2v6M9 21h6m-3-3v3"
            />
          </svg>
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
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-16 w-16 mb-4 text-purple-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M8 16h8M8 12h8M8 8h8M5 20h14a2 2 0 002-2v-8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
            />
          </svg>
          <h2 className="text-2xl font-semibold text-purple-800">Dokumentasi API</h2>
          <p className="mt-2 text-purple-600 text-center">Lihat dan pelajari dokumentasi API</p>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
