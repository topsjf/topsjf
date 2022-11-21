// .vuepress/search.ts
import {searchPlugin} from "@vuepress/plugin-search";

export const search = () => searchPlugin({
    // https://v2.vuepress.vuejs.org/zh/reference/plugin/search.html
    // 排除首页
    isSearchable: (page) => page.path !== "/",
    maxSuggestions: 10,
    hotKeys: ["s", "/"],
    // 用于在页面的搜索索引中添加额外字段
    getExtraFields: () => [],
    locales: {
        "/": {
            placeholder: "搜索文档",
        },
        "/zh/": {
            placeholder: "搜索文档",
        },
    },
})