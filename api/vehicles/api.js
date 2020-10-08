'use strict';
const Database = require('./database');
const https = require('https');
const axios = require('axios');
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

module.exports.callExternal = options => new Promise((resolve, reject) => {
    const defaultOptions = {
        path: '/',
        hostname: '',
        method: 'GET',
    };

    console.log('START');

    const optionser = {
        headers: options.headers,
        body: options.body,
        method: 'POST',
    };
      
    axios.post(options.hostname + options.path, {}, optionser).then(response => {
        console.log("Response: ", response);
        resolve(response);
    }).catch(error=> {
        console.log("ERROR: ", error);
        reject(error);
    });

    console.log("FINISHED");


    /*const req = https.request({...defaultOptions, ...options}, (response) => {
        console.log('WORKING');
        console.log('request made:', response);
        let str = '';

        response.on('data', (chunk) => {
            console.log("rep:");
            console.log(JSON.parse(chunk));
            str += chunk;
        });

        response.on('end', function () {
            if (response.statusCode === 200) {
                try {
                    const data = JSON.parse(str);
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
    });

    req.on('error', function (err) {
        console.log('Error:', err);
        reject(err);
    });

    req.end()*/
});


/*

const defaultOptions = {
        path: '/',
        hostname: '',
        method: 'GET',
    };

    console.log('START');

    const req = https.request({...defaultOptions, ...options}, (response) => {
        console.log('WORKING');
        console.log('request made:', response);
        let str = '';

        response.on('data', (chunk) => {
            console.log("rep:");
            console.log(JSON.parse(chunk));
            str += chunk;
        });

        response.on('end', function () {
            if (response.statusCode === 200) {
                try {
                    const data = JSON.parse(str);
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
    });

    req.on('error', function (err) {
        console.log('Error:', err);
        reject(err);
    });

    req.end()
    */
