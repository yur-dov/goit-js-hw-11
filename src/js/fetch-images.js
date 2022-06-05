import axios from "axios";
export { fetchImages };
axios.defaults.baseURL = 'https://pixabay.com/api/';
const API_KEY = '27155173-9deaa55e537d9ae9b6e54e2b2';

async function fetchImages(query, page, perPage) {
    const response = await axios.get(`?key=${API_KEY}&q=${query}&image_type=photo&orientation=horizontal&safesearch=true&page=${page}&per_page=${perPage}`);
    return response;
};