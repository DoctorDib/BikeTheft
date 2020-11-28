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

module.exports.get_new_vehicles = (event, context, callback) => {
    let body = JSON.parse(event.body);
    body.method = 'get_new_vehicles'
    
    API.call(body).then(data => {
        response.body = JSON.stringify(data);
        context.callbackWaitsForEmptyEventLoop = false;
        console.log("REPSONSE: ", response)
        callback(null, response);
    });
};

module.exports.check_number_plate = (event, context, callback) => {
    let body = JSON.parse(event.body);
    body.method = 'check_number_plate'
    
    console.log("DATA TO SEND: ", body)

    API.call(body).then(data => {
        response.body = JSON.stringify(data);
        context.callbackWaitsForEmptyEventLoop = false;
        console.log("REPSONSE: ", response)
        callback(null, response);
    });
};

module.exports.get_vehicle = (event, context, callback) => {
    const eBody = JSON.parse(event.body);
    const body = {
        method: 'get_vehicle',
        vehicle_id: parseInt(eBody.id),
    };

    API.call(body).then(data => {
        response.body = JSON.stringify(data);
        context.callbackWaitsForEmptyEventLoop = false;
        callback(null, response);
    });
};

module.exports.update_vehicle_stat = (event, context, callback) => {
    const eBody = JSON.parse(event.body);
    const body = {
        method: 'update_vehicle_stat',
        vehicle_id: parseInt(eBody.vehicle_id),
        status: eBody.status,
    };

    API.call(body).then(data => {
        response.body = JSON.stringify(data);
        context.callbackWaitsForEmptyEventLoop = false;
        callback(null, response);
    });
};

module.exports.set_vehicle = (event, context, callback) => {
    const body = JSON.parse(event.body);
    body.method = 'set_vehicle';
    
    API.call(body).then(data => {
        response.body = JSON.stringify(data);
        context.callbackWaitsForEmptyEventLoop = false;
        callback(null, response);
    });
};

module.exports.ping = (event, context, callback) => {
    response.body = JSON.stringify({ message: 'pong' });
    callback(null, response);
};
