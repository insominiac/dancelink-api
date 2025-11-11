const { PrismaClient } = require('@prisma/client');

async function checkDanceStyles() {
  const prisma = new PrismaClient();
  
  try {
    const danceStyles = await prisma.danceStyle.findMany();
    console.log('Current dance styles in database:');
    console.log(danceStyles);
    console.log(`Total count: ${danceStyles.length}`);
  } catch (error) {
    console.error('Error fetching dance styles:', error);
  } finally {
    await prisma.$disconnect();
  }
}

checkDanceStyles();