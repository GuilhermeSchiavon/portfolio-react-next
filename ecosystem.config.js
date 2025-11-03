module.exports = {
  apps: [{
    name: '9999_Schiavon-frontend',
    script: 'npm',
    args: 'start',
    cwd: '/var/www/schiavon/portfolio-react-next',
    instances: 1,
    autorestart: true,
    watch: false,
    max_memory_restart: '1G',
    env: {
      NODE_ENV: 'production',
      PORT: 9999
    }
  }]
}