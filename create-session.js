const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function createAdminSession() {
  try {
    console.log('Creating admin session...');
    
    // Get the admin user
    const adminUser = await prisma.user.findFirst({
      where: {
        role: 'ADMIN'
      }
    });
    
    if (!adminUser) {
      console.log('❌ No admin user found');
      return null;
    }
    
    // Create a session for the admin user
    const expiresAt = new Date();
    expiresAt.setHours(expiresAt.getHours() + 24); // 24 hours from now
    
    // Generate a realistic device fingerprint
    const fingerPrintComponents = [
      'Node.js test client',  // User agent
      'en-US,en;q=0.9',       // Accept language
      'gzip, deflate, br',    // Accept encoding
      '*/*',                  // Accept
      '127.0.0.1'             // IP address
    ];
    
    const deviceId = require('crypto')
      .createHash('sha256')
      .update(fingerPrintComponents.join('|'))
      .digest('hex')
      .substring(0, 32);
    
    const session = await prisma.session.create({
      data: {
        userId: adminUser.id,
        userRole: 'ADMIN',
        deviceId: deviceId,
        deviceInfo: 'Node.js test client',
        ipAddress: '127.0.0.1',
        userAgent: 'Node.js test client',
        expiresAt: expiresAt
      }
    });
    
    console.log('✅ Admin session created successfully:', session.id);
    return session;
    
  } catch (error) {
    console.error('❌ Error creating admin session:', error);
    return null;
  } finally {
    await prisma.$disconnect();
  }
}

createAdminSession();