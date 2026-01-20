import * as api from "../api/starred.api";

export const getStarredContents = async () => {
  return await api.getStarredContents();
};
