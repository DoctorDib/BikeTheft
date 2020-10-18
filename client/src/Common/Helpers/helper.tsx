import { Storage } from 'aws-amplify';
import { IImageSettings } from '../Interfaces/interfaces';

export function getDateTimeString(): string {
    const currentdate = new Date();
    const date = `${currentdate.getFullYear()}/${currentdate.getMonth()}/${currentdate.getDate()}`;
    const time = `${currentdate.getHours()}:${currentdate.getMinutes()}:${currentdate.getSeconds()}`;
    return `${date} ${time}`;
}

export const SQLStringProtection = (message: string): string => message.replace(/[\t\r\n]|(--[^\r\n]*)|(\/\*[\w\W]*?(?=\*)\*\/)/gi, '');

export function checkSQLInObject(object: any): Record<string, unknown> {
    const newObject = object;
    Object.keys(newObject).forEach((value) => {
        const objectVal = newObject[value];

        if (typeof objectVal !== 'string') {
            return;
        }

        newObject[value] = SQLStringProtection(objectVal);
    });

    return newObject;
}

// fArrObj = Array of Object Features
export function sortFeaturesArray(fArrObj: Array<any>): Array<any> {
    return fArrObj.map((object: any) => object.value);
}

const uploadImageToS3 = async (userId:string, imgObj:any, storageType:string) => await Storage.put(`${userId}/${storageType}/${imgObj.name}.${imgObj.type}`, dataURItoBlob(imgObj.data64), {
    ContentEncoding: 'base64',
    ContentType: `image/${imgObj.type}`,
});

const dataURItoBlob = (dataURI:string) => {
    const binary = atob(dataURI.split(',')[1]);
    const array = [];
    for (let i = 0; i < binary.length; i++) {
        array.push(binary.charCodeAt(i));
    }
    return new Blob([new Uint8Array(array)], { type: 'image/jpeg' });
};

export const uploadImagesToS3 = (userId:string, imageArray:Array<IImageSettings>, storageType:string) => {
    const promises = [];

    const imageArrayLength = imageArray.length;
    for (let index = 0; index < imageArrayLength; index++) {
        promises.push(uploadImageToS3(userId, imageArray[index], storageType));
    }

    Promise.all(promises).then(() => {
        console.log('Done');
    }).catch((err) => {
        console.log('ERROR:', err);
    });
};
