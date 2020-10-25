import React, { useState, useEffect } from 'react';
import Divider from '@material-ui/core/Divider';
import { useParams } from 'react-router-dom';

import NavBarComponent from '../../Components/Header';
import FooterComponent from '../../Components/Footer';
import VehicleInfoComponent from '../../Components/VehicleInfo';
import PostsComponent from '../../Components/Posts';
import {
    IVehicleInfo, IOwner, IData, IComment, IVehicleParams,
} from '../../Common/Interfaces/interfaces';
import styles from './styles';
import { IClasses } from '../../Common/Interfaces/IClasses';
import { defaultComment, defaultOwner, defaultVehicleData } from '../../Common/Helpers/Defaults';
import { getThread } from '../../Common/Helpers/DB_Helpers';

interface IVehicleProps {
}

const VehiclePage = (): React.ReactElement<IVehicleProps> => {
    const classes: IClasses = styles();

    const { id } = useParams<IVehicleParams>();

    const [threadID, setThreadID] = useState<string>(id);
    const [memberData, setMemberData] = useState<IOwner>(defaultOwner);
    const [vehicleID, setVehicleID] = useState<number>(-1);
    const [vehicleData, setVehicleData] = useState<IVehicleInfo>(defaultVehicleData);
    const [postData, setPostData] = useState<Array<IComment>>([defaultComment]);

    const fetch = async (thread_ID: string) => {
        const data: IData = await getThread(thread_ID);

        setMemberData(data.owner);
        setVehicleData(data.vehicle);
        setVehicleID(data.vehicle.vehicle_id);
        setPostData(data.posts);
    };

    useEffect(() => {
        // Setting ID
        setThreadID(id);

        // Grabbing vehicle information
        fetch(threadID);
    }, [id, threadID]);

    return (
        <section className={classes.body}>
            <section id="menu" className={classes.menu}>
                <NavBarComponent />
            </section>

            <section style={{ width: '100%' }}>
                <VehicleInfoComponent owner={memberData} vehicle={vehicleData} />
            </section>

            <section className={classes.mainContentGap}>
                <Divider variant="middle" />
            </section>

            <section className={classes.mainContentGap}>
                <PostsComponent vehicleID={vehicleID} posts={postData} />
            </section>

            <section className={classes.mainContentGap}>
                <FooterComponent />
            </section>
        </section>
    );
};

export default VehiclePage;