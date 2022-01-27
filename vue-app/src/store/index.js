import Vue from 'vue'
import Vuex from 'vuex'
import API from '../api/index'

Vue.use(Vuex)

export const STATE_VIDEO_LIST = 'videoList'
export const GETTERS_VIDEOS = 'videos'
export const MUTATIONS_SET_VIDEOS = 'setVideos'
export const ACTIONS_GET_VIDEOS = 'getVideos'

export const state = {
  [STATE_VIDEO_LIST]: []
};

export const getters = {
  [GETTERS_VIDEOS](state) {
    return state[STATE_VIDEO_LIST]
  }
};

export const mutations = {
  [MUTATIONS_SET_VIDEOS](state, payload) {
    console.log({state, payload});
    state[STATE_VIDEO_LIST] = payload
  }
};

export const actions = {
  async [ACTIONS_GET_VIDEOS]({ commit }) {
    const videos = await API.getVideos()
    commit(MUTATIONS_SET_VIDEOS, videos)
    return videos;
  }
};

export default new Vuex.Store({
  state,
  getters,
  mutations,
  actions,
  modules: {
  }
})
