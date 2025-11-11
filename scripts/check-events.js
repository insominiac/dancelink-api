const { PrismaClient } = require('@prisma/client');

async function checkEvents() {
  const prisma = new PrismaClient();
  
  try {
    const events = await prisma.event.findMany();
    console.log('Current events in database:');
    console.log(events);
    console.log(`Total count: ${events.length}`);
  } catch (error) {
    console.error('Error fetching events:', error);
  } finally {
    await prisma.$disconnect();
  }
}

checkEvents();