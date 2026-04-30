import axios from "axios"

const axiosSecureInstance = axios.create({
    baseURL: "http://localhost:5000"
})
const useAxiosSecure = () => {
    //?set token in the header for all the api call using axiosSecure hook;
    return axiosSecureInstance
}
export default useAxiosSecure