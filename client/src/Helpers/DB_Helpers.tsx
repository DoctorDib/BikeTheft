import { API } from 'aws-amplify';

import { GetDateTime } from './helper';

import { IData } from '../Common/Interfaces/interfaces';

export const SavePost = 
    async (parent_id: number, poster_id:string, post_attributes:object, type:number) => {
    const body = { 
        body: { 
            parent_id: parent_id, 
            poster_id: poster_id, 
            date_added: GetDateTime(), 
            post_attributes: post_attributes, 
            type: type
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

export const GetThread = async (thread_id: string) => {
    try {
        const returnData: IData = await API.post('base_endpoint', '/forum/get', { body: { thread_id: thread_id } });

        console.debug(returnData);
        return returnData;
    } catch (e) {
        console.error(e);
        return false;
    }
};