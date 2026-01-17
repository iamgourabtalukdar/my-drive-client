import * as api from "../api/folder.api";
import formatError from "../utils/formatError";
import {
  createFolderSchema,
  deleteFolderSchema,
  getFolderContentsSchema,
  updateFolderSchema,
} from "../validators/folder.zod";

export const getFolderContents = async (folderId) => {
  try {
    const { data, success, error } = getFolderContentsSchema.safeParse({
      folderId,
    });
    if (!success) {
      const formattedErrors = formatError(error);
      return { error: formattedErrors };
    }
    const resp = await api.getFolderContents(data.folderId);
    return resp;
  } catch (error) {
    throw error;
  }
};

export const createFolder = async (payload = {}) => {
  try {
    const { data, success, error } = createFolderSchema.safeParse(payload);

    if (!success) {
      const formattedErrors = formatError(error);
      return { error: formattedErrors };
    }

    const resp = await api.createFolder(data);
    return resp;
  } catch (err) {
    throw err;
  }
};

export const updateFolder = async (id, payload = {}) => {
  try {
    const { data, success, error } = updateFolderSchema.safeParse({
      body: payload,
      folderId: id,
    });

    if (!success) {
      const formattedErrors = formatError(error);
      return { error: formattedErrors };
    }

    const resp = await api.updateFolder(data.folderId, data.body);
    return resp;
  } catch (err) {
    throw err;
  }
};

export const deleteFolder = async (id) => {
  try {
    const { data, success, error } = deleteFolderSchema.safeParse({
      folderId: id,
    });

    if (!success) {
      const formattedErrors = formatError(error);
      return { error: formattedErrors };
    }
    const resp = await api.deleteFolder(data.folderId);
    return resp;
  } catch (error) {
    throw error;
  }
};
