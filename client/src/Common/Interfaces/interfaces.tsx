import VehicleCategories from '../Enums/VehicleCategoryEnum';

export interface IVehicleInfo {
    vehicle_id: number;
    date_added: string;
    description: string;
    features: Array<string>;
    images: Array<IImageSettings>;
    location: string;
    number_plate: string;
    owner_id: string;
    status: number;
    make: string;
    model: string;
    vin: string;
    category: string;
    [key: string]: string | number | Array<string> | Array<IImageSettings>;
}

export interface IMemberAttributes {
    display_name: string;
    profile_image: string;
}

export interface IOwner {
    owner_id: string;
    member_attributes: IMemberAttributes;
}

export interface IPostAttributes {
    message: string;
    confirmation_image: IImageSettings;
    active_state: boolean;
    is_deleted: boolean;
    replying_to: number | null;
}

export interface IComment {
    post_id: number;
    type: number;
    date_added: string;
    member_attributes: IMemberAttributes;
    post_attributes: IPostAttributes;
}

export interface IData {
    vehicle: IVehicleInfo;
    owner: IOwner;
    posts: Array<IComment>;
}

export interface IChip {
    key: number;
    value: string;
}

export interface IInputFields {
    numberPlate: string;
    vin: string;
    make: string;
    model: string;
    primaryColour: string;
    secondaryColour: string;
    dateStolen: Date;
    location: string;
    category: VehicleCategories;
    features: string;
    description: string;
    featuresArray: Array<IChip>;
    v5cVerificationDate: string;
    [key: string]: string | Array<string> | Array<IChip> | Date | number;
}

export interface IImageHolder {
    name: string;
    local: string;
    file: HTMLInputElement & EventTarget;
}

export interface IImageSettings {
    id: number;
    // Ensuring a unique value based on name and Date.now()
    name: string;
    is_main_image: boolean;
    type: string;
    data64: string;
    crop: {
        original: string;
        crop_info: ICropSettings | null;
    };
}

export interface ICropSettings {
    unit: string;
    width: number;
    height: number;
    x: number;
    y: number;
}
