const API_BASE_URL = "/api/cart";

export const CART_API = {
  CREATE_CART: `${API_BASE_URL}`,
  SEARCH_CART: `${API_BASE_URL}/search`,
  UPDATE_CART_STATUS: `${API_BASE_URL}/update-status`,
  DELETE_CART: (id: string) => `${API_BASE_URL}/${id}`,
};

export default CART_API;
