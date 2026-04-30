import axios from "axios"

const axioxInstance = axios.create({
    baseURL: "http://localhost:5000"
})
const useAxios = () => {
    return axioxInstance
}
export default useAxios;