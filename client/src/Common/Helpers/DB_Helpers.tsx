/* eslint-disable @typescript-eslint/naming-convention */
import { API } from 'aws-amplify';

import {
    getDateTimeString,
    sortFeaturesArray,
} from './helper';
import {
    IPostAttributes,
    IData,
    IInputFields,
    IImageSettings,
    ICreateThreadResponse,
} from '../Interfaces/interfaces';
import { defaultData } from './Defaults';

export const getNewVehicles = async (numberOfNewVehicles:number): Promise<boolean | number> => {
    const body = {
        body: { numberOfVehicles: numberOfNewVehicles },
    };

    try {
        const resp = await API.post('base_endpoint', '/vehicles/get_new_vehicles', body);
        console.log('Check response: ', resp);
        return resp.vehicle_list_var;
    } catch (e) {
        console.error(e);
        return false;
    }
};

export const checkNumberPlate = async (numberPlate: string): Promise<boolean | number> => {
    const body = {
        body: { number_plate: numberPlate },
    };

    console.log('checking: ', numberPlate);

    try {
        const resp = await API.post('base_endpoint', '/vehicles/check_number_plate', body);
        console.log('Check response: ', resp);
        return resp.exists;
    } catch (e) {
        console.error(e);
        return false;
    }
};

export const sendPost = async (
    parentID: string,
    posterID: string,
    postAttributes: IPostAttributes,
    postType: number,
): Promise<boolean> => {
    const body = {
        body: {
            parent_id: parentID,
            poster_id: posterID,
            date_added: getDateTimeString(),
            post_attributes: postAttributes,
            type: postType,
        },
    };

    try {
        const returnData: IData = await API.post('base_endpoint', '/forum/set_post', body);
        console.debug(returnData);
        return true;
    } catch (e) {
        console.error(e);
        return false;
    }
};

export const getThread = async (threadID: string): Promise<IData> => {
    try {
        const returnData: IData = await API.post('base_endpoint', '/forum/get', {
            body: { thread_id: threadID },
        });

        console.debug(returnData);
        return returnData;
    } catch (e) {
        console.error(e);
        return defaultData;
    }
};

export const updatePost = async (postID: number, postAttributes: IPostAttributes): Promise<boolean> => {
    const body = {
        body: {
            post_id: postID,
            post_attributes: postAttributes,
        },
    };

    try {
        const returnData: IData = await API.post('base_endpoint', '/forum/update_post', body);
        console.debug(returnData);
        return true;
    } catch (e) {
        console.error(e);
        return false;
    }
};

export const updateVehicleStat = async (vehicleID: number, newStat: number): Promise<boolean> => {
    const body = {
        body: {
            vehicle_id: vehicleID,
            status: newStat,
        },
    };

    try {
        const returnData: IData = await API.post('base_endpoint', '/vehicles/update_vehicle_stat', body);
        console.debug(returnData);
        return true;
    } catch (e) {
        console.error(e);
        return false;
    }
};

const stripData64 = (images: Array<IImageSettings>) => images.map((data) => ({
    name: data.name,
    is_main_image: data.is_main_image,
    type: data.type,
    crop: {
        crop_info: data.crop.crop_info,
    },
}));

export const createNewThread = async (
    ownerID: string,
    data: IInputFields,
    images: Array<IImageSettings>,
): Promise<boolean | ICreateThreadResponse> => {
    const {
        make,
        model,
        location,
        category,
        primary_colour,
        secondary_colour,
        description,
        vin,
    } = data;

    // Extracting the string values from an array of objects
    // e.g. [{key: 1, value: "one"}, {key: 2, value: "two"}]
    // is now ["one", "two"]
    const features: Array<string> = sortFeaturesArray(data.featuresArray);

    const serverThreadData = { // TODO this needs a type!!!
        body: {
            owner_id: ownerID,
            // TODO - Set up location / geometry
            location,
            // for now we're defaulting vehicles that get uploaded to
            // automatically be assumed as stolen
            status: 0,
            number_plate: data.numberPlate,
            make,
            model,
            category,
            vehicle_attributes: {
                primary_colour,
                secondary_colour,
                features,
                description,
                v5c_verification_date: data.v5cVerificationDate, // change like others when naming is better
                date_stolen: data.dateStolen,
                vehicle_images: stripData64(images),
            },
            vin,
            verified: false,
        },
    };

    try {
        const response:ICreateThreadResponse = await API.post(
            'base_endpoint',
            '/forum/create_thread',
            serverThreadData,
        );

        console.log('THREAD RESPONSE: ', response);

        return response;
    } catch (e) {
        console.error(e);
        return false;
    }
};
