module.exports = {
  async bootstrap({ strapi }) {
    const pages = [
      {
        title: '关于我们',
        slug: 'about',
        content: '这里是协会简介，请在后台页面管理中进行编辑。',
        seoTitle: '关于我们',
        seoDescription: '了解协会愿景、使命与组织结构。'
      },
      {
        title: '联系我们',
        slug: 'contact',
        content: '联系电话：010-12345678\n邮箱：info@example.com\n地址：北京市朝阳区示例路 88 号',
        seoTitle: '联系我们',
        seoDescription: '获取协会联系方式和地址信息。'
      },
      {
        title: '站点配置',
        slug: 'site',
        heroTitle: '凝聚会员力量 · 共绘协会新篇',
        heroSubtitle: '以红色国潮视觉传递文化底蕴，打造兼具现代感与组织感的协会门户。这里汇聚会员风采、新闻动态与协会服务，展示专业、开放、协作的形象。',
        themePrimary: '#9f1239',
        themeBg: '#fff1f2',
        footerText: '© 协会官网 · 红色国潮主题'
      }
    ]

    for (const page of pages) {
      const existing = await strapi.entityService.findMany('api::page.page', {
        filters: { slug: page.slug },
        limit: 1
      })

      if (!existing.length) {
        await strapi.entityService.create('api::page.page', {
          data: page
        })
      }
    }
  }
}
