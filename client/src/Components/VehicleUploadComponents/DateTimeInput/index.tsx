/* eslint-disable @typescript-eslint/no-namespace */
import React from 'react';
import { useFormikContext } from 'formik';

import { MuiPickersUtilsProvider, DateTimePicker } from 'material-ui-pickers';
import DateFnsUtils from '@date-io/date-fns';
import { IInputFields } from '../../../Common/Interfaces/interfaces';
import { IClasses } from '../../../Common/Interfaces/IClasses';
import styles from './styles';

interface IDateTimeProps {
}

const NumberPlateInput = ():React.ReactElement<IDateTimeProps> => {
    const { values, setFieldValue } = useFormikContext<IInputFields>();

    const classes: IClasses = styles();

    const onChange = (newTime:Date) => {
        if (newTime === values.dateStolen) { return; }
        setFieldValue('dateStolen', newTime);
    };

    return (
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <DateTimePicker
                id="dateStolen"
                variant="outlined"
                label="Date Stolen"
                disableFuture
                value={values.dateStolen}
                onChange={onChange}
                autoOk
                ampm={false}
                className={classes.input}
            />
        </MuiPickersUtilsProvider>
    );
};

export default NumberPlateInput;
