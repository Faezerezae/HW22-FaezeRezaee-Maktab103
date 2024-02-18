import axios from "axios";

const BASE_URL='http://localhost:2000/'

export const axiosInstance=axios.create({
    baseURL:BASE_URL,
    headers:{
        "Content-Type":'application/json'
    }
})


export const fetchProducts = async ( typeSearch:string,page:number,search:string) => {
    const response = await axiosInstance.get(`products?${typeSearch}=${search}&_page=${page}`);
    return response.data;
};


