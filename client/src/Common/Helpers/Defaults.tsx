import {
    IVehicleInfo,
    IOwner,
    IMemberAttributes,
    IPostAttributes,
    IComment,
    IData,
    IInputFields,
    IChip,
    IImageSettings,
    IInputErrorMessages,
} from '../Interfaces/interfaces';
import VehicleCategoryEnum from '../Enums/VehicleCategoryEnum';

export const defaultVehicleData: IVehicleInfo = {
    vehicle_id: -1,
    date_added: '',
    description: '',
    features: [],
    images: [],
    location: '',
    number_plate: '',
    owner_id: '',
    status: -1,
    make: '',
    model: '',
    vin: '',
    category: '',
    verified: false,
};

export const defaultMemberAttributes: IMemberAttributes = {
    display_name: '',
    profile_image: '',
};

export const defaultCropSettings: ReactCrop.Crop = {
    unit: '%',
    width: 1,
    height: 1,
    x: 50,
    y: 50,
};

export const defaultImageSettings: IImageSettings = {
    id: -1,
    name: '',
    is_main_image: false,
    type: '',
    data64: '',
    crop: {
        original: '',
        crop_info: defaultCropSettings,
    },
};

export const defaultPostAttributes: IPostAttributes = {
    message: '',
    confirmation_image: defaultImageSettings,
    active_state: false,
    is_deleted: false,
    replying_to: null,
};

export const defaultOwner: IOwner = {
    owner_id: '-1',
    member_attributes: defaultMemberAttributes,
};

export const defaultComment: IComment = {
    post_id: -1,
    type: -1,
    date_added: new Date(),
    member_attributes: defaultMemberAttributes,
    post_attributes: defaultPostAttributes,
};

export const defaultData: IData = {
    vehicle: defaultVehicleData,
    owner: defaultOwner,
    posts: [defaultComment],
};

export const defaultChip: IChip = {
    key: -1,
    value: '',
};

export const defaultInputs: IInputFields = {
    numberPlate: '',
    vin: '',
    make: '',
    model: '',
    category: VehicleCategoryEnum.NONE,
    primaryColour: '',
    secondaryColour: '',
    dateStolen: new Date(),
    location: '',
    features: '',
    featuresArray: [],
    description: '',
    v5cVerificationDate: '',
};

export const defaultInputErrorMessages: IInputErrorMessages = {
    numberPlate: '',
    vin: '',
    make: '',
    model: '',
    primaryColour: '',
    secondaryColour: '',
};
