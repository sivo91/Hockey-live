import axios from 'axios';

export const fetcher = url => axios.post(url).then(res => res.data);
