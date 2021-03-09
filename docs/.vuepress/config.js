/*
 * @Author: your name
 * @Date: 2020-11-09 17:51:31
 * @LastEditTime: 2020-11-19 17:27:29
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /blog/docs/.vuepress/config.js
 */
module.exports = {
  title: '小乐的技术分享',
  description: '前端知识记录分享',
  themeConfig: {
    nav: [
      { text: '主页', link: '/' },
      { text: 'Segmentfault主页', link: 'https://segmentfault.com/u/yagenl' },
      { text: 'Github', link: 'https://github.com/GenXiaoLe' },
    ],
    sidebar: [
      {
        title: 'node基础',
        path: '/nodeBasis/',
        collapsable: false, // 可选的, 默认值是 true,
        sidebarDepth: 6,    // 可选的, 默认值是 1
      },
      {
        title: 'vue2基础',
        path: '/vue2Basis/',
        collapsable: false, // 可选的, 默认值是 true,
        sidebarDepth: 6,    // 可选的, 默认值是 1
      },
      {
        title: '项目应用',
        path: '/project/',
        collapsable: false, // 可选的, 默认值是 true,
        sidebarDepth: 6,   // 可选的, 默认值是 1
      },
      {
        title: '服务端部署',
        path: '/webProject/',
        collapsable: false, // 可选的, 默认值是 true,
        sidebarDepth: 6,    // 可选的, 默认值是 1
      },
      {
        title: '前端算法',
        path: '/algorithm/',
        collapsable: false, // 可选的, 默认值是 true,
        sidebarDepth: 6,    // 可选的, 默认值是 1
      },
      {
        title: '个人拓展文章',
        path: '/article/',
        collapsable: false, // 可选的, 默认值是 true,
        sidebarDepth: 6,    // 可选的, 默认值是 1
      },
    ],
    sidebarDepth: 6,
    lastUpdated: 'Last Updated', 
  },
  markdown: {
    lineNumbers: true
  }
}