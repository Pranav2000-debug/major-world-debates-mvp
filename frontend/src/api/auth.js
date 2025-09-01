import axios from "axios";

export const refreshToken = async () => {
  try {
    const storedRefreshToken = localStorage.getItem("refreshToken");
    if (!storedRefreshToken) return null;

    const res = await axios.post("http://localhost:5000/api/users/refresh", {
      refreshToken: storedRefreshToken,
    });

    localStorage.setItem("token", res.data.token);
    return res.data.token;
  } catch (err) {
    console.error("Refresh failed:", err);
    localStorage.clear();
    return null;
  }
};
