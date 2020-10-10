import { API } from 'aws-amplify';

import {
    GetDateTime,
    SQLStringProtection,
} from './helper';

import {
    IPostAttributes,
    IData,
} from '../Common/Interfaces/interfaces';

import {
    BlankData,
} from './Blanks';

export const SendPost = async (parentID: number, posterID:string, postAttributes:IPostAttributes,
    postType:number): Promise<boolean> => {
    const postAttributesSetup: IPostAttributes = postAttributes;
    postAttributesSetup.message = SQLStringProtection(postAttributes.message);

    const body = {
        body: {
            parent_id: parentID,
            poster_id: posterID,
            date_added: GetDateTime(),
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

export const GetThread = async (threadID: string): Promise<IData> => {
    try {
        const returnData: IData = await API.post('base_endpoint', '/forum/get', { body: { thread_id: threadID } });

        console.debug(returnData);
        return returnData;
    } catch (e) {
        console.error(e);
        return BlankData;
    }
};

export const UpdatePost = async (postID: number, postAttributes:IPostAttributes): Promise<boolean> => {
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

export const UpdateVehicleStat = async (vehicleID: number, newStat:number): Promise<boolean> => {
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
