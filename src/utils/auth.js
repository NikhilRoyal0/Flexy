import axios from "axios";

export const isAuthenticated = () => {
  return sessionStorage.getItem("token") !== null;
};

export const login = async (phone, password) => {
  try {
    const response = await axios.post(
      import.meta.env.VITE_BASE_URL + "client/login",
      { phone, password },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const { fcmToken } = response.data.data;
    console.log("Token:", fcmToken);

    sessionStorage.setItem("token", fcmToken);

    return fcmToken;
  } catch (error) {
    console.error("Login Error:", error);
    return null;
  }
};

export const logout = () => {
  sessionStorage.removeItem("token");
};

export const getFCMToken = () => {
  return sessionStorage.getItem("fcmToken");
};

export const setFCMToken = (token) => {
  sessionStorage.setItem("fcmToken", token);
};

export const removeFCMToken = () => {
  sessionStorage.removeItem("fcmToken");
};
