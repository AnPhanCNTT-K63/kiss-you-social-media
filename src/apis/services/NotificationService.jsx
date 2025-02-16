import apiClient from "../AxiosConfiguration";
import handleApiError from "../ErrorHandlle";

export const getNotifications = async (userId) => {
  try {
    const res = await apiClient.get(`/notification/${userId}`);
    return res.data;
  } catch (error) {
    handleApiError(error);
  }
};
