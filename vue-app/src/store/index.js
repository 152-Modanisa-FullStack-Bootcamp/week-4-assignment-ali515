import Vue from "vue";
import Vuex from "vuex";
import API from "../api/index";

Vue.use(Vuex);

export const STATE_VIDEO_LIST = "videoList";

export const GETTERS_VIDEOS = "videos";

export const MUTATIONS_SET_VIDEOS = "setVideos";
export const MUTATIONS_ADD_VIDEO = "addVideo";

export const ACTIONS_GET_VIDEOS = "getVideos";
export const ACTIONS_GET_VIDEO_BY_ID = "getVideoById";
export const ACTIONS_GET_VIDEO_ADDRESS = "getVideoAddress";

export const state = {
  [STATE_VIDEO_LIST]: [],
};

export const getters = {
  [GETTERS_VIDEOS](state) {
    return state[STATE_VIDEO_LIST];
  },
};

export const mutations = {
  [MUTATIONS_SET_VIDEOS](state, videoList) {
    state[STATE_VIDEO_LIST] = videoList;
  },
  [MUTATIONS_ADD_VIDEO](state, video) {
    var videos = state[STATE_VIDEO_LIST].filter((v) => v.id !== video.id);
    videos.push(video);
    state[STATE_VIDEO_LIST] = videos;
  },
};

export const actions = {
  async [ACTIONS_GET_VIDEOS]({ commit }) {
    const videos = await API.getVideos();
    commit(MUTATIONS_SET_VIDEOS, videos);
    return videos;
  },
  async [ACTIONS_GET_VIDEO_ADDRESS]({ state }, videoId) {
    const { videoAddress } = state[STATE_VIDEO_LIST].find(
      (video) => video.id === videoId
    );
    return videoAddress;
  },
  async [ACTIONS_GET_VIDEO_BY_ID]({ commit }, videoId) {
    const video = await API.getVideoById(videoId);
    commit(MUTATIONS_ADD_VIDEO, video);
    return video;
  },
};

export default new Vuex.Store({
  state,
  getters,
  mutations,
  actions,
  modules: {},
});
