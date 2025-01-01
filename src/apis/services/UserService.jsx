import apiClient from "../AxiosConfiguration";
import handleApiError from "../ErrorHandlle";

export const getAll = async () => {
  try {
    const res = await apiClient.get("/");
    return res.data;
  } catch (error) {
    handleApiError(error);
  }
};

export const getById = async (id) => {
  try {
    const res = await apiClient.get(`/user/${id}`);
    return res.data;
  } catch (error) {
    handleApiError(error);
  }
};

export const getAllFriends = async (id) => {
  try {
    const res = await apiClient.get(`/user/friends/${id}`);
    return res.data;
  } catch (error) {
    handleApiError(error);
  }
};
