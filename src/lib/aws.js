const AWS = require('aws-sdk')
const https = require('https')

const tlsAgent = new https.Agent({
    keepAlive: true,
    maxSockets: 50,
    rejectUnauthorized: true
})
tlsAgent.setMaxListeners(0)

AWS.config.update({
    httpOptions: {
        agent: tlsAgent
    }
})

module.exports = AWS