/**
 * Java 侧边栏json数据
 */
export const toolsJson =
  [//  {
   //     text: "开发工具",
   //     icon: "tool",
   //     prefix: "tools/",
    //    collapsable: true,
   //     children: [
            "java",
            "maven",
            "gradle",
            "idea",
            "eclipse",
            "nodejs-setting",
            "rsync",
            "vagrant-vmware",
            {
                text: "数据库管理工具",
                icon: "database",
                prefix: "database/",
                collapsable: true,
                children: "structure",
                //children: ["CHINER", "datagrip", "DBeaver", "screw"],
            },
            {
                text: "Git",
                icon: "git",
                prefix: "git/",
                collapsable: true,
                children: "structure",
                //children: [
                //    "git-setting",
                //    "git-intro",
                //    "github-tips",
                //    "deploy-gh-pages"
               // ],
            }
        ]
 //   }

