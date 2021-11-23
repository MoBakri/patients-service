import { patient_services_api } from "./config.json";
import jwt_decode from "jwt-decode";
import axios from "axios";
const apiUsers = patient_services_api + "/api/auth";

export function login(email, password) {
  return axios.post(apiUsers, { email, password });
}
export function getJwt() {
  return localStorage.getItem("token");
}
export function setJwt(Jwt) {
  return localStorage.setItem("token", Jwt);
}
export function getCurrentUser() {
  try {
    return jwt_decode(localStorage.getItem("token"));
  } catch (err) {
    return null;
  }
}
export function logout() {
  return localStorage.removeItem("token");
}
