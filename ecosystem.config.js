module.exports = {
  apps: [{
    name: 'portfolio-frontend',
    script: 'npm',
    args: 'start',
    cwd: '/var/www/portfolio/nextjs-portfolio',
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