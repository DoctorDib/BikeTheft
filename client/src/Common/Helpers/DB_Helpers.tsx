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
} from '../Interfaces/interfaces';

import { defaultData } from './Defaults';

export const sendPost = async (
    parentID: number,
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
        const returnData: IData = await API.post(
            'base_endpoint',
            '/forum/set_post',
            body,
        );
        console.debug(returnData);
        return true;
    } catch (e) {
        console.error(e);
        return false;
    }
};

export const getThread = async (threadID: string): Promise<IData> => {
    try {
        const returnData: IData = await API.post(
            'base_endpoint',
            '/forum/get',
            {
                body: { thread_id: threadID },
            },
        );

        console.debug(returnData);
        return returnData;
    } catch (e) {
        console.error(e);
        return defaultData;
    }
};

export const updatePost = async (
    postID: number,
    postAttributes: IPostAttributes,
): Promise<boolean> => {
    const body = {
        body: {
            post_id: postID,
            post_attributes: postAttributes,
        },
    };

    try {
        const returnData: IData = await API.post(
            'base_endpoint',
            '/forum/update_post',
            body,
        );
        console.debug(returnData);
        return true;
    } catch (e) {
        console.error(e);
        return false;
    }
};

export const updateVehicleStat = async (
    vehicleID: number,
    newStat: number,
): Promise<boolean> => {
    const body = {
        body: {
            vehicle_id: vehicleID,
            status: newStat,
        },
    };

    try {
        const returnData: IData = await API.post(
            'base_endpoint',
            '/vehicles/update_vehicle_stat',
            body,
        );
        console.debug(returnData);
        return true;
    } catch (e) {
        console.error(e);
        return false;
    }
};

const stripData64 = (images:Array<IImageSettings>) => images.map((data) => ({
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
): Promise<boolean> => {
    // Extracting the string values from an array of objects
    // e.g. [{key: 1, value: "one"}, {key: 2, value: "two"}]
    // is now ["one", "two"]
    const featuresArray: Array<string> = sortFeaturesArray(data.featuresArray);

    const body = {
        body: {
            owner_id: ownerID,
            // TODO - Set up location / geometry
            location: null,
            // for now we're defaulting vehicles that get uploaded to
            // automatically be assumed as stolen
            status: 1,
            number_plate: data.number_plate,
            make: data.make,
            model: data.model,
            category: data.category,
            vehicle_attributes: {
                primary_colour: data.primary_colour,
                secondary_colour: data.secondary_colour,
                features: featuresArray,
                description: data.description,
                v5c_verification_date: data.v5cVerificationDate,
                date_stolen: data.dateStolen,
                vehicle_images: stripData64(images),
            },
            vin: data.vin,
        },
    };

    try {
        const response = await API.post(
            'base_endpoint',
            '/forum/create_thread',
            body,
        );
        console.debug(response);
        return response;
    } catch (e) {
        console.error(e);
        return false;
    }
};
