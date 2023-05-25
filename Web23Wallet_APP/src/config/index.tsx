const API_ENDPOINT_URL =
  process.env.REACT_APP_API_ENDPOINT || "http://localhost:4000/web23/";

const API_SMART_ENDPOINT_URL =
  process.env.REACT_APP_API_SMART_ENDPOINT || "http://localhost:5000/api/";

const PINATA = {
  key: process.env.REACT_APP_API_PINATA_KEY,
  secret: process.env.REACT_APP_API_PINATA_SECRET,
};

export { API_ENDPOINT_URL, API_SMART_ENDPOINT_URL, PINATA };
