import { 
    IInputFields, 
    IInputErrorMessages, 
    IInputLimits 
} from '../../Common/Interfaces/interfaces';

import { defaultInputErrorMessages } from '../../Common/Helpers/Defaults';

const LIST: IInputLimits = {
    numberPlate: 7,
    vin: 15,
    make: 15,
    model: 15,
    primaryColour: 10,
    secondaryColour: 10,
};

const check = (expectedValue:number, actualValue:number) => actualValue <= expectedValue;

const checkFieldLengths = (values:IInputFields):IInputErrorMessages => {
    let lengthErrors:IInputErrorMessages = defaultInputErrorMessages;

    Object.keys(values).forEach((key:string) => {
        const value = values[key];
        if (typeof value !== 'string') { return; }
        if (check(LIST[key], value.length)) { return; }
        lengthErrors[key] = 'Length is too long';
    });

    return lengthErrors;
};

const onValidate = (values:IInputFields) => {
    let errors:IInputErrorMessages = defaultInputErrorMessages;

    const newErrors:IInputErrorMessages = checkFieldLengths(values);
    errors = {...errors, ...newErrors}

    if (values.numberPlate) {
        if (!values.numberPlate) {
            errors.numberPlate = "Required number plate!";
        }
    }

    return errors;
};

export default  onValidate;