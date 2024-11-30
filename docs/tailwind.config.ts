import {tailwindPreset} from "@tsed/vitepress-theme/tailwind.preset";
import type {Config} from "tailwindcss";

const config = {
  presets: [tailwindPreset as unknown as Config],
  darkMode: "class",
  content: [
    "./.vitepress/**/*.{js,ts,vue}",
    "./.vitepress/theme/**/*.{js,ts,vue}",
    "./node_modules/@tsed/vitepress-theme/**/*.{js,ts,vue}",
    "./**/*.md"
  ],
  safelist: [
    {pattern: /^bg-/},
    {pattern: /^text-/},
    {pattern: /^m-/},
    {pattern: /^mx-/},
    {pattern: /^p-/},
    {pattern: /^px-/},
    {pattern: /^gap-/},
    {pattern: /^shadow-/}
  ]
} satisfies Config;

export default config;
