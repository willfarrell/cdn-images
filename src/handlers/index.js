const path = require('path');
const AWS = require('../lib/aws')
const s3 = new AWS.S3();
const core = require('../lib/core')
const svg = require('../lib/svg')

const outputFormat = (image, params) => {
    let ext = path.extname(image)
    ext = ext.substr(1)
    if (ext === 'jpg') ext = 'jpeg'

    // TODO needs love
    if (!params.fm) params.fm = ext
    if (params.fm === ext) return ext

    if (params.fm === 'svg' && ext !== 'svg') {
        console.error('Invalid output format', ext, params.fm)
        return null
    }

    return params.fmt
}

const app = async (event) => {
    const headers = event.headers
    const params = event.queryStringParameters || {}
    const image = event.pathParameters.image
    //console.log('headers', headers)
    //console.log('params', params)

    //console.log(`${process.env.BUCKET}/${process.env.PREFIX}${image}`)

    const data = await s3.getObject({
        Bucket: process.env.BUCKET,
        Key: `${process.env.PREFIX}${image}`
    }).promise().catch(e => {
        console.error(e.message)
    })

    const format = outputFormat(image, params)

    if (!format) {
        // TODO add in fallback image
        return {
            statusCode: 400,
            headers: {
                'Content-Type': 'text/json'
            },
            body: {
                error: ''
            }
        }
    }

    if (format === 'svg') {
        return svg(data.Body, data)
    }

    return core(data.Body, params, format, headers, data)
}

const handler = require('../middleware')(app)

module.exports = {handler}
