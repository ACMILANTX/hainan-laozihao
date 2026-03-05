const PUBLIC_READ_ACTIONS = [
  'api::member.member.find',
  'api::member.member.findOne',
  'api::news.news-item.find',
  'api::news.news-item.findOne',
  'api::news.news.find',
  'api::news.news.findOne',
  'api::page.page.find',
  'api::page.page.findOne'
]

async function ensurePublicReadPermissions(strapi) {
  if (!strapi.plugin('users-permissions')) {
    strapi.log.warn('[bootstrap] users-permissions 插件不可用，跳过 Public 权限初始化。')
    return
  }

  const publicRole = await strapi
    .query('plugin::users-permissions.role')
    .findOne({ where: { type: 'public' } })

  if (!publicRole) {
    strapi.log.warn('[bootstrap] 未找到 Public 角色，跳过 Public 权限初始化。')
    return
  }

  for (const action of PUBLIC_READ_ACTIONS) {
    const existingPermission = await strapi
      .query('plugin::users-permissions.permission')
      .findOne({
        where: {
          action,
          role: publicRole.id
        }
      })

    if (!existingPermission) {
      await strapi.query('plugin::users-permissions.permission').create({
        data: {
          action,
          role: publicRole.id,
          enabled: true
        }
      })
      continue
    }

    if (!existingPermission.enabled) {
      await strapi.query('plugin::users-permissions.permission').update({
        where: { id: existingPermission.id },
        data: { enabled: true }
      })
    }
  }

  strapi.log.info(`[bootstrap] Public 角色已确保开放读取权限：${PUBLIC_READ_ACTIONS.join(', ')}`)
}

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
        heroSubtitle:
          '以红色国潮视觉传递文化底蕴，打造兼具现代感与组织感的协会门户。这里汇聚会员风采、新闻动态与协会服务，展示专业、开放、协作的形象。',
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

    await ensurePublicReadPermissions(strapi)
  }
}
