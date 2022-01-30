<template>
  <div class="video" :data-id="id" :data-title="title" @click="gotoWatch" @mouseover="isHover = true" @mouseleave="isHover = false">
    <img :src="image" class="image" :data-hover-image="video.hoverImage" />
    <h3 class="title">{{ video.title }}</h3>
  </div>
</template>

<script>
export default {
  name: "Video List",
  props: {
    video: {
      id: Number,
      videoAddress: String,
      coverImage: String,
      hoverImage: String,
      title: String,
      viewCount: Number,
      publishDateInMonth: Number,
      ownerImage: String,
      ownerName: String,
      description: String,
    },
  },
  data() {
    return {
      isHover: false
    }
  },
  computed: {
    id() {
      return this.video.id
    },
    image() {
      return this.isHover
        ? this.video.hoverImage
        : this.video.coverImage
    },
    title() {
      return this.video.title
    }
  },
  methods: {
    gotoWatch() {
      console.log(this);
      const id = this.video.id;
      this.$router.push({ name: 'Watch', params: { id } })
    }
  }
};
</script>

<style>
</style>