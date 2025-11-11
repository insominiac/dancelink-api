const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function testSettings() {
  try {
    console.log('Testing SiteSettings database operations...');
    
    // Try to get existing settings
    const existingSettings = await prisma.siteSettings.findFirst({
      orderBy: { createdAt: 'desc' }
    });
    
    console.log('Existing settings:', existingSettings);
    
    // Create or update settings
    const testData = {
      siteName: "Test DanceLink",
      siteDescription: "Test description for DanceLink platform",
      contactEmail: "test@dancelink.com",
      phoneNumber: "+1 (555) 987-6543",
      address: "456 Test Street, Test City, TS 67890",
      socialMedia: {
        facebook: "https://facebook.com/testdancelink",
        instagram: "https://instagram.com/testdancelink",
        twitter: "https://twitter.com/testdancelink"
      },
      footer: {
        enabled: true,
        layout: "centered",
        backgroundColor: "gray-900",
        textColor: "white"
      }
    };
    
    let result;
    if (existingSettings) {
      // Update existing settings
      result = await prisma.siteSettings.update({
        where: { id: existingSettings.id },
        data: testData
      });
      console.log('Updated settings:', result);
    } else {
      // Create new settings record
      result = await prisma.siteSettings.create({
        data: testData
      });
      console.log('Created settings:', result);
    }
    
    console.log('✅ SiteSettings database operations working correctly!');
    
  } catch (error) {
    console.error('❌ Error testing SiteSettings:', error);
  } finally {
    await prisma.$disconnect();
  }
}

testSettings();