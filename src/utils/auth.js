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

    sessionStorage.setItem("isAuthenticated", "true");
  } catch (error) {
    console.error("Login Error:", error);
    return null;
  }
};

export const logout = () => {
  sessionStorage.removeItem("isAuthenticated");
};
