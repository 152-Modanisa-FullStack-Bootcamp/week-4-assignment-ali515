import axios from "axios";

export const GET_VIDEOS_URL =
  "https://my-json-server.typicode.com/modanisa/bootcamp-video-db/videos";

const API = {
  getVideos: async function () {
    const { data } = await axios.get(GET_VIDEOS_URL);
    return data || [];
  },
  getVideoById: async function (videoId) {
    const { data } = await axios.get(GET_VIDEOS_URL, {
      query: { id: videoId },
    });
    return data;
  },
};

export default API;
