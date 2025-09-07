import { maxLength, minLength, required } from "../validator/common";

const signUpValidationRules = {
  name: {
    validator: function (val) {
      if (!required(val)) {
        return { validation: false, message: "This field is required" };
      }
      if (!minLength(val, 3)) {
        return {
          validation: false,
          message: "Input should be at least 3 characters long",
        };
      }
      if (!maxLength(val, 30)) {
        return {
          validation: false,
          message: "Input should be at most 30 characters long",
        };
      }
      return { validation: true };
    },
  },
  email: {
    validator: function (val) {
      if (!maxLength(val, 100)) {
        return {
          validation: false,
          message: "Email should be at most 100 characters long",
        };
      }
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val)) {
        return {
          validation: false,
          message: "Invalid Email format",
        };
      }
      return { validation: true };
    },
  },
  password: {
    validator: function (val) {
      if (!required(val)) {
        return { validation: false, message: "This field is required" };
      }
      if (!minLength(val, 4)) {
        return {
          validation: false,
          message: "Password should be at least 4 characters long",
        };
      }
      if (!maxLength(val, 100)) {
        return {
          validation: false,
          message: "Password should be at most 100 characters long",
        };
      }
      return { validation: true };
    },
  },
};

export default signUpValidationRules;
