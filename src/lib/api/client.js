import applyCaseMiddleware from 'axios-case-converter';
import axios from 'axios';

const options = {
  ignoreHeares: true,
}

// applyCaseMiddleware: スネークケースのrailsとキャメルケースのJSの違いを吸収するため
const client = applyCaseMiddleware(
  axios.create({
    baseURL: process.env.REACT_APP_API_DOMEIN,
  }),
  options
);

export default client;