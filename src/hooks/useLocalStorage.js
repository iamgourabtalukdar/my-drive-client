import { useEffect, useState } from "react";

const useLocalStorage = (key, initialData) => {
  //   debugger;
  const [data, setData] = useState(initialData);

  useEffect(() => {
    const existingData = JSON.parse(localStorage.getItem(key));
    if (existingData) {
      setData(existingData);
    } else {
      localStorage.setItem(key, JSON.stringify(initialData));
    }
  }, []);

  function updateLocalStorage(newData) {
    if (typeof newData === "function") {
      localStorage.setItem(key, JSON.stringify(newData(data)));
      setData(newData(data));
    } else {
      localStorage.setItem(key, JSON.stringify(newData));
      setData(newData);
    }
  }
  return [data, updateLocalStorage];
};
export default useLocalStorage;
