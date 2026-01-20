import * as api from "../api/folder.api";
import formatError from "../utils/formatError";
import {
  createFolderSchema,
  deleteFolderSchema,
  getFolderContentsSchema,
  updateFolderSchema,
} from "../validators/folder.zod";

export const getFolderContents = async (folderId) => {
  const { data, success, error } = getFolderContentsSchema.safeParse({
    folderId,
  });
  if (!success) {
    const formattedErrors = formatError(error);
    throw { type: "VALIDATION_ERROR", errors: formattedErrors };
  }
  return await api.getFolderContents(data.folderId);
};
export const createFolder = async (payload = {}) => {
  const { data, success, error } = createFolderSchema.safeParse(payload);

  if (!success) {
    const formattedErrors = formatError(error);
    throw { type: "VALIDATION_ERROR", errors: formattedErrors };
  }

  return await api.createFolder(data);
};

export const updateFolder = async (id, payload = {}) => {
  const { data, success, error } = updateFolderSchema.safeParse({
    body: payload,
    folderId: id,
  });

  if (!success) {
    const formattedErrors = formatError(error);
    throw { type: "VALIDATION_ERROR", errors: formattedErrors };
  }

  return await api.updateFolder(data.folderId, data.body);
};

export const deleteFolder = async (id) => {
  const { data, success, error } = deleteFolderSchema.safeParse({
    folderId: id,
  });

  if (!success) {
    const formattedErrors = formatError(error);
    throw { type: "VALIDATION_ERROR", errors: formattedErrors };
  }
  return await api.deleteFolder(data.folderId);
};
