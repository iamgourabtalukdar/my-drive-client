const API_BASE = import.meta.env.VITE_API_BASE_URL;

export const signUp = async (name, email, password) => {
  try {
    const response = await fetch(`${API_BASE}/user/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, password }),
      credentials: "include", // For cookies if using session-based auth
    });

    return response;
  } catch (error) {
    console.error("Network error:", error);
    return Promise.reject({ message: "Network error. Please try again." });
  }
};

export const signIn = async (email, password) => {
  try {
    const response = await fetch(`${API_BASE}/user/signin`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
      credentials: "include", // For cookies if using session-based auth
    });

    return response;
  } catch (error) {
    console.error("Network error:", error);
    return Promise.reject({ message: "Network error. Please try again." });
  }
};
