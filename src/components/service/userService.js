import axios from "axios";
import { patient_services_api } from "./config.json";

// axios.interceptors.response.use(null, (err) => {
//   const expectedError =
//     err.response && err.response.status >= 400 && err.response.status < 500;
//   if (!expectedError) {
//     console.log(err);
//     console.error("logging errors", err);
//   } else {
//     return Promise.reject(err);
//   }
// });

const apiUsers = patient_services_api + "/api/users";
const apiPatient = patient_services_api + "/api/patients/";
const apiPassword = patient_services_api + "/api/password/";

export function users(userId) {
  return axios.post(apiUsers, {
    username: userId.username,
    email: userId.email,
    password: userId.password,
  });
}
export function passwordSever(user, pass) {
  return axios.post(apiPassword, {
    oPassword: pass.oPassword,
    nPassword: pass.nPassword,
    cnfPassword: pass.cnfPassword,
    _id: user.userData._id,
  });
}

export function getUser() {
  return axios.get(apiUsers);
}

export function getUserById(userId) {
  return axios.get(`${apiUsers}/${userId}`);
}

export function PatientInfo() {
  return axios.get(apiPatient);
}

export function PatientPost(patientPost) {
  return axios.post(apiPatient, patientPost);
}

export function PatientUpdate(id, patientUpd) {
  return axios.put(apiPatient + id, patientUpd);
}
