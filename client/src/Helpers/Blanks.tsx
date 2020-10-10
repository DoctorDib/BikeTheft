import {
    IVehicleInfo,
    IOwner,
    IMemberAttributes,
    IPostAttributes,
    IComment,
    IData,
    IInputFields,
    IChip,
} from '../Common/Interfaces/interfaces';

export const BlankVehicleData: IVehicleInfo = {
    vehicle_id: -1,
    date_added: '',
    description: '',
    features: [],
    images: [''],
    location: '',
    number_plate: '',
    owner_id: '',
    status: -1,
    make: '',
    model: '',
    vin: '',
    category: '',
};

export const BlankMemberAttributes: IMemberAttributes = {
    display_name: '',
    profile_image: '',
};

export const BlankPostAttributes: IPostAttributes = {
    message: '',
    confirmation_image: '',
    active_state: false,
};

export const BlankOwner: IOwner = {
    member_attributes: BlankMemberAttributes,
};

export const BlankComment: IComment = {
    post_id: -1,
    type: -1,
    date_added: '',
    member_attributes: BlankMemberAttributes,
    post_attributes: BlankPostAttributes,
};

export const BlankData: IData = {
    vehicle: BlankVehicleData,
    owner: BlankOwner,
    posts: [BlankComment],
};

export const BlankChip: IChip = {
    key: -1,
    value: '',
};

export const BlankInputs: IInputFields = {
    numberPlate: '',
    vin: '',
    make: '',
    model: '',
    category: 0,
    primaryColour: '',
    secondaryColour: '',
    dateStolen: new Date(),
    location: '',
    features: '',
    featuresArray: [],
    description: '',
    v5cVerificationDate: '',
};
