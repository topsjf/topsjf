import {linuxBasis} from "./linux-basis.ts";

/**
 * Linux 侧边栏json数据
 */
export const linuxJson =
   [// {
     //   text: "Linux",
    //    icon: "linux",
     //   prefix: "linux/",
     //   collapsable: true,
     //   children: [
            {
                text: "基础命令",
                icon: "object",
                prefix: "basis/",
                collapsable: true,
                children: linuxBasis,
                //children: "structure",
            },
            "command-examples",
            "exception-analysis",
            "network-setting",
            "disk",
            "yum-repo",
            "update-kernel",
            "jenkins",
            {
                text: "ansible运维管理工具",
                icon: "tool",
                prefix: "ansible/",
                collapsable: true,
                children: "structure",
               // children: [
                //    "ansible-basis",
                 //   "ansible",
                 //   "ansible-doc",
                 //   "ansible-playbook",
                  //  "ansible-galaxy",
                 //   "ansible-jdk",
                //    "ansible-docker",
                 //   "ansible-mysql",
                //    "ansible-redis",
                 //   "ansible-nginx",
              //  ]
            },
            "shell",
        ]
 //   }
