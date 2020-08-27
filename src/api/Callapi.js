import axios from 'axios';

export default axios.create({
	baseURL: 'https://newsapi.org/',
	params: {
		apiKey: '4278c8dd97d646af819ffb3405c2c467',
		pageSize: 100
	} 
});
