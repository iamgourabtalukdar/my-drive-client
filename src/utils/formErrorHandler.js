import toast from "react-hot-toast";

export function formErrorHandler(setError, options = {}) {
  const { showToast = true, defaultErrorValue = {} } = options;

  return (err) => {
    console.log(err);
    // Client-side validation errors
    if (err.type === "VALIDATION_ERROR") {
      setError(err.errors || defaultErrorValue);
      return true;
    }

    // Backend validation errors
    const apiError = err.response?.data?.error || {};
    if (apiError.type === "VALIDATION_ERROR") {
      setError(apiError.fields?.body || defaultErrorValue);
      return true;
    }
    if (showToast) {
      toast.error(apiError.message || "An unexpected error occurred.");
    }
    return true;
  };
}
