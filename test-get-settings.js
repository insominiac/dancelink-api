const http = require('http');

const options = {
  hostname: 'localhost',
  port: 3000,
  path: '/api/admin/content/settings',
  method: 'GET',
  headers: {
    'User-Agent': 'Node.js test client',
    'Accept-Language': 'en-US,en;q=0.9',
    'Accept-Encoding': 'gzip, deflate, br',
    'Accept': '*/*',
    'X-Forwarded-For': '127.0.0.1',
    // Set the cookies for authentication
    'Cookie': 'session_id=cmhtf1of00001v1ujy4i9mlup; user_id=cmhtewv7j0000v1kvdydfezob; user_role=ADMIN'
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

req.end();