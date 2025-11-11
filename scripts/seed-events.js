const { PrismaClient } = require('@prisma/client');

async function seedEvents() {
  const prisma = new PrismaClient();
  
  try {
    console.log('🌱 Seeding demo events...');
    
    // First, let's check if we have venues and instructors for the events
    const venues = await prisma.venue.findMany();
    const instructors = await prisma.instructor.findMany();
    
    if (venues.length === 0) {
      console.log('⚠️  No venues found. Creating sample venues...');
      // Create sample venues
      await prisma.venue.createMany({
        data: [
          {
            name: 'Main Dance Studio',
            addressLine1: '123 Dance Avenue',
            city: 'New York',
            state: 'NY',
            country: 'USA',
            postalCode: '10001',
            phone: '+1 (555) 123-4567',
            status: 'PUBLISHED'
          },
          {
            name: 'Downtown Dance Center',
            addressLine1: '456 Broadway',
            city: 'New York',
            state: 'NY',
            country: 'USA',
            postalCode: '10002',
            phone: '+1 (555) 987-6543',
            status: 'PUBLISHED'
          }
        ]
      });
      console.log('✅ Created sample venues');
    }
    
    if (instructors.length === 0) {
      console.log('⚠️  No instructors found. Please run the main seed script first.');
      return;
    }
    
    // Get fresh venues and instructors after creation
    const freshVenues = await prisma.venue.findMany();
    const freshInstructors = await prisma.instructor.findMany();
    
    // Clear existing events
    console.log('🧹 Clearing existing events...');
    await prisma.event.deleteMany({});
    
    // Create demo events
    console.log('🎪 Creating demo events...');
    const now = new Date();
    const events = [
      {
        title: 'Salsa Night Social',
        description: 'Join us for an evening of salsa dancing, music, and fun! Perfect for all skill levels.',
        eventType: 'Social',
        startDate: new Date(now.getTime() + 2 * 24 * 60 * 60 * 1000), // 2 days from now
        endDate: new Date(now.getTime() + 2 * 24 * 60 * 60 * 1000),
        startTime: '19:00',
        endTime: '22:00',
        venueId: freshVenues[0].id,
        price: 15.00,
        maxAttendees: 50,
        currentAttendees: 0,
        imageUrl: '/images/events/salsa-night.jpg',
        organizerUserId: freshInstructors[0].userId,
        status: 'PUBLISHED',
        isFeatured: true
      },
      {
        title: 'Bachata Workshop',
        description: 'Learn the fundamentals of bachata with our expert instructor. No partner needed!',
        eventType: 'Workshop',
        startDate: new Date(now.getTime() + 5 * 24 * 60 * 60 * 1000), // 5 days from now
        endDate: new Date(now.getTime() + 5 * 24 * 60 * 60 * 1000),
        startTime: '18:00',
        endTime: '20:00',
        venueId: freshVenues[1].id,
        price: 25.00,
        maxAttendees: 20,
        currentAttendees: 0,
        imageUrl: '/images/events/bachata-workshop.jpg',
        organizerUserId: freshInstructors[0].userId,
        status: 'PUBLISHED',
        isFeatured: true
      },
      {
        title: 'Hip Hop Battle',
        description: 'Show off your skills in our monthly hip hop battle! Open to all levels.',
        eventType: 'Competition',
        startDate: new Date(now.getTime() + 8 * 24 * 60 * 60 * 1000), // 8 days from now
        endDate: new Date(now.getTime() + 8 * 24 * 60 * 60 * 1000),
        startTime: '20:00',
        endTime: '23:00',
        venueId: freshVenues[0].id,
        price: 10.00,
        maxAttendees: 100,
        currentAttendees: 0,
        imageUrl: '/images/events/hiphop-battle.jpg',
        organizerUserId: freshInstructors[1].userId,
        status: 'PUBLISHED',
        isFeatured: false
      },
      {
        title: 'Contemporary Dance Showcase',
        description: 'Experience the beauty of contemporary dance in this special performance evening.',
        eventType: 'Showcase',
        startDate: new Date(now.getTime() + 12 * 24 * 60 * 60 * 1000), // 12 days from now
        endDate: new Date(now.getTime() + 12 * 24 * 60 * 60 * 1000),
        startTime: '19:30',
        endTime: '21:30',
        venueId: freshVenues[1].id,
        price: 20.00,
        maxAttendees: 80,
        currentAttendees: 0,
        imageUrl: '/images/events/contemporary-showcase.jpg',
        organizerUserId: freshInstructors[1].userId,
        status: 'PUBLISHED',
        isFeatured: true
      },
      {
        title: 'Beginner Ballet Class',
        description: 'Perfect for those new to ballet. Learn the basics in a supportive environment.',
        eventType: 'Class',
        startDate: new Date(now.getTime() + 1 * 24 * 60 * 60 * 1000), // 1 day from now
        endDate: new Date(now.getTime() + 1 * 24 * 60 * 60 * 1000),
        startTime: '17:00',
        endTime: '18:30',
        venueId: freshVenues[0].id,
        price: 18.00,
        maxAttendees: 15,
        currentAttendees: 0,
        imageUrl: '/images/events/ballet-class.jpg',
        organizerUserId: freshInstructors[0].userId,
        status: 'PUBLISHED',
        isFeatured: false
      }
    ];
    
    // Insert events into database
    for (const eventData of events) {
      await prisma.event.create({
        data: eventData
      });
    }
    
    console.log(`✅ Created ${events.length} demo events`);
    
    // Verify the creation
    const createdEvents = await prisma.event.findMany();
    console.log('\n📊 Verification - Events in database:');
    createdEvents.forEach(event => {
      console.log(`  - ${event.title} (${event.eventType}) - ${event.startDate.toISOString().split('T')[0]}`);
    });
    
    console.log('\n🎉 Events seeding completed successfully!');
    
  } catch (error) {
    console.error('❌ Error seeding events:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

seedEvents();