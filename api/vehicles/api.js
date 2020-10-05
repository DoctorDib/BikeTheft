'use strict';
const Database = require('./database');
const https = require('https');
let client = null;

module.exports.call = (packet) => new Promise((resolve, reject) => {
    console.log('Make call');
    let conn = process.env.postgres;
    let database = new Database(client, conn, () => {});

    if (packet === null) {
        return reject(210, { error: 'Empty api packet'});
    }

    const call_api = () => {
        client = database.getClient();
        let querySQL = 'SELECT motorwatch.api($1::JSON) AS response';

        client.query(querySQL,[packet], async function(err,result){
            // database.endClient();
            if(err) {
                console.log(err);
                reject(220, { error: 'API Call error' });
            } else {
                resolve(result.rows[0].response);
            }
        });
    };

    database.connect(call_api);
});

module.exports.callExternal = (domain, path, method, body, keyHead, key) => new Promise((resolve, reject) => {
    let headers = {
        "Content-Type": "application/json; charset=utf-8",
        "Authorization": "Basic hidden_in_question",
    };

    headers[keyHead] = key;

    const options = {
        host: domain,
        path: path,
        method: method,
        headers: headers,
        body: body,
    };

    const callback = (response) => {
        let str = '';


        response.on('data', (chunk) => {
            console.log("rep:");
            console.log(JSON.parse(data));
            str += chunk;
        });

        response.on('end', function () {
            if (response.statusCode === 200) {
                try {
                    var data = JSON.parse(str);
                    // data is available here:
                    resolve(data);
                } catch (e) {
                    console.log('Error parsing JSON!');
                    reject("Error passing JSON!");
                }
            } else {
                console.log('Status:', response.statusCode);
                reject(response);
            }
        });
    }

    const req = https.request(options, callback);

    req.on('error', function (err) {
        console.log('Error:', err);
        reject(err);
    });

    req.end()
});