const uaParser = require('ua-parser-js');

const process = (headers) => {
    // webp - whitelist
    // logic: https://caniuse.com/#feat=webp
    const ua = uaParser(headers['user-agent'])
    const browserName = ua.browser.name
    const browserVersion = Number.parseInt(ua.browser.version.split('.').slice(0, 2).join('.'))
    const os = ua.os.name
    if (
        (browserName === 'Edge' && browserVersion >= 18)
        || (browserName === 'FireFox' && browserVersion >= 65)
        || (browserName === 'Chrome' && os !== 'Android' && browserVersion >= 23)
        || (browserName === 'Chrome' && os === 'Android' && browserVersion >= 50)
        || (browserName === 'Opera' && browserVersion >= 12.1)
        || (browserName === 'Android Browser' && browserVersion >= 4.2)
    ) {
        return true
    }
    return false
}

module.export = process