import React from "react";
import { useNavigate } from "react-router-dom";

export default function Documentation() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-purple-50 flex flex-col items-center p-8 relative">
      {/* Tombol Back di kanan atas */}
      <button
        onClick={() => navigate("/dashboard")}
        className="absolute top-8 right-8 px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 transition"
      >
        Back
      </button>

      <h1 className="text-4xl font-bold text-purple-700 mb-8 mt-4">Dokumentasi REST API</h1>

      <div className="overflow-x-auto w-full max-w-6xl bg-white rounded-lg shadow p-6">
        <table className="w-full table-auto border-collapse border border-gray-300">
          <thead>
            <tr className="bg-purple-100">
              <th className="border border-gray-300 px-4 py-2 text-left">Method</th>
              <th className="border border-gray-300 px-4 py-2 text-left">Endpoint</th>
              <th className="border border-gray-300 px-4 py-2 text-left">Auth</th>
              <th className="border border-gray-300 px-4 py-2 text-left">Deskripsi</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border border-gray-300 px-4 py-2">POST</td>
              <td className="border border-gray-300 px-4 py-2">/register</td>
              <td className="border border-gray-300 px-4 py-2">No</td>
              <td className="border border-gray-300 px-4 py-2">Registrasi user baru</td>
            </tr>
            <tr className="bg-gray-50">
              <td className="border border-gray-300 px-4 py-2">POST</td>
              <td className="border border-gray-300 px-4 py-2">/login</td>
              <td className="border border-gray-300 px-4 py-2">No</td>
              <td className="border border-gray-300 px-4 py-2">Login user dan dapatkan token</td>
            </tr>
            <tr>
              <td className="border border-gray-300 px-4 py-2">GET</td>
              <td className="border border-gray-300 px-4 py-2">/token</td>
              <td className="border border-gray-300 px-4 py-2">No</td>
              <td className="border border-gray-300 px-4 py-2">Dapatkan access token baru dengan refresh token</td>
            </tr>
            <tr className="bg-gray-50">
              <td className="border border-gray-300 px-4 py-2">DELETE</td>
              <td className="border border-gray-300 px-4 py-2">/logout</td>
              <td className="border border-gray-300 px-4 py-2">No</td>
              <td className="border border-gray-300 px-4 py-2">Logout user dan hapus refresh token</td>
            </tr>
            <tr>
              <td className="border border-gray-300 px-4 py-2">GET</td>
              <td className="border border-gray-300 px-4 py-2">/daftarkonser</td>
              <td className="border border-gray-300 px-4 py-2">No</td>
              <td className="border border-gray-300 px-4 py-2">Ambil semua data konser</td>
            </tr>
            <tr className="bg-gray-50">
              <td className="border border-gray-300 px-4 py-2">GET</td>
              <td className="border border-gray-300 px-4 py-2">/daftarkonser/:id</td>
              <td className="border border-gray-300 px-4 py-2">No</td>
              <td className="border border-gray-300 px-4 py-2">Ambil data konser berdasarkan ID</td>
            </tr>
            <tr>
              <td className="border border-gray-300 px-4 py-2">POST</td>
              <td className="border border-gray-300 px-4 py-2">/daftarkonser</td>
              <td className="border border-gray-300 px-4 py-2">Yes</td>
              <td className="border border-gray-300 px-4 py-2">Tambah data konser baru</td>
            </tr>
            <tr className="bg-gray-50">
              <td className="border border-gray-300 px-4 py-2">PUT</td>
              <td className="border border-gray-300 px-4 py-2">/daftarkonser/:id</td>
              <td className="border border-gray-300 px-4 py-2">Yes</td>
              <td className="border border-gray-300 px-4 py-2">Update data konser berdasarkan ID</td>
            </tr>
            <tr>
              <td className="border border-gray-300 px-4 py-2">DELETE</td>
              <td className="border border-gray-300 px-4 py-2">/daftarkonser/:id</td>
              <td className="border border-gray-300 px-4 py-2">Yes</td>
              <td className="border border-gray-300 px-4 py-2">Hapus data konser berdasarkan ID</td>
            </tr>
            <tr className="bg-gray-50">
              <td className="border border-gray-300 px-4 py-2">GET</td>
              <td className="border border-gray-300 px-4 py-2">/merchandise</td>
              <td className="border border-gray-300 px-4 py-2">No</td>
              <td className="border border-gray-300 px-4 py-2">Ambil semua data merchandise</td>
            </tr>
            <tr>
              <td className="border border-gray-300 px-4 py-2">GET</td>
              <td className="border border-gray-300 px-4 py-2">/merchandise/:id</td>
              <td className="border border-gray-300 px-4 py-2">No</td>
              <td className="border border-gray-300 px-4 py-2">Ambil data merchandise berdasarkan ID</td>
            </tr>
            <tr className="bg-gray-50">
              <td className="border border-gray-300 px-4 py-2">POST</td>
              <td className="border border-gray-300 px-4 py-2">/merchandise</td>
              <td className="border border-gray-300 px-4 py-2">Yes</td>
              <td className="border border-gray-300 px-4 py-2">Tambah data merchandise baru</td>
            </tr>
            <tr>
              <td className="border border-gray-300 px-4 py-2">PUT</td>
              <td className="border border-gray-300 px-4 py-2">/merchandise/:id</td>
              <td className="border border-gray-300 px-4 py-2">Yes</td>
              <td className="border border-gray-300 px-4 py-2">Update data merchandise berdasarkan ID</td>
            </tr>
            <tr className="bg-gray-50">
              <td className="border border-gray-300 px-4 py-2">DELETE</td>
              <td className="border border-gray-300 px-4 py-2">/merchandise/:id</td>
              <td className="border border-gray-300 px-4 py-2">Yes</td>
              <td className="border border-gray-300 px-4 py-2">Hapus data merchandise berdasarkan ID</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
