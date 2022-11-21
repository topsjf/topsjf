/**
 * MQ 侧边栏json数据
 */
export const middlewareJson =
  //  {
   //     text: "中间件",
    //    icon: "tool",
   //     prefix: "middleware/",
   //     collapsable: true,
//        children: [
     [       {
                text: "MQ中间件",
                icon: "tool",
                prefix: "mq/",
                collapsable: true,
                children: "structure",
                //children: [
                //    "mq-rabbit",
                //    "mq-rocket",
                //    "kafka",
                 //   "mq-active",
              //  ],
            },
            "nginx",
            {
                text: "redis",
                icon: "redis",
                prefix: "redis/",
                collapsable: true,
                children: "structure",
                //children: [
                 //   "redis",
              //  ]
            },
            "elastic-search",
]
   //     ],
 //   }

