import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Kenis0307",
  description: "Kenis0307 Blog",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
      { text: '前端实战：使用 eslint + prettier 清理 Vue2 老项目的 💩 山', link: '/前端实战：使用 eslint + prettier 清理 Vue2 老项目的 💩 山' },
    ],

    sidebar: [
      {
        text: 'Examples',
        items: [
          { text: '前端实战：使用 eslint + prettier 清理 Vue2 老项目的 💩 山', link: '/前端实战：使用 eslint + prettier 清理 Vue2 老项目的 💩 山' },
          { text: 'Runtime API Examples', link: '/api-examples' }
        ]
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/kenis1108' }
    ]
  }
})
