/* eslint-disable @typescript-eslint/no-namespace */
import React, { useState, useEffect } from 'react';
import {
    TextField,
    Typography,
} from '@material-ui/core';
import { API } from 'aws-amplify';
import { useField } from 'formik';

import Env from '../../../Common/Utils/Env';
import { checkNumberPlate } from '../../../Common/Helpers/DB_Helpers';
import { IInputFields } from '../../../Common/Interfaces/interfaces';
import VehicleCategoryEnum from '../../../Common/Enums/VehicleCategoryEnum';
import { IClasses } from '../../../Common/Interfaces/IClasses';
import styles from './styles';

interface INumberPlateInputProps {
    value: string,
    setValues: (key:string, value:string | VehicleCategoryEnum) => void;
    handleChange: (e: React.ChangeEvent<HTMLInputElement>)=>void;
    error: string;
    setError: (value:string) => void;
}

const NumberPlateInput = (props:INumberPlateInputProps):React.ReactElement<INumberPlateInputProps> => {
    const { value, setValues, handleChange, error, setError } = props;
    
    const classes: IClasses = styles();

    // Flag to determine if number plate has changed
    // if changed then we can make a call to DVLA
    const [numberPlateFlag, setNumberPlateFlag] = useState<boolean>(false);

    const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (error.length > 0) { setError(''); }
        
        setNumberPlateFlag(true);
        handleChange(event);
    };

    const onLeave = (event: React.FocusEvent<HTMLInputElement>) => {
        // Only making API calls if number plate flat has been raised
        if (!numberPlateFlag) { return; }

        checkNumberPlate(value)
            .then((response) => {
                console.log(response);
                if (!response) {
                    setError('Number plate already exists');
                    return;
                }

                setNumberPlateFlag(false);
                getDVLAData(event.target.value);
            }).catch((e) => {
                setError(e);
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

    const getDVLAData = async (numberPlate: string) => {
        const body = {
            body: {
                post: 443,
                key: Env.SNOWPACK_PUBLIC_DVLAAPIKEY,
                number_plate: numberPlate,
            },
        };

        await API.post('base_endpoint', '/external/dvla', body)
            .then((response) => {
                if (error.length > 0) {
                    setError('');
                }

                setValues('make', response.make);
                setValues('primaryColour', response.colour);
                setValues('category', setCategory(response.wheelplan));
                setValues('v5cVerificationDate', response.dateOfLastV5CIssued);
            })
            .catch((responseError) => {
                // Only use for debugging
                console.log('DVLA API Error: ', responseError);
                setError('API error, please try again later');
            });
    };

    return (
        <section className={classes.inputContainers}>
            <TextField
                id='numberPlate'
                label="Number Plate"
                onChange={onChange}
                value={value}
                error={error.length > 0}
                onBlur={onLeave}
                size="small"
                variant="outlined"
                className={classes.input}
            />
            <Typography className={classes.errorMessage} variant="caption"> { error } </Typography>
        </section>
    );
};

export default NumberPlateInput;
