import { useCallback, useState } from "react";
import { useNavigate } from "react-router";

const useApi = (apiCall, initialData = null) => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(initialData);
  const [pagination, setPagination] = useState({});
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const execute = useCallback(
    async (...args) => {
      setLoading(true);
      setError(null);
      try {
        const response = await apiCall(...args);

        const jsonData = await response.json();

        if (response.status === 401 || response.status === 403) {
          navigate(jsonData.errors?.path || "/");
          throw new Error(jsonData.errors?.message);
        }
        if (!jsonData.status) {
          setError(jsonData.errors);
          throw new Error(jsonData.errors?.message);
        }
        setData(jsonData.data);
        setPagination(jsonData.pagination);
        return jsonData.data; // only for immediate use
      } catch (error) {
        setError(error);
        throw error;
      } finally {
        setLoading(false);
      }
    },
    [apiCall],
  );

  return { data, pagination, loading, error, execute };
};

export default useApi;
