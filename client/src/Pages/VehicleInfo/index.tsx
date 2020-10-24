import React, { useState, useEffect } from 'react';
import Divider from '@material-ui/core/Divider';
import { useParams } from 'react-router-dom';

import NavBarComponent from '../../Components/Header';
import FooterComponent from '../../Components/Footer';
import VehicleInfoComponent from '../../Components/VehicleInfo';
import PostsComponent from '../../Components/Posts';

import { IVehicleInfo, IOwner, IData, IComment } from '../../Common/Interfaces/interfaces';

import styles from './styles';
import { IClasses } from '../../Common/Interfaces/IClasses';
import { defaultComment, defaultOwner, defaultVehicleData } from '../../Common/Helpers/Defaults';
import { getThread } from '../../Common/Helpers/DB_Helpers';

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
                <VehicleInfoComponent threadID={threadID} owner={memberData} vehicle={vehicleData} />
            </section>

            <section className={classes.mainContentGap}>
                <Divider variant="middle" />
            </section>

            <section className={classes.mainContentGap}>
                <PostsComponent
                    threadID={threadID}
                    ownerID={memberData.owner_id}
                    vehicleID={vehicleID}
                    posts={postData}
                />
            </section>

            <section className={classes.mainContentGap}>
                <FooterComponent />
            </section>
        </section>
    );
};

export default VehiclePage;
