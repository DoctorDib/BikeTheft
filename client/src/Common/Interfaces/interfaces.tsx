// import { IpOwner } from 'aws-sdk/clients/macie2';

export interface IVehicleInfo {
    date_added: string,
    description: string,
    features: Array<string>,
    image: string,
    location: string,
    number_plate: string,
    owner_id: string,
    status: number,
    vehicle_make: string,
    vehicle_model: string,
}

export interface IOwner {
    display_name: string,
    profile_image: string,
    member_attributes: string,
}

export interface IPosts {
    posts: Array<IComment>;
}

export interface IComment {
    display_name: string,
    profile_image: string,
    date_added: string,
    post_attributes: {
        message: string,
    },
}

export interface IData {
    vehicle: IVehicleInfo;
    owner: IOwner;
    posts: IPosts;
}
