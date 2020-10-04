// import { IpOwner } from 'aws-sdk/clients/macie2';

export interface IVehicleInfo {
    vehicle_id: number,
    date_added: string,
    description: string,
    features: Array<string>,
    images: Array<string>,
    location: string,
    number_plate: string,
    owner_id: string,
    status: number,
    make: string,
    model: string,
    vin: string,
    category: string,
}

export interface IOwner {
    member_attributes: {
        display_name: string,
        profile_image: string,
    },
}

export interface IPosts {
    posts: Array<IComment>;
}

export interface IComment {
    post_id: number,
    type: number,
    date_added: string,
    member_attributes: {
        profile_image: string,
        display_name: string,
    },
    post_attributes: {
        message: string,
        confirmation_image: string,
        active_state: boolean,
    },
}

export interface IData {
    vehicle: IVehicleInfo;
    owner: IOwner;
    posts: IPosts;
}
