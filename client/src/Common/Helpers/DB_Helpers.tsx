import { API } from 'aws-amplify';

import {
    getDateTimeString,
    SQLStringProtection,
    checkSQLInObject,
    sortFeaturesArray as ExtractValue,
} from './helper';

import { IPostAttributes, IData, IInputFields } from '../Interfaces/interfaces';

import { defaultData } from './Defaults';

export const sendPost = async (
    parentID: number,
    posterID: string,
    postAttributes: IPostAttributes,
    postType: number,
): Promise<boolean> => {
    const postAttributesSetup: IPostAttributes = postAttributes;
    postAttributesSetup.message = SQLStringProtection(postAttributes.message);

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

export const addNewVehicle = async (
    ownerID: number,
    data: IInputFields,
    images: Array<object>,
): Promise<boolean> => {
    const cleanData = checkSQLInObject(data);

    // Extracting the string values from an array of objects
    // e.g. [{key: 1, value: "one"}, {key: 2, value: "two"}]
    let featuresArray: any = ExtractValue(data.featuresArray);
    featuresArray = checkSQLInObject(featuresArray);

    console.log("here images")
    console.log(images)

    const body = {
        body: {
            owner_id: ownerID,
            // TODO - Set up location / geometry
            location: null,
            // for now we're defaulting vehicles that get uploaded to
            // automatically be assumed as stolen
            status: 1,
            number_plate: cleanData.number_plate,
            make: cleanData.make,
            model: cleanData.model,
            category: cleanData.category,
            vehicle_attributes: {
                primary_colour: cleanData.primary_colour,
                secondary_colour: cleanData.secondary_colour,
                features: featuresArray,
                description: cleanData.description,
                v5c_verification_date: cleanData.v5cVerificationDate,
                date_stolen: data.dateStolen,
            },
            vin: cleanData.vin,
            S3ImageUploads: images,
        },
    };

    try {
        const response = await API.post(
            'base_endpoint',
            '/vehicles/set_vehicle',
            body,
        );
        console.debug(response);
        return true;
    } catch (e) {
        console.error(e);
        return false;
    }
};
