const sharp = require('sharp');

const ectQuality = {
    '4g':1.0,
    '3g':0.8,
    '2g':0.6,
    'slow-2g':0.4
}

const processOptions = (params, headers) => {
    const options = {}

    // width
    if (params.w) {
        options.width = params.w * headers['dpr']

    } else if (headers['width']) {
        options.width = headers['width']    // includes DPR
    }

    if (headers['viewport-width'] && options.width) {
        options.width = Math.min(options.width, headers['viewport-width'])
    }

    // height
    if (params.h) {
        options.height = params.h * headers['dpr']
    }

    if (params.bg) {
        options.background = params.bg
    }

    if (params.fit) {
        options.fit = params.fit
    }

    return options
}

const process = async (data, params, format, headers, metadata) => {

    let image = await sharp(data)

    const options = processOptions(params, headers)
    if (Object.keys(options).length) {
        //console.log('resize', options)
        image = await image.resize(options)
    }

    if (params.grayscale) {
        console.log('grayscale')
        image = await image.grayscale()
    }

    // output format compression
    let qualityFactor = ectQuality[headers['ect']]
    if (headers['save-data'] === 'yes') qualityFactor *= 0.5

    if (format === 'jpeg') {
        image = await image.jpeg({
            progressive: true,
            quality: 80 * qualityFactor
        })
    } else if (format === 'png') {
        image = await image.png({
            progressive: true,
            quality: 100 * qualityFactor
        })
    } else if (format === 'webp') {
        image = await image.png({
            lossless: true,
            quality: 80 * qualityFactor
        })
    } else if (format === 'gif') {
        // TODO https://github.com/lovell/sharp/issues/1372
        // skip all changes
        return {
            statusCode: 200,
            headers: {
                'Content-Type': `image/${format}`,
                'Content-DPR': headers['dpr'],
                'Cache-Control': metadata.cacheControl
            },
            body: data.toString('base64'),
            isBase64Encoded: true
        }
    }

    const buffer = await image.toBuffer()

    return {
        statusCode: 200,
        headers: {
            'Content-Type': `image/${format}`,
            'Content-DPR': headers['dpr'],
            'Cache-Control': metadata.cacheControl
        },
        body: buffer.toString('base64'),
        isBase64Encoded: true
    }
}

module.exports = process
