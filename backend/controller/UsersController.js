import Users from "../model/UsersModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const Register = async (req, res) => {
  const { username, password } = req.body;

  // Hash Password
  const hashPassword = await bcrypt.hash(password, 5);

  try {
    const data = await Users.create({
      username,
      password: hashPassword,
    });

    res.status(201).json({
      message: "User berhasil dibuat",
      data,
    });
  } catch (error) {
    res.status(500).json({
      message: "Terjadi Kesalahan",
      error: error.message,
    });
  }
};

export const Login = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await Users.findOne({ where: { username } });

    if (!user) {
      return res.status(404).json({ message: "User tidak ditemukan" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: "Password salah" });
    }

    // JWT Sign
    const accessToken = jwt.sign(
      { id: user.id, username: user.username },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "30s" }
    );
    const refreshToken = jwt.sign(
      { id: user.id, username: user.username },
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: "1d" }
    );

    await Users.update(
      { refresh_token: refreshToken },
      { where: { id: user.id } }
    );

    // Set Cookie
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000, // 1 day
    });

    // Response
    return res.status(200).json({
      accessToken,
      message: "Login berhasil",
    });
  } catch (error) {
    res.status(500).json({
      message: "Terjadi Kesalahan",
      error: error.message,
    });
  }
};

export const refreshToken = async (req, res) => {
  try {
    // Cookie Validation
    const refreshToken = req.cookies.refreshToken; // Sesuaikan nama cookie
    if (!refreshToken) return res.sendStatus(401); // Unauthorized

    // User Validation
    const user = await Users.findOne({
      where: { refresh_token: refreshToken },
    });
    if (!user) return res.status(403).json({ message: "User tidak ditemukan" });

    // Verify JWT
    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
      if (err) {
        return res.status(403).json({ message: "Invalid refresh token" });
      }

      const { id, username } = user; // Pastikan data ini sesuai dengan payload JWT sebelumnya
      const accessToken = jwt.sign(
        { id, username },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: "30s" }
      );

      res.json({ accessToken });
    });
  } catch (error) {
    res.status(500).json({
      message: "Terjadi Kesalahan",
      error: error.message,
    });
  }
};

export const logout = async (req, res) => {
  try {
    const refreshToken = req.cookies.refreshToken; // Sesuaikan nama cookie
    if (!refreshToken) return res.sendStatus(204); // No Content, berarti user sudah logout

    // User Validation
    const data = await Users.findOne({
      where: { refresh_token: refreshToken },
    });
    if (!data) return res.status(204).json("User Tidak Ditemukan");

    // Mengupdate refresh token menjadi null
    await Users.update({ refresh_token: null }, { where: { id: data.id } });

    // Menghapus refresh cookie
    res.clearCookie("refreshToken"); // Sesuaikan nama cookie

    // Response
    return res.status(200).json({
      message: "Logout Berhasil",
    });
  } catch (error) {
    res.status(500).json({
      message: "Terjadi Kesalahan",
      error: error.message,
    });
  }
};

