const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function checkHomepage() {
  try {
    console.log('=== Checking Homepage Data ===\n');
    
    const data = await prisma.homepageContent.findUnique({ 
      where: { id: 'homepage' } 
    });
    
    if (data) {
      console.log('✓ Database has HomepageContent:');
      console.log(JSON.stringify(data, null, 2));
    } else {
      console.log('✗ No HomepageContent record found with id="homepage"');
    }
    
    await prisma.$disconnect();
  } catch (error) {
    console.error('✗ Error:', error.message);
    await prisma.$disconnect();
    process.exit(1);
  }
}

checkHomepage();
