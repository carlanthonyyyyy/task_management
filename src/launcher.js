const { execSync } = require('child_process');

try {
  console.log('Installing dependencies...');
  execSync('npm install', { stdio: 'inherit' });

  console.log('Starting the app...');
  execSync('npm start', { stdio: 'inherit' });
} catch (err) {
  console.error('Error during startup:', err);
}
