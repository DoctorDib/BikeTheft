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
    [key: string]: string|number|Array<string>;
}

export interface IMemberAttributes {
    display_name: string,
    profile_image: string,
}

export interface IOwner {
    member_attributes: IMemberAttributes,
}

export interface IPostAttributes {
    message: string,
    confirmation_image: string,
    active_state: boolean,
}

export interface IComment {
    post_id: number,
    type: number,
    date_added: string,
    member_attributes: IMemberAttributes,
    post_attributes: IPostAttributes,
}

export interface IData {
    vehicle: IVehicleInfo;
    owner: IOwner;
    posts: Array<IComment>;
}

export interface IChip {
    key: number,
    value: string,
}

export interface IInputFields {
    numberPlate: string,
    vin: string,
    make: string,
    model: string,
    primaryColour: string,
    secondaryColour: string,
    features: string,
    featuresArray: Array<IChip>,
    description: string,
    [key: string]: string | Array<string> | Array<IChip>;
}
