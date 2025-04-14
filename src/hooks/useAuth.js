import { useState } from "react";
import { signIn, signUp } from "../api/authApi";

const useAuth = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [serverErrors, setServerErrors] = useState({});

  const makeSignUp = async (name, email, password) => {
    try {
      setLoading(true);
      setError(null);
      setServerErrors({});

      const response = await signUp(name, email, password);
      const data = await response.json();

      if (!response.ok) {
        // Handle field-specific errors
        if (data.errors) {
          setServerErrors(data.errors);
          throw new Error("Validation failed");
        }
        // Handle general errors
        if (data.message) {
          setError(data.message);
          throw new Error(data.message);
        }
        throw new Error("Registration failed");
      }

      return data;
    } catch (err) {
      // Handle network errors
      if (err.message === "Failed to fetch") {
        setError("Network error. Please check your connection.");
      }
      // Re-throw the error for the component to handle
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const makeSignIn = async (email, password) => {
    try {
      setLoading(true);
      setError(null);
      setServerErrors({});

      const response = await signIn(email, password);
      const data = await response.json();

      if (!response.ok) {
        // Handle field-specific errors
        if (data.errors) {
          console.log(data.errors);
          setServerErrors(data.errors);
          throw new Error("Invalid Credentials");
        }
        // Handle general errors
        if (data.message) {
          setError(data.message);
          throw new Error(data.message);
        }
        throw new Error("Login failed");
      }

      return data;
    } catch (err) {
      // Handle network errors
      if (err.message === "Failed to fetch") {
        setError("Network error. Please check your connection.");
      }
      // Re-throw the error for the component to handle
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    error,
    serverErrors,
    setError,
    makeSignUp,
    makeSignIn,
  };
};

export default useAuth;
