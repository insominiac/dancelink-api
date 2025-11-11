// Print latest SiteSettings.footer.homepage from the DB
const { PrismaClient } = require('@prisma/client')

async function main() {
  const prisma = new PrismaClient()
  try {
    const latest = await prisma.siteSettings.findFirst({ orderBy: { createdAt: 'desc' } })
    const homepage = latest && latest.footer ? latest.footer.homepage : null
    console.log(JSON.stringify({ hasSettings: !!latest, homepage: homepage || null }, null, 2))
  } catch (e) {
    console.error('DB error:', e?.message || e)
    process.exit(1)
  } finally {
    await prisma.$disconnect()
  }
}

main()
