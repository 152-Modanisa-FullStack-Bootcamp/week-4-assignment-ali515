<template>
  <div class="video">
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
};
</script>

<style>
</style>