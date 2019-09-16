
const middy = require('@middy/core')
//const cache = require('@middy/cache')
//const doNotWaitForEmptyEventLoop = require('@middy/do-not-wait-for-empty-event-loop')
const functionShield = require('@middy/function-shield')
const httpCors = require('@middy/http-cors')
const httpErrorHandler = require('@middy/http-error-handler')
const httpEventNormalizer = require('@middy/http-event-normalizer')
const httpHeaderNormalizer = require('@middy/http-header-normalizer')
const httpSecurityHeader = require('@middy/http-security-header')
//const ssm = require('@middy/ssm')
const validator = require('@middy/validator')
const warmup = require('@middy/warmup')

const ajvOptions = {
  v5: true,
  format: 'full',
  coerceTypes: true,
  allErrors: true,
  useDefaults: true,
  $data: true
}

const inputSchema = require('./schema.json')

module.exports = (app) =>
  middy(app)
      .use(warmup())
      /*.use(
          functionShield({
            token: 'null',
            disable_analytics: true
          })
      )*/
      .use(httpEventNormalizer())
      .use(httpHeaderNormalizer())

      .use(httpCors())
      .use(httpSecurityHeader())

      .use(validator({ inputSchema, ajvOptions }))
      .use(httpErrorHandler())