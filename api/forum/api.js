'use strict';
const Database = require('./database');
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
