// https://vitepress.dev/guide/custom-theme
import "./style.css";

import {DefaultTheme} from "@tsed/vitepress-theme";
import HomeBanner from "@tsed/vitepress-theme/organisms/home/HomeBanner.vue";
import HomeBeforeFeatures from "@tsed/vitepress-theme/organisms/home/HomeBeforeFeatures.vue";
import HomeBody from "@tsed/vitepress-theme/organisms/home/HomeBody.vue";
import type {Theme} from "vitepress";
import {h} from "vue";

import HomeTerminal from "./components/HomeTerminal.vue";

export default {
  extends: DefaultTheme,
  Layout: () => {
    return h(DefaultTheme.Layout, null, {
      "home-hero-image": () =>
        h(HomeBanner, null, {
          default: () => h(HomeTerminal, null, {})
        }),
      "home-features-before": () => h(HomeBeforeFeatures),
      "home-features-after": () => h(HomeBody)
    });
  }
} satisfies Theme;
