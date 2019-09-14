import axios from "axios";

const firebase = axios.create({
  baseURL: "https://react-burger-app-1bbaf.firebaseio.com"
});

export default firebase;
