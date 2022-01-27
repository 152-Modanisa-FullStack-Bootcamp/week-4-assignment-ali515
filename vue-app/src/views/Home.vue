<template>
  <div id="home">
    <div id="video-container">
      <video-list v-for="video in videos" :key="video.id" :video="video" />
    </div>
  </div>
</template>

<script>
import VideoList from "../components/VideoList.vue";
import { mapGetters, mapActions } from "vuex";
import { GETTERS_VIDEOS, ACTIONS_GET_VIDEOS } from "../store";

export default {
  components: { VideoList },
  name: "Home",
  computed: {
    ...mapGetters([GETTERS_VIDEOS]),
  },
  methods: {
    ...mapActions([ACTIONS_GET_VIDEOS]),
  },
  async created() {
    await this[ACTIONS_GET_VIDEOS]();
  },
};
</script>
