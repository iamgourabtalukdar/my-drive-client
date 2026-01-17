import * as api from "../api/auth.api";
import formatError from "../utils/formatError";
import { loginSchema, registerSchema } from "../validators/auth.zod";

export const login = async (payload) => {
  try {
    const { data, success, error } = loginSchema.safeParse(payload);

    if (!success) {
      const formattedErrors = formatError(error);
      return { error: formattedErrors };
    }
    const resp = await api.login(data);
    return resp;
  } catch (err) {
    throw err;
  }
};

export const register = async (payload) => {
  try {
    const { data, success, error } = registerSchema.safeParse(payload);

    if (!success) {
      const formattedErrors = formatError(error);
      return { error: formattedErrors };
    }
    const resp = await api.register(data);
    return resp;
  } catch (err) {
    throw err;
  }
};

export const loginWithGoogle = async (payload) => {
  try {
    const resp = await api.loginWithGoogle(payload);
    return resp;
  } catch (err) {
    throw err;
  }
};

export const logout = async () => {
  try {
    const resp = await api.logout();
    return resp;
  } catch (error) {
    throw error;
  }
};

export const me = async () => {
  try {
    const resp = await api.me();
    return resp;
  } catch (error) {
    throw error;
  }
};
