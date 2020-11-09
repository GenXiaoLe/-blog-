module.exports = {
  title: '梁亚根的博客',
  description: '梁亚根的博客',
  themeConfig: {
    nav: [
      { text: '主页', link: '/' },
      { text: '博文',
        items: [
          { text: 'Android', link: '/android/' },
          { text: 'ios', link: '/ios/' },
          { text: 'Web', link: '/web/' }
        ] 
      },
      { text: '关于', link: '/about/' },
      { text: 'Github', link: 'https://github.com/GenXiaoLe' },
    ],
    sidebar: [
      {
        title: 'android',
        path: '/android/',
        collapsable: false, // 可选的, 默认值是 true,
        sidebarDepth: 6,    // 可选的, 默认值是 1
      },
      {
        title: 'ios',
        path: '/ios/',
        collapsable: false, // 可选的, 默认值是 true,
        sidebarDepth: 6,    // 可选的, 默认值是 1
      },
      {
        title: 'web',
        path: '/web/',
        collapsable: false, // 可选的, 默认值是 true,
        sidebarDepth: 6,    // 可选的, 默认值是 1
      },
    ],
    sidebarDepth: 1,
    lastUpdated: 'Last Updated', 
  }
}