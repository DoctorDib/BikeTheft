import React, { useState, useEffect } from 'react';
import Divider from '@material-ui/core/Divider';
import { useParams } from 'react-router-dom';

import NavBarComponent from '../../Components/Header';
import FooterComponent from '../../Components/Footer';
import VehicleInfoComponent from '../../Components/VehicleInfo';
import PostsComponent from '../../Components/Posts';

import { GetThread } from '../../Helpers/DB_Helpers';

import {
    IVehicleInfo,
    IOwner,
    IData,
    IComment,
} from '../../Common/Interfaces/interfaces';

import {
    BlankVehicleData,
    BlankOwner,
    BlankComment,
} from '../../Helpers/Blanks';

import styles from './styles';
import { IClasses } from '../../Common/Interfaces/IClasses';

interface IVehicleProps {
    // match: any;
}

// TODO these props should be used
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const VehiclePage: React.FC<IVehicleProps> = (props: IVehicleProps) => {
    const classes: IClasses = styles();

    interface IParams {
        id: string;
    }
    const { id } = useParams<IParams>();

    const [threadID, setThreadID] = useState<string>(id);
    const [memberData, setMemberData] = useState<IOwner>(BlankOwner);
    const [vehicleID, setVehicleID] = useState<number>(-1);
    const [vehicleData, setVehicleData] = useState<IVehicleInfo>(BlankVehicleData);
    const [postData, setPostData] = useState<Array<IComment>>([BlankComment]);

    const fetch = async (thread_ID: string) => {
        const data:IData = await GetThread(thread_ID);

        setMemberData(data.owner);
        setVehicleData(data.vehicle);
        setVehicleID(data.vehicle.vehicle_id);
        setPostData(data.posts);

        console.log(data.posts);
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