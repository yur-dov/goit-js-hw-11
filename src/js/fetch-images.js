import axios from "axios";
export { fetchImages };

axios.defaults.baseURL = 'https://pixabay.com/api/';
const API_KEY = '27774085-63dd68fde82b68f2a8f1036fc';

async function fetchImages(query, page, perPage) {
    const response = await axios.get(`?key=${API_KEY}&q=${query}&image_type=photo&orientation=horizontal&safesearch=true&page=${page}&per_page=${perPage}`);
    return response;
};