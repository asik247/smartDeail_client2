// import axios from "axios"
// import useAuth from "./useAuth"

// const axiosSecureInstance = axios.create({
//     baseURL: "http://localhost:5000"
// })
// const useAxiosSecure = () => {
//     const {user} = useAuth()
//     //?set token in the header for all the api call using axiosSecure hook;
//     axiosSecureInstance.interceptors.request.use((config)=>{
//         console.log('config:-',config);
//         config.headers.authorization = `Bearer ${user.accessToken}`
//         return config;
//     })
//     return axiosSecureInstance
// }
// export default useAxiosSecure