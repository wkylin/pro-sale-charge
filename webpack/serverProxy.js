const argv = require('yargs-parser')(process.argv.slice(2))
const env = argv.env ? argv.env : 'sit'
const target = `https://hc-${env}.yonghuivip.com`

module.exports = {
  '/app/api': {
    target,
    secure: false,
    changeOrigin: true,
    cookieDomainRewrite: 'localhost',
  },
  '/signin': {
    target,
    secure: false,
    changeOrigin: true,
    cookieDomainRewrite: 'localhost',
  },
  '/signout': {
    target,
    secure: false,
    changeOrigin: true,
    cookieDomainRewrite: 'localhost',
  },
  '/account': {
    target,
    secure: false,
    changeOrigin: true,
    cookieDomainRewrite: 'localhost',
  },
  '/faker': {
    target: 'http://localhost:4000',
    pathRewrite: { '^/faker': '' },
    secure: false,
    changeOrigin: true,
    cookieDomainRewrite: 'localhost',
  },
}
