export const isAuthenticated = () => {
  const isLoggedIn = sessionStorage.getItem("isLoggedIn");

  return isLoggedIn === "true";
};

export const login = (email, password) => {
  if (email === "admin" && password === "admin") {
      sessionStorage.setItem("isLoggedIn", "true");
      return true;
  }
  return false;
};


export const logout = () => {
  sessionStorage.removeItem("isLoggedIn");
};
