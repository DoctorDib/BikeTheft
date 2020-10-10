const API = require('./api');

let response = {
    statusCode: 200,
    isBase64Encoded: false,
    headers: {
        "Content-Type": 'application/json',
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "Content-Type,Authorization,X-Amz-Date,X-Api-Key,X-Amz-Security-Token,x-token",
        "Access-Control-Allow-Methods": "DELETE,GET,HEAD,OPTIONS,PATCH,POST,PUT"
    }
};

module.exports.get_dvla_data = (event, context, callback) => {
    const eBody = JSON.parse(event.body);
    const key = process.env.dvla;
    console.log('Attempting to grab DVLA data');

    const body = {
        "registrationNumber": eBody.number_plate
    };

    API.call({
        hostname: 'driver-vehicle-licensing.api.gov.uk',
        path: '/vehicle-enquiry/v1/vehicles',
        method: 'POST',
        body,
        headers: {
            'x-api-key': eBody.key,
        }
    }).then(data => {
        console.log(data);

        response.body = JSON.stringify(data);
        context.callbackWaitsForEmptyEventLoop = false;
        callback(null, response);
    });
};

module.exports.ping = (event, context, callback) => {
    response.body = JSON.stringify({ message: 'pong' });
    callback(null, response);
};