import axios from "axios";
import API, { GET_VIDEOS_URL } from "../index";

jest.mock("axios");

const videoData = [
  {
    id: 1,
    videoAddress: "https://www.youtube.com/watch?v=FXpIoQ_rT_c",
    coverImage:
      "https://raw.githubusercontent.com/modanisa/bootcamp-video-db/main/video-images/1-cover.webp",
    hoverImage:
      "https://raw.githubusercontent.com/modanisa/bootcamp-video-db/main/video-images/1-hover.webp",
    title: "Vue.js Course for Beginners [2021 Tutorial]",
    viewCount: 254,
    publishDateInMonth: 4,
    ownerImage:
      "https://yt3.ggpht.com/ytc/AKedOLTtJvQ1Vfew91vemeLaLdhjOwGx3tTBLlreK_QUyA=s68-c-k-c0x00ffffff-no-rj",
    ownerName: "freeCodeCamp.org",
    description:
      "Learn Vue 3 by in this full course. Vue.js is an open-source model–view–view model front end JavaScript framework for building user interfaces and single-page applications.",
  },
];

describe("Api Tests", () => {
  it("getVideos test", async () => {
    const data = [...videoData];
    axios.get.mockResolvedValueOnce({ data });
    const videos = await API.getVideos.call(this);
    expect(axios.get).toHaveBeenCalledWith(GET_VIDEOS_URL);
    expect(videos).toEqual(data);
  });

  it("getVideoById test", async () => {
    const dataIndex = 0;
    const data = { ...videoData[dataIndex] };
    axios.get.mockResolvedValueOnce({ data });
    const video = await API.getVideoById.call(this, data.id);
    const axiosConf = { query: { id: data.id } };
    expect(axios.get).toHaveBeenCalledWith(GET_VIDEOS_URL, axiosConf);
    expect(video).toEqual(data);
  });
});
