import { Storage } from 'aws-amplify';
import ago from 's-ago';
import { IImageSettings, IChip } from '../Interfaces/interfaces';

// TODO - Use for Tooltip - Check if date generates when adding new post to DB
export function getDateTimeString(): string {
    const currentdate = new Date();
    const date = `${currentdate.getFullYear()}/${currentdate.getMonth() + 1}/${currentdate.getDate()}`;
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

    return true;
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
    userId:string,
    imageArray:Array<IImageSettings>,
    storageType:string,
):Promise<boolean> => {
    const promises:Array<Promise<boolean>> = [];

    imageArray.forEach((image:IImageSettings) => {
        promises.push(uploadImageToS3(userId, image, storageType));
    });

    return Promise.all(promises).then(() => true).catch((err) => {
        console.log('ERROR:', err);
        return false;
    });
};

export const fileToBase64 = (file: File):Promise<string | ArrayBuffer | null> => new Promise((resolve) => {
    const reader = new FileReader(); // Read file content on file loaded event

    reader.onload = () => {
        const results = reader.result;

        if (results === undefined) { resolve(null); }

        resolve(results);
    };

    reader.readAsDataURL(file);
});

export const moveItemInArray = (array:ReadonlyArray<IImageSettings>, from:number, to:number):Array<IImageSettings> => {
    const newArray:Array<IImageSettings> = [...array];
    return newArray.splice(to, 0, newArray.splice(from, 1)[0]);
};

export const formatDate = (date: Date | string): string => ago(new Date(date));

export const capitalizeFirstLetter = (value: string):string => {
    if (value === undefined) {
        return '';
    }
    return value.toLowerCase().charAt(0).toUpperCase() + value.toLowerCase().slice(1);
};
