import axios from "axios"
import { useEffect } from "react";
import useAuth from "./useAuth";
import { useNavigate } from "react-router";
//?axios instance;
const instance = axios.create({
    baseURL: "http://localhost:5000"
})
const useAxiosSecure = () => {
    const { logOutUser } = useAuth()
    const navegate = useNavigate()
    useEffect(() => {
        //? request interceptor;
        const requestInterceptor = instance.interceptors.request.use(config => {
            const token = localStorage.getItem('token');
            if (token) {
                config.headers.Authorization = `Bearer ${token}`
            }
            return config;
        }, err => { return Promise.reject(err) })
        //?response interceptor;
        const responseInterceptor = instance.interceptors.response.use(res => {
            return res;
        }, async err => {
            const status = err?.response?.status;
            if (status === 401 || status === 403) {
                console.log('Unauthorized access -> Logout');
                await logOutUser();
                navegate('/auth');
            }
            return Promise.reject(err)
        })
        //?Cleanup interceptor
        return () => {
            instance.interceptors.request.eject(requestInterceptor)
            instance.interceptors.response.eject(responseInterceptor)
        }
    }, [logOutUser, navegate])
    return instance;
}
export default useAxiosSecure