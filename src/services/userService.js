import axios from "../axios";
const handleLoginApi = (email, password) => {
    const data = {
      email: email,
      password: password,
    };
  
    return axios.post('http://localhost:8080/api/login', data);
  };
  
  export { handleLoginApi };