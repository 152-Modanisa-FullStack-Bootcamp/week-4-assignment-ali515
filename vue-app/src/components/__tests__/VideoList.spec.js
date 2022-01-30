import { createLocalVue, shallowMount } from "@vue/test-utils";
import VueRouter from "vue-router";
import VideoList from "../VideoList";
import router from "../../router";

function getMountConf() {
  const localVue = createLocalVue();
  localVue.use(VueRouter);

  return {
    localVue,
    router,
    propsData: {
      video: {},
    },
  };
}

describe("Video List Component Tests", () => {
  it("should be VideoList component exist", () => {
    const conf = getMountConf();
    const wrapper = shallowMount(VideoList, conf);
    expect(wrapper.exists()).toBeTruthy();
  });

  it("should be video has title", () => {
    const conf = getMountConf();
    const selector = ".title";
    const title = "video title";
    conf.propsData.video.title = title;
    const wrapper = shallowMount(VideoList, conf);
    const titleElement = wrapper.find(selector);
    expect(titleElement.text()).toEqual(title);
  });

  it("should be called gotoWatch", async () => {
    const conf = getMountConf();
    const selector = ".video";
    const gotoWatch = jest.fn();
    conf.methods = {
      gotoWatch,
    };
    const wrapper = shallowMount(VideoList, conf);
    const clickElement = wrapper.find(selector);
    expect(clickElement.exists()).toBeTruthy();
    await clickElement.trigger("click");
    expect(gotoWatch).toHaveBeenCalled();
  });

  it("should be clicked goes to watch", async () => {
    const conf = getMountConf();
    const selector = ".video";
    const videoId = 1;
    conf.propsData.video = {
      id: videoId,
    };
    const wrapper = shallowMount(VideoList, conf);
    const push = jest.fn();
    wrapper.vm.$router.push = push;
    const clickElement = wrapper.find(selector);
    expect(clickElement.exists()).toBeTruthy();
    await clickElement.trigger("click");
    expect(push).toHaveBeenCalledWith({
      name: "Watch",
      params: { id: videoId },
    });
  });

  it("should be video has a image", () => {
    const conf = getMountConf();
    const selector = "img.image";
    const wrapper = shallowMount(VideoList, conf);
    const imgElement = wrapper.find(selector);
    expect(imgElement.exists()).toBeTruthy();
  });

  it("should be .video has a data-title", () => {
    const conf = getMountConf();
    const title = "video title";
    conf.propsData.video.title = title;
    const selector = `.video[data-title="${title}"]`;
    const wrapper = shallowMount(VideoList, conf);
    const imgElement = wrapper.find(selector);
    expect(imgElement.exists()).toBeTruthy();
  });

  it("should be change hover image", () => {
    const conf = getMountConf();
    const hoverImage = "hover image";
    const coverImage = "cover image";
    conf.propsData.video = {
      hoverImage,
      coverImage,
    };
    const selector = `img.image[data-hover-image="${hoverImage}"]`;
    const wrapper = shallowMount(VideoList, conf);
    const imgElement = wrapper.find(selector);
    expect(imgElement.exists()).toBeTruthy();
    expect(wrapper.vm.image).toEqual(coverImage);
    wrapper.setData({ isHover: true });
    expect(wrapper.vm.image).toEqual(hoverImage);
  });
});
