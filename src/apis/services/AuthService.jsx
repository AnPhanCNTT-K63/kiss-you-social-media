import apiClient from "../AxiosConfiguration";
import handleApiError from "../ErrorHandlle";

export const signin = async (user) => {
  try {
    const res = await apiClient.post(`/auth/signin`, user);
    return res.data;
  } catch (error) {
    handleApiError(error);
  }
};

export const signup = async (user) => {
  try {
    const res = await apiClient.post(`/auth/signup`, user);
    return res.data;
  } catch (error) {
    handleApiError(error);
  }
};
