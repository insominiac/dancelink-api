const { PrismaClient } = require('@prisma/client');

async function populateEventsContent() {
  const prisma = new PrismaClient();
  
  try {
    console.log('=== Populating Events Page Content ===');
    
    // Test database connection
    await prisma.$connect();
    console.log('✓ Database connected');
    
    // Check if record already exists
    const existing = await prisma.eventsPageContent.findUnique({ where: { id: 'events' } });
    if (existing) {
      console.log('Events page content already exists:');
      console.log(JSON.stringify(existing, null, 2));
      await prisma.$disconnect();
      return;
    }
    
    // Create default events page content
    const eventsContent = {
      id: 'events',
      heroBadgeText: '🎉 Upcoming Events',
      heroTitle: 'Join Our Dance Events',
      heroSubtitle: 'Discover exciting workshops, competitions, and social gatherings in our dance community',
      featuredTitle: 'Featured Events',
      featuredDescription: 'Don\'t miss these special events curated just for you',
      searchTitle: 'Find Your Perfect Event',
      searchDescription: 'Browse through our upcoming events and find the perfect dance experience for you',
      ctaBadgeText: '🌟 Special Offer',
      ctaTitle: 'Ready to Dance?',
      ctaDescription: 'Join our community and experience the joy of dance with fellow enthusiasts',
      heroFeatures: [
        { icon: '🎭', text: 'Expert Instructors' },
        { icon: '💃', text: 'Variety of Styles' },
        { icon: '🎪', text: 'Fun Atmosphere' }
      ],
      ctaButtons: {
        primary: { text: 'Book Your Spot', href: '/contact' },
        secondary: { text: 'View All Classes', href: '/classes' }
      },
      ctaFeatures: [
        { icon: '🏆', title: 'Competitions', description: 'Show off your skills in our friendly competitions' },
        { icon: '🎓', title: 'Workshops', description: 'Learn new techniques from industry professionals' },
        { icon: '🎊', title: 'Social Events', description: 'Connect with fellow dancers in our community events' }
      ]
    };
    
    console.log('Creating events page content...');
    const result = await prisma.eventsPageContent.create({
      data: eventsContent
    });
    
    console.log('✓ Successfully created events page content:');
    console.log(JSON.stringify(result, null, 2));
    
    await prisma.$disconnect();
  } catch (error) {
    console.error('✗ Error:', error.message);
    console.error('Error details:', error);
    await prisma.$disconnect();
  }
}

populateEventsContent();