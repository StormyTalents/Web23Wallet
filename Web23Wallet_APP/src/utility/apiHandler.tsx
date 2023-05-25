import axios from "axios";

import { API_ENDPOINT_URL } from "src/config";

const apiHandler = async (
  api: string,
  token: string = "",
  params: any = {}
) => {
  const res = await axios.post(
    API_ENDPOINT_URL + api,
    {
      params,
    },
    { headers: { Authorization: `Bearer ${token}` } }
  );

  return res.data;
};

export default apiHandler;
