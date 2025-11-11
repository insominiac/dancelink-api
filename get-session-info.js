const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function getSessionInfo() {
  try {
    console.log('Getting session and user info...');
    
    // Get the admin user
    const adminUser = await prisma.user.findFirst({
      where: {
        role: 'ADMIN'
      }
    });
    
    if (!adminUser) {
      console.log('❌ No admin user found');
      return;
    }
    
    console.log('Admin User ID:', adminUser.id);
    console.log('Admin User Email:', adminUser.email);
    
    // Get the session
    const session = await prisma.session.findFirst({
      where: {
        userId: adminUser.id,
        userRole: 'ADMIN'
      },
      orderBy: {
        createdAt: 'desc'
      }
    });
    
    if (!session) {
      console.log('❌ No session found for admin user');
      return;
    }
    
    console.log('Session ID:', session.id);
    console.log('Session Device ID:', session.deviceId);
    
  } catch (error) {
    console.error('❌ Error getting session info:', error);
  } finally {
    await prisma.$disconnect();
  }
}

getSessionInfo();