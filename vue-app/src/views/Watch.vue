<template>
    <div id="watch">
        <iframe class="watch" :src="videoUrl" width="100" height="100" />
    </div>
</template>

<script>
import { mapActions } from 'vuex'
import { ACTIONS_GET_VIDEO_ADDRESS, STATE_VIDEO_LIST } from '../store'

export default {
    name: 'Watch',
    computed: {
        async videoUrl() {
            const id = this.getVideoId()
            return await this[ACTIONS_GET_VIDEO_ADDRESS](id)
        }
    },
    methods: {
        ...mapActions([ACTIONS_GET_VIDEO_ADDRESS]),
        getVideoId() {
            return parseInt(this.$route.params.id)
        },
    },
    async created(){
        if(this.$store.state[STATE_VIDEO_LIST].length > 0) return
    }
}
</script>

<style>
</style>