const { PrismaClient } = require('@prisma/client');

async function seedDanceStyles() {
  const prisma = new PrismaClient();
  
  try {
    // Clear existing dance styles
    console.log('🧹 Clearing existing dance styles...');
    await prisma.danceStyle.deleteMany({});
    
    // Create demo dance styles
    console.log('💃 Creating demo dance styles...');
    const danceStyles = [
      {
        name: 'Ballet',
        category: 'Classical',
        description: 'Classical ballet technique focusing on grace, precision, and artistry.',
        difficulty: 'Beginner to Advanced',
        origin: 'France',
        musicStyle: 'Classical',
        characteristics: 'Structured, technical, graceful',
        benefits: 'Improves posture, flexibility, strength, and coordination',
        schedule: 'Mon/Wed/Fri 6:00 PM',
        price: '$35 per class',
        instructors: 'Sarah Johnson',
        icon: '🩰',
        isFeatured: true,
        sortOrder: 1
      },
      {
        name: 'Salsa',
        category: 'Latin',
        description: 'Energetic partner dance with roots in Cuban son and mambo.',
        difficulty: 'Beginner to Advanced',
        origin: 'Cuba',
        musicStyle: 'Latin',
        characteristics: 'Partner-based, rhythmic, passionate',
        benefits: 'Cardio workout, social skills, rhythm development',
        schedule: 'Tue/Thu 7:00 PM',
        price: '$25 per class',
        instructors: 'Maria Rodriguez',
        icon: '💃',
        isFeatured: true,
        sortOrder: 2
      },
      {
        name: 'Hip Hop',
        category: 'Street',
        description: 'Urban dance style expressing creativity and individuality.',
        difficulty: 'Beginner to Advanced',
        origin: 'United States',
        musicStyle: 'Hip Hop, Rap, R&B',
        characteristics: 'Freestyle, expressive, energetic',
        benefits: 'Self-expression, cardio, coordination',
        schedule: 'Mon/Wed 8:00 PM',
        price: '$30 per class',
        instructors: 'Jason Lee',
        icon: '🕺',
        isFeatured: true,
        sortOrder: 3
      },
      {
        name: 'Contemporary',
        category: 'Modern',
        description: 'Fluid dance style combining elements of ballet, jazz, and modern dance.',
        difficulty: 'Intermediate to Advanced',
        origin: 'United States',
        musicStyle: 'Contemporary, Alternative',
        characteristics: 'Emotional, fluid, interpretive',
        benefits: 'Emotional expression, flexibility, creativity',
        schedule: 'Tue/Sat 5:00 PM',
        price: '$32 per class',
        instructors: 'Sarah Johnson',
        icon: '🌊',
        isFeatured: false,
        sortOrder: 4
      },
      {
        name: 'Jazz',
        category: 'Contemporary',
        description: 'High-energy dance style with sharp movements and theatrical flair.',
        difficulty: 'Beginner to Advanced',
        origin: 'United States',
        musicStyle: 'Jazz, Musical Theatre',
        characteristics: 'Sharp, theatrical, dynamic',
        benefits: 'Performance skills, flexibility, strength',
        schedule: 'Wed/Fri 6:30 PM',
        price: '$28 per class',
        instructors: 'Sarah Johnson',
        icon: '🎭',
        isFeatured: false,
        sortOrder: 5
      },
      {
        name: 'Bachata',
        category: 'Latin',
        description: 'Romantic Latin dance with close partner connection.',
        difficulty: 'Beginner to Intermediate',
        origin: 'Dominican Republic',
        musicStyle: 'Bachata',
        characteristics: 'Smooth, romantic, partner-based',
        benefits: 'Partner connection, rhythm, core strength',
        schedule: 'Thu 6:00 PM',
        price: '$25 per class',
        instructors: 'Maria Rodriguez',
        icon: '💑',
        isFeatured: false,
        sortOrder: 6
      },
      {
        name: 'Tap',
        category: 'Rhythm',
        description: 'Dance style emphasizing creating rhythmic sounds with shoes.',
        difficulty: 'Beginner to Advanced',
        origin: 'United States',
        musicStyle: 'Jazz, Broadway',
        characteristics: 'Rhythmic, percussive, musical',
        benefits: 'Rhythm, timing, leg strength',
        schedule: 'Mon 7:00 PM',
        price: '$25 per class',
        instructors: 'Jason Lee',
        icon: '👠',
        isFeatured: false,
        sortOrder: 7
      },
      {
        name: 'Breakdancing',
        category: 'Street',
        description: 'Acrobatic street dance style with spins, freezes, and power moves.',
        difficulty: 'Intermediate to Advanced',
        origin: 'United States',
        musicStyle: 'Hip Hop',
        characteristics: 'Acrobatic, athletic, expressive',
        benefits: 'Strength, flexibility, coordination',
        schedule: 'Sat 2:00 PM',
        price: '$30 per class',
        instructors: 'Jason Lee',
        icon: '🤸',
        isFeatured: false,
        sortOrder: 8
      }
    ];
    
    // Insert dance styles into database
    for (const style of danceStyles) {
      await prisma.danceStyle.create({
        data: style
      });
    }
    
    console.log(`✅ Created ${danceStyles.length} dance styles`);
    
    // Verify the creation
    const createdStyles = await prisma.danceStyle.findMany();
    console.log('\n📊 Verification - Dance styles in database:');
    createdStyles.forEach(style => {
      console.log(`  - ${style.name} (${style.category})`);
    });
    
    console.log('\n🎉 Dance styles seeding completed successfully!');
    
  } catch (error) {
    console.error('❌ Error seeding dance styles:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

seedDanceStyles();