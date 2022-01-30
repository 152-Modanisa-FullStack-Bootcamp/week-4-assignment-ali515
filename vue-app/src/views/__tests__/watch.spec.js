import Vuex from "vuex";
import VueRouter from "vue-router";
import router from "../../router";
import { createLocalVue, shallowMount } from "@vue/test-utils";
import Watch from "../Watch";
import { GETTERS_VIDEO_ADDRESS } from "../../store";

function getMountConf(storeConf = {}) {
  const localVue = createLocalVue();

  localVue.use(Vuex);
  localVue.use(VueRouter);

  const store = new Vuex.Store(storeConf);

  return { store, router, localVue };
}

describe("watch component tests", () => {
  it("should be watch component exist", () => {
    const conf = getMountConf();
    const wrapper = shallowMount(Watch, conf);
    expect(wrapper.exists()).toBeTruthy();
  });

  it('should be get video by id', ()=> {
      const conf = getMountConf()
      const wrapper = shallowMount(Watch, conf)
      
  })
});
