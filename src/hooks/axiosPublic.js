import axios from "axios";

const useAxiosPublic = () => {
  const instance = axios.create({
    baseURL: "https://carvia-public-server.vercel.app/",
  });

  return instance;
};

export default useAxiosPublic;