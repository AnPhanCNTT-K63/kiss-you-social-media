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

export const getAll = async (filter) => {
  try {
    const res = await apiClient.get(`/post/get-all`, {
      params: filter,
    });
    return res.data;
  } catch (error) {
    handleApiError(error);
  }
};

export const setApproval = async (id, flag) => {
  try {
    const res = await apiClient.patch(`/post/set-approval-post/${id}`, {
      flag: flag,
    });
    return res.data;
  } catch (error) {
    handleApiError(error);
  }
};

export const setDelete = async (id, flag) => {
  try {
    const res = await apiClient.patch(`/post/set-delete-post/${id}`, {
      flag: flag,
    });
    return res.data;
  } catch (error) {
    handleApiError(error);
  }
};

export const deletePost = async (id) => {
  try {
    const res = await apiClient.delete(`/post/${id}`);
    return res.data;
  } catch (error) {
    handleApiError(error);
  }
};

export const getByUserId = async (id) => {
  try {
    const res = await apiClient.get(`/post/user/${id}`);
    return res.data;
  } catch (error) {
    handleApiError(error);
  }
};

export const getPendingPost = async (id) => {
  try {
    const res = await apiClient.get(`/post/user/${id}`);
    return res.data;
  } catch (error) {
    handleApiError(error);
  }
};
