const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function createAdminUser() {
  try {
    console.log('Creating admin user...');
    
    // Check if admin already exists
    const existingAdmin = await prisma.user.findFirst({
      where: {
        role: 'ADMIN'
      }
    });
    
    if (existingAdmin) {
      console.log('✅ Admin user already exists:', existingAdmin.email);
      return existingAdmin;
    }
    
    // Create admin user
    const adminUser = await prisma.user.create({
      data: {
        email: 'admin@dancelink.com',
        passwordHash: await bcrypt.hash('AdminPassword123!', 12),
        fullName: 'Admin User',
        role: 'ADMIN',
        isVerified: true
      }
    });
    
    console.log('✅ Admin user created successfully:', adminUser.email);
    return adminUser;
    
  } catch (error) {
    console.error('❌ Error creating admin user:', error);
    return null;
  } finally {
    await prisma.$disconnect();
  }
}

createAdminUser();