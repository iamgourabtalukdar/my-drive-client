import * as api from "../api/trash.api";

export const getTrashContents = async () => {
  try {
    const resp = await api.getTrashContents();
    return resp;
  } catch (error) {
    throw error;
  }
};
