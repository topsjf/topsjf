/**
 * Java 侧边栏json数据
 */
export const databaseJson =
    //{
     //   text: "数据库",
     //   icon: "mysql",
     //   prefix: "database/",
     //   collapsable: true,
     //   children: [
      [      {
                text: "MySQL",
                icon: "mysql",
                prefix: "mysql/",
                collapsable: true,
                //children: [
                //    "install",
                //    "MySQL",
                //]
                children: "structure",
            },
            {
                text: "oracle",
                icon: "tool",
                prefix: "oracle/",
                children: "structure",
            },]
       // ],
  //  }

