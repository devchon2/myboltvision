import type { StorybookConfig } from "@storybook/experimental-nextjs-vite";

const config: StorybookConfig = {
  "stories": [
    "../stories/**/*.mdx",
    "../stories/**/*.stories.@(js|jsx|mjs|ts|tsx)"
  ],
  "addons": [
    "@storybook/addon-essentials",
    "@storybook/addon-onboarding",
    "@chromatic-com/storybook",
    "@storybook/experimental-addon-test"
  ],
  "framework": {
    "name": "@storybook/experimental-nextjs-vite",
    "options": {}
  },
  "staticDirs": [
    "..\\public"
  ],
  "viteFinal": (config) => {
    config.optimizeDeps = {
      ...config.optimizeDeps,
      exclude: [
        "@storybook/core/csf",
        "@storybook/core/preview/runtime",
        "@storybook/addon-measure/preview",
        "@storybook/addon-docs/dist/preview",
        "@storybook/addon-outline/preview",
        "@storybook/addon-viewport/preview",
        "@storybook/addon-actions/preview",
        "@storybook/addon-backgrounds/preview",
        "@storybook/instrumenter",
        "@storybook/addon-highlight/preview",
        "@storybook/addon-docs/dist/shims/mdx-react-shim",
        "@swc/helpers/_/_interop_require_default",
        "@babel/runtime/helpers/extends",
        "@swc/helpers/_/_interop_require_wildcard",
        "@storybook/react-dom-shim",
        "@emotion/serialize",
        "@emotion/use-insertion-effect-with-fallbacks",
        "@emotion/utils",
        "@emotion/cache",
        "@emotion/is-prop-valid",
        "@emotion/weak-memoize",
        "hoist-non-react-statics"
      ]
    };
    return config;
  }
};
export default config;
