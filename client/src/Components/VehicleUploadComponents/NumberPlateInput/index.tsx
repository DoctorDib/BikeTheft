/* eslint-disable @typescript-eslint/no-namespace */
import React, { useState } from 'react';
import { useFormikContext, Field } from 'formik';
import { Typography } from '@material-ui/core';
import { API } from 'aws-amplify';

import ModifiedTextfield from '../ModifiedTextfield';
import Env from '../../../Common/Utils/Env';
import { checkNumberPlate } from '../../../Common/Helpers/DB_Helpers';
import { IInputFields } from '../../../Common/Interfaces/interfaces';
import VehicleCategoryEnum from '../../../Common/Enums/VehicleCategoryEnum';
import { IClasses } from '../../../Common/Interfaces/IClasses';
import styles from './styles';

interface INumberPlateInputProps {
}

const NumberPlateInput = ():React.ReactElement<INumberPlateInputProps> => {
    const { values, errors, setFieldValue, setFieldError } = useFormikContext<IInputFields>();

    const classes: IClasses = styles();

    // Flag to determine if number plate has changed
    // if changed then we can make a call to DVLA
    const [numberPlateFlag, setNumberPlateFlag] = useState<boolean>(false);
    const [value, setValue] = useState<string>(values.numberPlate);

    const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (errors.numberPlate !== undefined && errors.numberPlate.length > 0) {
            setFieldError('numberPlate', '');
        }
        if (!numberPlateFlag) { setNumberPlateFlag(true); }
        setValue(event.target.value);
    };

    const onLeave = () => {
        // Only making API calls if number plate flat has been raised
        if (!numberPlateFlag) { return; }

        checkNumberPlate(value)
            .then((response:number | boolean) => {
                if (typeof response == 'number') {
                    setFieldError('numberPlate', `Vehicle post already exists at ${window.location.origin}/post/${response}`);
                    return;
                }

                getDVLAData(value)
                    .then((dvlaResponse:boolean):void => {
                        if (!dvlaResponse) { return; }
                        setNumberPlateFlag(false);
                        setFieldValue('numberPlate', value);
                    })
                    .catch((e) => {
                        console.log(e);
                    });
            }).catch((e) => {
                console.log(e);
                // setError(e);
            });
    };

    const setCategory = (wheelPlan: string): VehicleCategoryEnum => {
        const wheelPlanLowerCase: string = wheelPlan.toLowerCase();

        if (wheelPlanLowerCase.includes('2') && wheelPlanLowerCase.includes('wheel')) {
            return VehicleCategoryEnum.MOTORBIKE;
        }
        if (wheelPlanLowerCase.includes('2') && wheelPlanLowerCase.includes('axle')) {
            return VehicleCategoryEnum.CAR;
        }
        if (wheelPlanLowerCase.includes('3') && wheelPlanLowerCase.includes('axle')) {
            return VehicleCategoryEnum.TRUCK;
        }

        return VehicleCategoryEnum.NONE;
    };

    const getDVLAData = async (numberPlate: string):Promise<boolean> => {
        const body = {
            body: {
                post: 443,
                key: Env.SNOWPACK_PUBLIC_DVLAAPIKEY,
                number_plate: numberPlate,
            },
        };

        return await API.post('base_endpoint', '/external/dvla', body)
            .then((response) => {
                
                setFieldValue('make', response.make);
                setFieldValue('primaryColour', response.colour);
                setFieldValue('category', setCategory(response.wheelplan));
                setFieldValue('v5cVerificationDate', response.dateOfLastV5CIssued);
                return true;
            })
            .catch((responseError) => {
                console.log(responseError);
                // Only use for debugging
                console.log('DVLA API Error: ', responseError);
                setFieldError('numberPlate', 'Number plate not found in DVLA records');
                return false;
            });
    };

    return (
        <>
            <Field
                id="numberPlate"
                label="Number Plate"
                placeholder="Number Plate"
                value={value}
                onChange={onChange}
                onBlur={onLeave}
                component={ModifiedTextfield}
                className={classes.input}
            />
            <Typography className={classes.errorMessage} variant="caption">
                {errors.numberPlate}
            </Typography>
        </>
    );
};

export default NumberPlateInput;
