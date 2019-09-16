const SVGO = require('svgo');

const svgo = new SVGO({
    plugins: [
        {cleanupAttrs: true},
        {removeDoctype: true},
        {removeXMLProcInst: true},
        {removeComments: true},
        {removeMetadata: true},
        {removeTitle: true},
        {removeDesc: true},
        {removeUselessDefs: true},
        {removeEditorsNSData: true},
        {removeEmptyAttrs: true},
        {removeHiddenElems: true},
        {removeEmptyText: true},
        {removeEmptyContainers: true},
        {removeViewBox: false},
        {cleanupEnableBackground: true},
        {convertStyleToAttrs: true},
        {convertColors: true},
        {convertPathData: true},
        {convertTransform: true},
        {removeUnknownsAndDefaults: true},
        {removeNonInheritableGroupAttrs: true},
        {removeUselessStrokeAndFill: true},
        {removeUnusedNS: true},
        {cleanupIDs: true},
        {cleanupNumericValues: true},
        {moveElemsAttrsToGroup: true},
        {moveGroupAttrsToElems: true},
        {collapseGroups: true},
        {removeRasterImages: false},
        {mergePaths: true},
        {convertShapeToPath: true},
        {sortAttrs: true},
        {removeDimensions: true},
        //{removeAttrs: {attrs: '(stroke|fill)'}} // strips color
    ]
});

const process = async (data, metadata) => {
    const res = await svgo.optimize(data, {})

    return {
        statusCode: 200,
        headers: {
            'Content-Type': 'image/svg+xml; charset=utf-8',
            'Cache-Control': metadata.cacheControl
        },
        body: res.data
    }
}

module.exports = process
