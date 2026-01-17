import * as api from "../api/starred.api";

export const getStarredContents = async () => {
  try {
    const resp = await api.getStarredContents();
    return resp;
  } catch (error) {
    throw error;
  }
};
