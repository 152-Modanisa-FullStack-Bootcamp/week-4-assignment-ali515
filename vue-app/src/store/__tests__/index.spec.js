import API from "../../api/index";
import {
  actions,
  MUTATIONS_SET_VIDEOS,
  ACTIONS_GET_VIDEO_ADDRESS,
  STATE_VIDEO_LIST,
  MUTATIONS_ADD_VIDEO,
} from "../index";

jest.mock("../../api/index.js");

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

describe("store tests", () => {
  describe("action tests", () => {
    it("getVideos test", async () => {
      const data = [...videoData];
      API.getVideos.mockResolvedValueOnce(data);
      const commit = jest.fn();
      const _this = {};
      const videos = await actions.getVideos.call(_this, { commit });
      expect(API.getVideos).toHaveBeenCalled();
      expect(commit).toHaveBeenCalledWith(MUTATIONS_SET_VIDEOS, data);
      expect(videos).toEqual(data);
    });

    it("getVideoById test", async () => {
      const dataIndex = 0;
      const data = { ...videoData[dataIndex] };
      API.getVideoById.mockResolvedValueOnce(data);
      const commit = jest.fn();
      const _this = {};
      const video = await actions.getVideoById.call(_this, { commit }, data.id);
      expect(API.getVideoById).toHaveBeenCalledWith(data.id);
      expect(commit).toHaveBeenCalledWith(MUTATIONS_ADD_VIDEO, data);
      expect(video).toEqual(data);
    });

    it("getVideoAddress test", async () => {
      const data = [...videoData];
      const dataIndex = 0;
      const id = data[dataIndex].id;
      const videoAddress = data[dataIndex].videoAddress;
      const state = {
        [STATE_VIDEO_LIST]: data,
      };
      const resultVideoAddress = await actions[ACTIONS_GET_VIDEO_ADDRESS](
        { state },
        id
      );
      expect(resultVideoAddress).toEqual(videoAddress);
    });
  });
});
