import apiClient from "../AxiosConfiguration";
import handleApiError from "../ErrorHandlle";

export const like = async (data) => {
  try {
    const res = await apiClient.post(`/interaction/like`, data);
    return res.data;
  } catch (error) {
    handleApiError(error);
  }
};

export const unlike = async (data) => {
  try {
    const res = await apiClient.post(`/interaction/unlike`, data);
    return res.data;
  } catch (error) {
    handleApiError(error);
  }
};

export const getLikeRecord = async (id) => {
  try {
    const res = await apiClient.get(`/interaction/like-record/post/${id}`);
    return res.data;
  } catch (error) {
    handleApiError(error);
  }
};

export const getAllComments = async (id) => {
  try {
    const res = await apiClient.get(`/interaction/comments/post/${id}`);
    return res.data;
  } catch (error) {
    handleApiError(error);
  }
};

export const getCommentCount = async (id) => {
  try {
    const res = await apiClient.get(`/interaction/comments-count/post/${id}`);
    return res.data;
  } catch (error) {
    handleApiError(error);
  }
};

export const getShareCount = async (id) => {
  try {
    const res = await apiClient.get(`/interaction/shares-count/post/${id}`);
    return res.data;
  } catch (error) {
    handleApiError(error);
  }
};

export const createComment = async (data) => {
  try {
    const res = await apiClient.post(`/interaction/create-comment`, data);
    return res.data;
  } catch (error) {
    handleApiError(error);
  }
};

export const replyComment = async (data) => {
  try {
    const res = await apiClient.post(`/interaction/reply-comment`, data);
    return res.data;
  } catch (error) {
    handleApiError(error);
  }
};

export const sharePost = async (data) => {
  try {
    const res = await apiClient.post(`/interaction/share-post`, data);
    return res.data;
  } catch (error) {
    handleApiError(error);
  }
};
