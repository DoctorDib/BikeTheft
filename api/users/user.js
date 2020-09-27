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

module.exports.me = (event, context, callback) => {
    const eBody = JSON.parse(event.body);
    const body = {
        method: 'get_self',
        member_id: eBody.id,
    };

    API.call(body).then(data => {
        response.body = JSON.stringify(data);
        context.callbackWaitsForEmptyEventLoop = false;
        callback(null, response);
    });
};

// This will just return a basic overview of any user
module.exports.get_user = (event, context, callback) => {
    const eBody = JSON.parse(event.body);
    const body = {
        method: 'get_user',
        member_id: eBody.id,
    };

    API.call(body).then(data => {
        response.body = JSON.stringify(data);
        context.callbackWaitsForEmptyEventLoop = false;
        callback(null, response);
    });
}
