import axios from "axios"

const api=axios.create({
    baseURL:"https://ai-resume-builder-backend-y79f.onrender.com/",
    withCredentials: true,

})

export default api;
