import axios from "axios";

export const isAuthenticated = () => {
  return sessionStorage.getItem("isAuthenticated") === "true";
};

export const login = async (phone, password) => {
  try {
    const response = await axios.post(
      import.meta.env.VITE_BASE_URL + "admin/login",
      { phone, password },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const { adminId } = response.data.data;

    sessionStorage.setItem("isAuthenticated", "true");
    sessionStorage.setItem("adminId", adminId);
  } catch (error) {
    console.error("Login Error:", error);
    return null;
  }
};

export const logout = () => {
  sessionStorage.removeItem("isAuthenticated");
};

export const changePassword = async (newPassword) => {
  try {
    const adminId = sessionStorage.getItem("adminId");

    const response = await axios.put(
      import.meta.env.VITE_BASE_URL + `admin/updateAdmin/${adminId}`,
      { password: newPassword },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("Change Password Error:", error);
    throw error;
  }
};
