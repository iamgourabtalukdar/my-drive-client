const API_BASE = import.meta.env.VITE_API_BASE_URL;

const apiClient = {
  API_BASE,
};

apiClient.get = async function (url, queryObj = {}) {
  const queryKeys = Object.keys(queryObj);
  const queryString = queryKeys
    .map((key) => `${key}=${queryObj[key]}`)
    .join("&");

  const finalUrl = queryString
    ? `${this.API_BASE}${url}?${queryString}`
    : `${this.API_BASE}${url}`;
  try {
    return fetch(finalUrl, { credentials: "include" });
  } catch (error) {
    throw error;
  }
};

apiClient.post = async function (url, body = {}, isFormData = false) {
  try {
    const config = {
      method: "POST",
      body: isFormData ? body : JSON.stringify(body),
      headers: {}, // Start with an empty headers object
      credentials: "include",
    };

    // ONLY set the Content-Type header if it's NOT a FormData request
    if (!isFormData) {
      config.headers["Content-Type"] = "application/json";
    }
    // When isFormData is true, the headers object remains empty,
    // allowing the browser to set it correctly.
    return fetch(`${this.API_BASE}${url}`, config);
  } catch (error) {
    throw error;
  }
};

apiClient.patch = async function (url, body = {}, isFormData = false) {
  try {
    const config = {
      method: "PATCH",
      body: isFormData ? body : JSON.stringify(body),
      headers: {}, // Start with an empty headers object
      credentials: "include",
    };

    // ONLY set the Content-Type header if it's NOT a FormData request
    if (!isFormData) {
      config.headers["Content-Type"] = "application/json";
    }
    // When isFormData is true, the headers object remains empty,
    // allowing the browser to set it correctly.
    return fetch(`${this.API_BASE}${url}`, config);
  } catch (error) {
    throw error;
  }
};

apiClient.delete = async function (url) {
  try {
    return fetch(`${this.API_BASE}${url}`, {
      method: "DELETE",
      credentials: "include",
    });
  } catch (error) {
    throw error;
  }
};

export default apiClient;
