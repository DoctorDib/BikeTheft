'use strict';
const Database = require('./database');
let client = null;
const s3 = require('aws-sdk');

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

    const upload_to_s3 = (image) => {
        const params={
            ACL :'public-read',
            Body : new Buffer.alloc(image.size),
            Bucket:'lostmywheels-image-storage',
            ContentType:image.type,
            Key:image.name
        }

        console.log("imageinfo::::::")
        console.log(image)

        return s3.upload(params).promise();
    };

    const upload_all_images = (imageArray) => {
        let promises=[];

        console.log(imageArray);

        const imageArrayLength = imageArray.length;
        for(let index = 0; index < imageArrayLength; index++){
            
            const file = imageArray[index];
            console.log("info::::::")
            console.log(file)
            promises.push(upload_to_s3(file));
        }

        Promise.all(promises).then(() => {
            res.send('Uploaded');
        }).catch(function(err){
            res.send(err.stack);
        });
    };

    console.log(packet);

    if (packet.hasOwnProperty('S3ImageUploads') && packet.S3ImageUploads.length)  { upload_all_images(packet.S3ImageUploads) }

    database.connect(call_api);
});