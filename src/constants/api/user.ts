const API_BASE_URL = "/api/users";

export const USER_API = {
  PREVIEW_INSTRUCTOR: `${API_BASE_URL}/review-profile-instructor`,
  GET_USERS: `${API_BASE_URL}/search`,
  GET_USER: (id: string) => `${API_BASE_URL}/${id}`,
  UPDATE_USER: (id: string) => `${API_BASE_URL}/${id}`,
  DELETE_USER: (id: string) => `${API_BASE_URL}/${id}`,
};

export default USER_API;
