const http = require('http');

// Test data
const testData = {
  siteName: "Updated DanceLink",
  contactEmail: "updated@dancelink.com",
  siteDescription: "Updated description for DanceLink platform"
};

const options = {
  hostname: 'localhost',
  port: 3000,
  path: '/api/admin/content/settings',
  method: 'PUT',
  headers: {
    'Content-Type': 'application/json',
  }
};

const req = http.request(options, (res) => {
  console.log(`Status: ${res.statusCode}`);
  console.log(`Headers: ${JSON.stringify(res.headers)}`);
  
  let data = '';
  res.on('data', (chunk) => {
    data += chunk;
  });
  
  res.on('end', () => {
    console.log('Response:', data);
  });
});

req.on('error', (error) => {
  console.error('Error:', error);
});

req.write(JSON.stringify(testData));
req.end();