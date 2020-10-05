import React, { useState } from 'react';

import { API } from 'aws-amplify';

import ImageUploaderComponent from '../../Components/ImageUploader';

import { DVLAAPIKEY } from '../../../../secrets/constants';

import {
    TextField,
    Button,
} from '@material-ui/core';

import styles from './styles';
import { IClasses } from '../../Common/Interfaces/IClasses';

interface IImageUploaderProps {

}

interface IInputFields {
    numberPlate: string,
    vin: string|null,
    make: string,
    model: string,
    primaryColour: string,
    secondaryColour: string,
    features: string,
    description: string,
}

const BlankInputs = {
    numberPlate: '',
    vin: null,
    make: '',
    model: '',
    primaryColour: '',
    secondaryColour: '',
    features: '',
    description: '',
}

const VehicleUploadInputs: React.FC<IImageUploaderProps> = (props: IImageUploaderProps) => {
    const classes: IClasses = styles();

    const [input, setInput] = useState<IInputFields>(BlankInputs);

    const onLeave = (event) => {
        setInput({...input, [event.target.id]: event.target.value })
        console.log(input);
    }

    const GetDVLAData = async () => {
        const body = {
            body: {
                post: 443,
                keyHead: 'x-api-key',
                key: DVLAAPIKEY,
                number_plate: 'HX16 WFK',
            },
        };

        try {
            const returnData = await API.post('base_endpoint', '/vehicles/get_dvla_data', body);

            console.debug(returnData);
            return returnData;
        } catch (e) {
            console.error(e);
            return false;
        }
    };

    const SetNumberPlate = () => {
    }

    return (
        <section className={classes.mainContainer}>

            <Button onClick={GetDVLAData}> Click for test </Button>

            <section className={classes.mainContentGap}>
                <ImageUploaderComponent />
            </section>

             <section className={classes.mainContentGap}>
                <TextField id='numberPlate' label="Number Plate" variant="filled" onBlur={onLeave} className={classes.input} />

                <TextField id='vin' label="VIN" variant="filled" onBlur={onLeave} className={classes.input} />
             </section>

             <section className={classes.mainContentGap}>
                <TextField id='numberPlate' label="Date time" variant="filled" onBlur={onLeave} className={classes.input} />

                <TextField id='vin' label="Location" variant="filled" onBlur={onLeave} className={classes.input} />
             </section>

             <section className={classes.mainContentGap}>
                <TextField id='make' label="Make" variant="filled" onBlur={onLeave} className={classes.input} />

                <TextField id='model' label="Model" variant="filled" onBlur={onLeave} className={classes.input} />
             </section>

             <section className={classes.mainContentGap}>
                <TextField id='primaryColour' label="Main Colour" variant="filled" onBlur={onLeave} className={classes.input} />

                <TextField id='secondaryColour' label="Secondary colour" variant="filled" onBlur={onLeave} className={classes.input} />
             </section>

             <section className={classes.mainContentGap}>
                <TextField id='features' label="Features" variant="filled" onBlur={onLeave} className={classes.input} />
            </section>

            <section className={classes.mainContentGap}>
                <TextField id='description' label="Description" variant="filled" onBlur={onLeave} className={classes.input} />
            </section>
        </section>
    );
};

export default VehicleUploadInputs;
