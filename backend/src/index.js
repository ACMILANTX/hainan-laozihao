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
