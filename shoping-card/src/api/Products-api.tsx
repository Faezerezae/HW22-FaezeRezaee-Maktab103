import axios from "axios";

const BASE_URL='http://localhost:2000/'

export const axiosInstance=axios.create({
    baseURL:BASE_URL,
    headers:{
        "Content-Type":'application/json'
    }
})

// axiosInstance.interceptors.request.use((config)=>{
//     const token=cookes()
//         config.headers.Authorization='Bearer'+token;
//         return config
    
// })

export const fetchProducts = async (page:number,search:string) => {
    const response = await axiosInstance.get(`products?q=${search}&_page=${page}`);
    return response.data;
};


