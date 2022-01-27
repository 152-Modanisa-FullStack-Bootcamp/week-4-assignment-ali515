import { shallowMount, createLocalVue } from "@vue/test-utils";
import Home from "../Home";
import VideoList from "../../components/VideoList";
import Vuex from "vuex";
import { GETTERS_VIDEOS } from "../../store";

function getMountConf(storeConf = {}) {
  const localVue = createLocalVue();
  localVue.use(Vuex);
  const store = new Vuex.Store(storeConf);
  return {
    store,
    localVue,
  };
}

describe("Home Component Tests", () => {
  it("should be HomeComponent exist", () => {
    const conf = getMountConf();
    const homeComponent = shallowMount(Home, conf);
    expect(homeComponent.exists()).toBeTruthy();
  });

  it("sholud be view videos", () => {
    const conf = getMountConf({
      getters: {
        [GETTERS_VIDEOS]: jest.fn().mockReturnValue([{ id: 1, title: "" }]),
      },
    });
    const homeComponent = shallowMount(Home, conf);
    const videoContainerElement = homeComponent.findAllComponents(VideoList);
    expect(videoContainerElement.exists()).toBeTruthy();
  });
});
