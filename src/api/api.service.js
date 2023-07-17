const crypto = require('crypto');
const dotenv = require('dotenv');
dotenv.config();
 
const PUBLIC_KEY = process.env.REACT_APP_PUBLIC_KEY;
const PRIVATE_KEY = process.env.REACT_APP_PRIVATE_KEY;
const BASE_URL = 'https://gateway.marvel.com/v1/public/';

const ApiService = () => {
  const getData = (url, queryParams) => {
    const timestamp = new Date().getTime().toString();
    const hash = crypto
      .createHash('md5')
      .update(timestamp + PRIVATE_KEY + PUBLIC_KEY)
      .digest('hex');
    const apiUrl = `${BASE_URL}${url}?${queryParams}&ts=${timestamp}&apikey=${PUBLIC_KEY}&hash=${hash}`;
    
    return fetch(apiUrl, { method: 'GET' });
  }

  return { getData };
}

export default ApiService;
