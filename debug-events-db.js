const { PrismaClient } = require('@prisma/client');

async function debugEventsDb() {
  const prisma = new PrismaClient();
  
  try {
    console.log('=== Debugging Events Database ===');
    
    // Test database connection
    await prisma.$connect();
    console.log('✓ Database connected');
    
    // Check if EventsPageContent model exists and has data
    console.log('Querying for events page content with id="events"...');
    const rec = await prisma.eventsPageContent.findUnique({ where: { id: 'events' } });
    console.log('EventsPageContent record:', rec);
    
    if (rec) {
      console.log('✓ Found EventsPageContent record');
    } else {
      console.log('✗ No EventsPageContent record found with id="events"');
    }
    
    // Check if there are any events records at all
    console.log('Checking for any EventsPageContent records...');
    const allRecords = await prisma.eventsPageContent.findMany();
    console.log('All EventsPageContent records:', allRecords);
    
    await prisma.$disconnect();
  } catch (error) {
    console.error('✗ Error:', error.message);
    console.error('Error details:', error);
    await prisma.$disconnect();
  }
}

debugEventsDb();