const axios = require('axios');
const dotenv = require('dotenv');
dotenv.config();

const axiosInstance = axios.create({
    baseURL: process.env.BACKEND_API_URL_PRIVATE,
});

const fetchRequest = async (url, method = 'GET', data = null, headers = {}) => {
    try {
        const response = await axiosInstance({
            url,
            method,
            data,
            headers,
        });
        return response;
    } catch (error) {
        throw error;
    }
};

module.exports = fetchRequest;
