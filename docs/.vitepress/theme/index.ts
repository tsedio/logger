// https://vitepress.dev/guide/custom-theme
import {DefaultTheme} from "@tsed/vitepress-theme";
import type {Theme} from "vitepress";
import {h} from "vue";
import HomeBanner from "@tsed/vitepress-theme/organisms/home/HomeBanner.vue";
import HomePartners from "@tsed/vitepress-theme/organisms/home/HomePartners.vue";
import HomeBody from "@tsed/vitepress-theme/organisms/home/HomeBody.vue";
import HomeTerminal from "./components/HomeTerminal.vue";

import "./style.css";

export default {
  extends: DefaultTheme,
  Layout: () => {
    return h(DefaultTheme.Layout, null, {
      "home-hero-image": () =>
        h(HomeBanner, null, {
          default: () =>
            h(HomeTerminal, null, {})
        }),
      "home-features-before": () => h(HomePartners),
      "home-features-after": () => h(HomeBody)
    });
  }
} satisfies Theme;
