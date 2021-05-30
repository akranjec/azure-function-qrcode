module.exports = async function (context, req) {
    const qrCode = require('qrcode');
    const config = require('./config.json');

    context.log('JavaScript HTTP trigger function processed a request.');

    const name = (req.query.name || (req.body && req.body.name));

    context.res = {
        headers: {
            'Content-Type': 'image/png'
        },
        body: name ? await qrCode.toBuffer(name) : dataUriToBuffer(config.errorImageDataUri)
    };
}

function dataUriToBuffer(dataUri) {
    return Buffer.from(dataUri.split(",")[1], 'base64');
}
