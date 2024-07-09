import axios from 'axios';

const API_URL = 'https://result2.song6.club/result';

export default {
	getResult() {
		return axios.get(API_URL);
	}
};