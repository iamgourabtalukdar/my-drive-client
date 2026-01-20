import * as api from "../api/trash.api";

export const getTrashContents = async () => {
  return await api.getTrashContents();
};
