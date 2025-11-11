const { PrismaClient } = require('@prisma/client');

async function debugActualEvents() {
  const prisma = new PrismaClient();
  
  try {
    console.log('=== Debugging Actual Events ===');
    
    // Test database connection
    await prisma.$connect();
    console.log('✓ Database connected');
    
    // Check if there are any actual events
    console.log('Querying for actual events...');
    const events = await prisma.event.findMany({
      where: {
        status: 'PUBLISHED'
      },
      take: 5
    });
    console.log('Sample events:', events);
    
    console.log('Total event count:', await prisma.event.count());
    
    await prisma.$disconnect();
  } catch (error) {
    console.error('✗ Error:', error.message);
    console.error('Error details:', error);
    await prisma.$disconnect();
  }
}

debugActualEvents();