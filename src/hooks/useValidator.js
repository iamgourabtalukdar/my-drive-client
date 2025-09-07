import { useState } from "react";

const useValidator = () => {
  const [error, setError] = useState({});
  const err = {};
  let isError = true;

  function validate(data, rules, pointObj = err) {
    Object.entries(data).forEach(([key, value]) => {
      if (
        typeof value === "object" &&
        value !== null &&
        !Array.isArray(value)
      ) {
        pointObj[key] = {};
        return validate(value, { ...rules[key] }, pointObj[key]);
      }
      const validationStatus = rules[key]?.validator(value, data);

      if (validationStatus && !validationStatus.validation) {
        pointObj[key] = validationStatus.message;
        isError = false;
      }
    });

    setError(err);
    return isError;
  }

  return { error, validate };
};

export default useValidator;
