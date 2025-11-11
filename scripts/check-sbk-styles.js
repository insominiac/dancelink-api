const { PrismaClient } = require('@prisma/client');

async function checkSBKStyles() {
  const prisma = new PrismaClient();
  
  try {
    const sbkStyles = await prisma.danceStyle.findMany({
      where: {
        name: {
          in: ['Salsa', 'Bachata', 'Kizomba']
        }
      }
    });
    
    console.log('SBK styles in database:');
    console.log(sbkStyles);
    console.log(`Total count: ${sbkStyles.length}`);
    
    // Check if Kizomba exists
    const kizombaStyle = await prisma.danceStyle.findFirst({
      where: {
        name: 'Kizomba'
      }
    });
    
    if (!kizombaStyle) {
      console.log('Kizomba style not found in database');
    }
    
  } catch (error) {
    console.error('Error fetching SBK styles:', error);
  } finally {
    await prisma.$disconnect();
  }
}

checkSBKStyles();