'use strict';
const axios = require('axios');

module.exports.call = options => new Promise((resolve, reject) => {
    const defaultOptions = {
        path: '/',
        hostname: '',
        method: 'GET',
    };

    axios({
        method: 'post',
        baseURL: `https://${options.hostname}`,
        url: options.path,
        headers: options.headers,
        data: options.body,
    }).then(response => {
        resolve(response.data)
    }).catch((error) => {
        reject(JSON.stringify(error));
    });
});
