import * as api from "../api/auth.api";
import formatError from "../utils/formatError";
import {
  loginSchema,
  registerSchema,
  resendEmailOTPSchema,
  verifyEmailSchema,
} from "../validators/auth.zod";

export const register = async (payload) => {
  const { data, success, error } = registerSchema.safeParse(payload);

  if (!success) {
    const formattedErrors = formatError(error);
    throw { type: "VALIDATION_ERROR", errors: formattedErrors };
  }
  return await api.register(data);
};

export const login = async (payload) => {
  const { data, success, error } = loginSchema.safeParse(payload);

  if (!success) {
    const formattedErrors = formatError(error);
    throw { type: "VALIDATION_ERROR", errors: formattedErrors };
  }
  return await api.login(data);
};

export const verifyEmail = async (payload) => {
  const { data, success, error } = verifyEmailSchema.safeParse(payload);

  if (!success) {
    const formattedErrors = formatError(error);
    throw { type: "VALIDATION_ERROR", errors: formattedErrors };
  }
  return await api.verifyEmail(data);
};

export const resendEmailOTP = async (payload) => {
  const { data, success, error } = resendEmailOTPSchema.safeParse(payload);

  if (!success) {
    const formattedErrors = formatError(error);
    throw { type: "VALIDATION_ERROR", errors: formattedErrors };
  }
  return await api.resendEmailOTP(data);
};

export const loginWithGoogle = async (payload) => {
  return await api.loginWithGoogle(payload);
};

export const logout = async () => {
  return await api.logout();
};

export const me = async () => {
  return await api.me();
};
