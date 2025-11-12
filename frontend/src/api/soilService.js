import axios from "axios";

const API_URL = "https://soil-mapping.onrender.com/api/soil"; // Change to your deployed backend URL later

export const getStates = () => axios.get(`${API_URL}/states`);
export const getDistricts = (state) => axios.get(`${API_URL}/districts/${state}`);
export const getSoilData = (state, district) => axios.get(`${API_URL}/${state}/${district}`);
