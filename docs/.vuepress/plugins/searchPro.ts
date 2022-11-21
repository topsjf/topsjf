// .vuepress/config.ts
import { searchProPlugin } from "vuepress-plugin-search-pro";

export default searchProPlugin({
      // 搜索引擎，是否索引内容
      indexContent: true,
      customFields: [
        {
          name: "title",
          getter: (page) => page.frontmatter.title,
          formatter: "标题：$content",
         
        },
        {
          name: "category",
          getter: (page) => page.frontmatter.category,
          formatter: "分类：$content",
         
        },
        {
          name: "tag",
          getter: (page) => page.frontmatter.tag,
          formatter: "标签：$content",
          
        },
        
      ],
})