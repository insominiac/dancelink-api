const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function checkAdminUser() {
  try {
    console.log('Checking for existing admin users...');
    
    // Look for admin users
    const adminUsers = await prisma.user.findMany({
      where: {
        role: 'ADMIN'
      },
      select: {
        id: true,
        email: true,
        fullName: true,
        role: true
      }
    });
    
    console.log('Admin users found:', adminUsers);
    
    if (adminUsers.length > 0) {
      console.log('✅ Admin user exists');
      return adminUsers[0];
    } else {
      console.log('❌ No admin user found');
      return null;
    }
    
  } catch (error) {
    console.error('❌ Error checking admin users:', error);
    return null;
  } finally {
    await prisma.$disconnect();
  }
}

checkAdminUser();