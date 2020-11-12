module.exports = {
  title: '梁亚根的博客',
  description: '梁亚根的博客',
  themeConfig: {
    nav: [
      { text: '主页', link: '/' },
      { text: '关于', link: '/about/' },
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
        title: '个人拓展文章',
        path: '/article/',
        collapsable: false, // 可选的, 默认值是 true,
        sidebarDepth: 6,    // 可选的, 默认值是 1
      },
    ],
    sidebarDepth: 1,
    lastUpdated: 'Last Updated', 
  }
}