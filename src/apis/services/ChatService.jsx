import apiClient from "../AxiosConfiguration";
import handleApiError from "../ErrorHandlle";

export const getConversations = async (userId) => {
  try {
    const res = await apiClient.get(`/conversation/${userId}`);
    return res.data;
  } catch (error) {
    handleApiError(error);
  }
};

export const getMessages = async (currentChatId) => {
  try {
    const res = await apiClient.get(`/message/${currentChatId}`);
    return res.data;
  } catch (error) {
    handleApiError(error);
  }
};

export const createMessage = async (message) => {
  try {
    const res = await apiClient.post(`/message/create`, message);
    return res.data;
  } catch (error) {
    handleApiError(error);
  }
};

export const createConversation = async (data) => {
  try {
    const res = await apiClient.post(`/conversation/create`, data);
    return res.data;
  } catch (error) {
    handleApiError(error);
  }
};
