import { API } from 'aws-amplify';

import { GetDateTime, SQLStringProtection } from './helper';

import { IData } from '../Common/Interfaces/interfaces';

export const SavePost = 
    async (parent_id: number, poster_id:string, post_attributes:object, type:number) => {

    post_attributes.message = SQLStringProtection(post_attributes.message);
    
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

export const GetThread = async (thread_id: string, callback: any) => {
    try {
        const returnData: IData = await API.post('base_endpoint', '/forum/get', { body: { thread_id: thread_id } });

        console.debug(returnData);
        callback(returnData);
    } catch (e) {
        console.error(e);
        callback(false);
    }
};