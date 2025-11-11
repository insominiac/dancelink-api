const { PrismaClient } = require('@prisma/client');

async function reorganizeSBKStyles() {
  const prisma = new PrismaClient();
  
  try {
    console.log('🔄 Reorganizing SBK dance styles...');
    
    // First, let's update Salsa and Bachata to be in the SBK category
    console.log('Updating Salsa to SBK category...');
    await prisma.danceStyle.updateMany({
      where: {
        name: 'Salsa'
      },
      data: {
        category: 'SBK',
        subtitle: 'Salsa, Bachata & Kizomba',
        description: 'Experience the passion and rhythm of Latin partner dances. Salsa for energy, Bachata for romance, and Kizomba for sensual connection.',
        sortOrder: 1
      }
    });
    
    console.log('Updating Bachata to SBK category...');
    await prisma.danceStyle.updateMany({
      where: {
        name: 'Bachata'
      },
      data: {
        category: 'SBK',
        subtitle: 'Salsa, Bachata & Kizomba',
        description: 'Experience the passion and rhythm of Latin partner dances. Salsa for energy, Bachata for romance, and Kizomba for sensual connection.',
        sortOrder: 2
      }
    });
    
    // Check if Kizomba already exists
    const existingKizomba = await prisma.danceStyle.findFirst({
      where: {
        name: 'Kizomba'
      }
    });
    
    if (!existingKizomba) {
      console.log('Adding Kizomba to SBK category...');
      await prisma.danceStyle.create({
        data: {
          name: 'Kizomba',
          category: 'SBK',
          subtitle: 'Salsa, Bachata & Kizomba',
          description: 'Experience the passion and rhythm of Latin partner dances. Salsa for energy, Bachata for romance, and Kizomba for sensual connection.',
          difficulty: 'Beginner to Intermediate',
          origin: 'Angola',
          musicStyle: 'Kizomba',
          characteristics: 'Smooth, sensual, partner-based',
          benefits: 'Partner connection, rhythm, core strength, sensual expression',
          schedule: 'Fri 7:00 PM',
          price: '$25 per class',
          instructors: 'Maria Rodriguez',
          icon: '🔥',
          isFeatured: true,
          sortOrder: 3,
          isActive: true
        }
      });
    } else {
      console.log('Updating existing Kizomba to SBK category...');
      await prisma.danceStyle.update({
        where: {
          id: existingKizomba.id
        },
        data: {
          category: 'SBK',
          subtitle: 'Salsa, Bachata & Kizomba',
          description: 'Experience the passion and rhythm of Latin partner dances. Salsa for energy, Bachata for romance, and Kizomba for sensual connection.',
          sortOrder: 3
        }
      });
    }
    
    // Verify the changes
    const sbkStyles = await prisma.danceStyle.findMany({
      where: {
        category: 'SBK'
      },
      orderBy: {
        sortOrder: 'asc'
      }
    });
    
    console.log('\n✅ SBK dance styles reorganized successfully!');
    console.log('\n📊 Updated SBK styles:');
    sbkStyles.forEach(style => {
      console.log(`  - ${style.name} (${style.category}) - Sort Order: ${style.sortOrder}`);
    });
    
    console.log('\n🎉 SBK section (Salsa, Bachata & Kizomba) is now properly organized!');
    
  } catch (error) {
    console.error('❌ Error reorganizing SBK styles:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

reorganizeSBKStyles();