import { shallowMount } from '@vue/test-utils'
import VideoList from '../VideoList'

function getMountConf() {
    return {
        propsData: {
            video: {}
        }
    };
}

describe('Video List Component Tests', () => {
    it('should be VideoList component exist', () => {
        const conf = getMountConf();
        const videoListComponent = shallowMount(VideoList, conf)
        expect(videoListComponent.exists()).toBeTruthy()
    })

    it('should be video has title', () => {
        const conf = getMountConf();
        const selector = '.title';
        const title = 'video title';
        conf.propsData.video.title = title;
        const videoListComponent = shallowMount(VideoList, conf)
        const titleElement = videoListComponent.find(selector)
        expect(titleElement.text()).toEqual(title)
    })
})