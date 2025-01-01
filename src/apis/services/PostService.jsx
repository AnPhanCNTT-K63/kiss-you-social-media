import apiClient from "../AxiosConfiguration";
import handleApiError from "../ErrorHandlle";

export const createPost = async (post) => {
  try {
    const formData = new FormData();
    formData.append("content", post.content);
    if (post.image) {
      formData.append("file", post.image);
    }
    const res = await apiClient.post(`/post/create`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return res.data;
  } catch (error) {
    handleApiError(error);
  }
};

export const getAll = async () => {
  try {
    const res = await apiClient.get(`/post/get-all`);
    return res.data;
  } catch (error) {
    handleApiError(error);
  }
};
