/**
 * Script to update homepage content in the database
 * This will ensure the API returns the correct values
 */

const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient({
  datasources: {
    db: {
      url: process.env.DATABASE_URL
    }
  }
})

// Define your desired homepage content here
const HOMEPAGE_CONTENT = {
  heroTitle: "Master the Art of Dance",
  heroSubtitle: "Join our community of passionate dancers and experienced instructors",
  heroButtonText: "Start Your Journey",
  heroBackgroundImage: "/images/hero-default.svg", // Change to your actual image URL
  aboutTitle: "Why Choose Our Studio?",
  aboutDescription: "We offer a wide range of dance classes for all skill levels, with expert instructors and a supportive community.",
  testimonialsEnabled: true,
  newsletterEnabled: true,
}

async function updateHomepageContent() {
  console.log('🔧 Updating homepage content...\n')

  try {
    // Update or create in HomepageContent table (preferred method)
    console.log('📝 Updating HomepageContent table...')
    const updated = await prisma.homepageContent.upsert({
      where: { id: 'homepage' },
      create: {
        id: 'homepage',
        ...HOMEPAGE_CONTENT,
      },
      update: HOMEPAGE_CONTENT,
    })

    console.log('✅ Homepage content updated successfully:')
    console.log(JSON.stringify(updated, null, 2))

    console.log('\n' + '='.repeat(80) + '\n')

    // Verify the update
    console.log('🔍 Verifying update...')
    const verified = await prisma.homepageContent.findUnique({
      where: { id: 'homepage' }
    })

    if (verified) {
      console.log('✅ Verification successful!')
      console.log('Database now contains:')
      console.log(JSON.stringify(verified, null, 2))
    }

    console.log('\n✨ Update complete!')
    console.log('\n⚠️  NOTE: You may need to redeploy your API to clear any cache:')
    console.log('   - Vercel: The API should automatically reflect changes (revalidate = 0)')
    console.log('   - If issues persist, trigger a redeploy on Vercel')

  } catch (error) {
    console.error('❌ Error updating homepage content:', error)
    console.error('\nPossible issues:')
    console.error('1. Database connection issue - check your DATABASE_URL')
    console.error('2. HomepageContent table does not exist - run prisma migrate')
    console.error('3. Permission issues - check database user permissions')
  } finally {
    await prisma.$disconnect()
  }
}

// Run the update
updateHomepageContent()
