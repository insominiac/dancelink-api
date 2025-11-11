/**
 * Database diagnostic script for homepage content
 * Run this to check what data exists in both HomepageContent table and SiteSettings
 */

const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient({
  datasources: {
    db: {
      url: process.env.DATABASE_URL
    }
  }
})

async function checkHomepageData() {
  console.log('🔍 Checking homepage content in database...\n')

  try {
    // Check HomepageContent table
    console.log('📋 Checking HomepageContent table:')
    const homepageContent = await prisma.homepageContent.findUnique({ 
      where: { id: 'homepage' } 
    })
    
    if (homepageContent) {
      console.log('✅ Found homepage content:')
      console.log(JSON.stringify(homepageContent, null, 2))
    } else {
      console.log('❌ No homepage content found in HomepageContent table')
    }

    console.log('\n' + '='.repeat(80) + '\n')

    // Check SiteSettings table
    console.log('📋 Checking SiteSettings table:')
    const siteSettings = await prisma.siteSettings.findFirst({
      orderBy: { createdAt: 'desc' }
    })
    
    if (siteSettings) {
      console.log('✅ Found site settings:')
      console.log('ID:', siteSettings.id)
      console.log('Site Name:', siteSettings.siteName)
      console.log('Created:', siteSettings.createdAt)
      console.log('Updated:', siteSettings.updatedAt)
      
      if (siteSettings.footer) {
        console.log('\n📄 Footer data:')
        console.log(JSON.stringify(siteSettings.footer, null, 2))
        
        const footerHomepage = siteSettings.footer?.homepage
        if (footerHomepage) {
          console.log('\n🏠 Homepage content in footer:')
          console.log(JSON.stringify(footerHomepage, null, 2))
        }
      }
    } else {
      console.log('❌ No site settings found')
    }

    console.log('\n' + '='.repeat(80) + '\n')

    // Check API response
    console.log('🌐 Checking API response from deployed endpoint:')
    try {
      const response = await fetch('https://dance-api-omega.vercel.app/api/public/content/homepage')
      const data = await response.json()
      console.log('API Response:')
      console.log(JSON.stringify(data, null, 2))
    } catch (err) {
      console.log('❌ Error fetching from API:', err.message)
    }

    console.log('\n✨ Diagnosis complete!')

  } catch (error) {
    console.error('❌ Error:', error)
  } finally {
    await prisma.$disconnect()
  }
}

checkHomepageData()
