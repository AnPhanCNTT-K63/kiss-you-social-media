import apiClient from "../AxiosConfiguration";
import handleApiError from "../ErrorHandlle";

export const getAll = async (filter) => {
  try {
    const res = await apiClient.get("/user", {
      params: filter,
    });
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

export const getStatistics = async (year) => {
  try {
    const res = await apiClient.get(`/user/statistics/${year}`);
    return res.data;
  } catch (error) {
    handleApiError(error);
  }
};

export const getNotFriends = async (id, filter) => {
  try {
    const res = await apiClient.get(`/user/not-friends/${id}`, {
      params: filter,
    });
    return res.data;
  } catch (error) {
    handleApiError(error);
  }
};

export const addFriend = async (data) => {
  try {
    const res = await apiClient.post(`/user/add-friend`, data);
    return res.data;
  } catch (error) {
    handleApiError(error);
  }
};

export const updateProfile = async (id, update) => {
  try {
    const res = await apiClient.patch(`/user/update-profile/${id}`, update);
    return res.data;
  } catch (error) {
    handleApiError(error);
  }
};

export const updateAccount = async (id, update) => {
  try {
    const res = await apiClient.patch(`/user/update-account/${id}`, update);
    return res.data;
  } catch (error) {
    handleApiError(error);
  }
};

export const updateBanUser = async (id, flag) => {
  try {
    const res = await apiClient.patch(`/user/update-ban/${id}`, { flag: flag });
    return res.data;
  } catch (error) {
    handleApiError(error);
  }
};

export const setSoftDelete = async (id, flag) => {
  try {
    const res = await apiClient.patch(`/user/soft-delete/${id}`, {
      flag: flag,
    });
    return res.data;
  } catch (error) {
    handleApiError(error);
  }
};

export const ping = async (id) => {
  try {
    const res = await apiClient.patch(`/user/ping/${id}`);
    return res.data;
  } catch (error) {
    handleApiError(error);
  }
};

export const uploadAvatar = async (file) => {
  try {
    const formData = new FormData();
    formData.append("file", file);

    const response = await apiClient.post("/user/upload-avatar", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};

export const uploadCoverPhoto = async (file) => {
  try {
    const formData = new FormData();
    formData.append("file", file);

    const response = await apiClient.post(
      "/user/upload-cover-photo",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};
