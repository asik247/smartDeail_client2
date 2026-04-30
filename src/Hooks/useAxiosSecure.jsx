import axios from "axios"
import useAuth from "./useAuth"

const instanceSecure = axios.create({
    baseURL: "http://localhost:5000"
})
const useAxiosSecure = () => {
    const {user} = useAuth()
    //? headers:authorization set;
    instanceSecure.interceptors.request.use((config)=>{
        console.log('config:-',config);
        config.headers.authorization = `Bearer ${user.accessToken}`
        return config
    })
    return instanceSecure
}
export default useAxiosSecure