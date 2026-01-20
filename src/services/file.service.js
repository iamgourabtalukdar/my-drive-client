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
  const { data, success, error } = getFileSchema.safeParse({ fileId: id });

  if (!success) {
    const formattedErrors = formatError(error);
    throw { type: "VALIDATION_ERROR", errors: formattedErrors };
  }
  return await api.getFile(data.fileId);
};

export const updateFile = async (id, payload = {}) => {
  const { data, success, error } = updateFileSchema.safeParse({
    body: payload,
    fileId: id,
  });

  if (!success) {
    const formattedErrors = formatError(error);
    throw { type: "VALIDATION_ERROR", errors: formattedErrors };
  }

  return await api.updateFile(data.fileId, data.body);
};

export const deleteFile = async (id) => {
  const { data, success, error } = deleteFileSchema.safeParse({ fileId: id });

  if (!success) {
    const formattedErrors = formatError(error);
    throw { type: "VALIDATION_ERROR", errors: formattedErrors };
  }
  return await api.deleteFile(data.fileId);
};

export const uploadInitiate = async (payload = {}) => {
  const { data, success, error } = uploadInitiateSchema.safeParse(payload);

  if (!success) {
    const formattedErrors = formatError(error);
    throw { type: "VALIDATION_ERROR", errors: formattedErrors };
  }

  return await api.uploadInitiate(data);
};

export const uploadComplete = async (payload = {}) => {
  const { data, success, error } = uploadCompleteSchema.safeParse(payload);

  if (!success) {
    const formattedErrors = formatError(error);
    throw { type: "VALIDATION_ERROR", errors: formattedErrors };
  }

  return await api.uploadComplete(data);
};
