import apiClient from "../AxiosConfiguration";
import handleApiError from "../ErrorHandlle";

export const uploadImgae = async (file) => {
  try {
    const formData = new FormData();
    formData.append("file", file);

    const response = await apiClient.post("/media/create", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};
