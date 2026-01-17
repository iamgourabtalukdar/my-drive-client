import * as api from "../api/file.api";
import formatError from "../utils/formatError";
import {
  deleteFileSchema,
  getFileSchema,
  updateFileSchema,
  uploadCompleteSchema,
  uploadInitiateSchema,
} from "../validators/file.zod";

export const getFile = async (id) => {
  try {
    const { data, success, error } = getFileSchema.safeParse({ fileId: id });

    if (!success) {
      const formattedErrors = formatError(error);
      return { error: formattedErrors };
    }
    const resp = await api.getFile(data.fileId);
    return resp;
  } catch (error) {
    throw error;
  }
};

export const updateFile = async (id, payload = {}) => {
  try {
    const { data, success, error } = updateFileSchema.safeParse({
      body: payload,
      fileId: id,
    });

    if (!success) {
      const formattedErrors = formatError(error);
      return { error: formattedErrors };
    }

    const resp = await api.updateFile(data.fileId, data.body);
    return resp;
  } catch (err) {
    throw err;
  }
};

export const deleteFile = async (id) => {
  try {
    const { data, success, error } = deleteFileSchema.safeParse({ fileId: id });

    if (!success) {
      const formattedErrors = formatError(error);
      return { error: formattedErrors };
    }
    const resp = await api.deleteFile(data.fileId);
    return resp;
  } catch (error) {
    throw error;
  }
};

export const uploadInitiate = async (payload = {}) => {
  try {
    const { data, success, error } = uploadInitiateSchema.safeParse(payload);

    if (!success) {
      const formattedErrors = formatError(error);
      return { error: formattedErrors };
    }

    const resp = await api.uploadInitiate(data);
    return resp;
  } catch (err) {
    throw err;
  }
};

export const uploadComplete = async (payload = {}) => {
  try {
    const { data, success, error } = uploadCompleteSchema.safeParse(payload);

    if (!success) {
      const formattedErrors = formatError(error);
      return { error: formattedErrors };
    }

    const resp = await api.uploadComplete(data);
    return resp;
  } catch (err) {
    throw err;
  }
};
