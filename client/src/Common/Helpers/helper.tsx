import { Storage } from 'aws-amplify';
import { IImageSettings, IChip } from '../Interfaces/interfaces';

export function getDateTimeString(): string {
    const currentdate = new Date();
    const date = `${currentdate.getFullYear()}/${currentdate.getMonth()+1}/${currentdate.getDate()}`;
    const time = `${currentdate.getHours()}:${currentdate.getMinutes()}:${currentdate.getSeconds()}`;
    return `${date} ${time}`;
}

// fArrObj = Array of Object Features
export function sortFeaturesArray(fArrObj: Array<IChip>): Array<string> {
    return fArrObj.map((object: IChip) => object.value);
}

const uploadImageToS3 = async (userId: string, imgObj: IImageSettings, storageType: string) => {
    const storagePutLink = `${userId}/${storageType}/${imgObj.name}.${imgObj.type}`;

    await Storage.put(`${storagePutLink}`, dataURItoBlob(imgObj.data64), {
        ContentEncoding: 'base64',
        ContentType: `image/${imgObj.type}`,
    });
};

const dataURItoBlob = (dataURI: string) => {
    const binary = atob(dataURI.split(',')[1]);
    const array = [];
    for (let i = 0; i < binary.length; i++) {
        array.push(binary.charCodeAt(i));
    }
    return new Blob([new Uint8Array(array)], { type: 'image/jpeg' });
};

export const uploadImagesToS3 = (
    userId: string,
    imageArray: Array<IImageSettings>,
    storageType: string,
): Promise<boolean> => {
    const promises = [];

    const imageArrayLength = imageArray.length;
    for (let index = 0; index < imageArrayLength; index++) {
        promises.push(uploadImageToS3(userId, imageArray[index], storageType));
    }

    return Promise.all(promises)
        .then(() => {
            console.log('Done');
            return true;
        })
        .catch((err) => {
            console.log('ERROR:', err);
            return false;
        });
};
