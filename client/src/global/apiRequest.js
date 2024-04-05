import axios from 'axios'
import {toast} from 'react-hot-toast';

const BASE_URL = 'http://localhost:5000'

export const apiRequest = async(url, method='get', body=null) => {
    try {
        const response = await axios({
            method : method,
            url : `${BASE_URL}${url}`,
            data : body
        });
        return response;
    } catch (error) {
        console.error(error);
        toast.error(error.response.data.error)
    }
}