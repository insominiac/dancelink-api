// Set SiteSettings.footer.homepage to a demo payload
const { PrismaClient } = require('@prisma/client')

async function main() {
  const prisma = new PrismaClient()
  const SETTINGS_ID = 'site-settings'
  const homepage = {
    heroTitle: 'Discover Your Rhythm',
    heroSubtitle: 'Join thousands of dancers learning, connecting, and growing every day',
    heroButtonText: 'Explore Classes',
    heroBackgroundImage: '/images/hero-demo.jpg',
    aboutTitle: 'Why Choose DanceLink?',
    aboutDescription: 'Expert instructors, welcoming community, and classes for all levels.',
    testimonialsEnabled: true,
    newsletterEnabled: true,
  }
  try {
    const latest = await prisma.siteSettings.findFirst({ orderBy: { createdAt: 'desc' } })
    const footer = (latest?.footer || {})
    footer.homepage = homepage
    const saved = await prisma.siteSettings.upsert({
      where: { id: latest?.id || SETTINGS_ID },
      update: { footer, updatedAt: new Date() },
      create: {
        id: SETTINGS_ID,
        siteName: 'DanceLink',
        siteDescription: 'Public site settings',
        contactEmail: 'info@dancelink.com',
        footer,
      },
    })
    console.log('Updated footer.homepage at', saved.updatedAt)
  } finally {
    await prisma.$disconnect()
  }
}

main().catch((e) => { console.error(e); process.exit(1) })
