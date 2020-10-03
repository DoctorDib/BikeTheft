import React, { useState, useEffect } from 'react';
import Divider from '@material-ui/core/Divider';
import { useParams } from 'react-router-dom';

import NavBarComponent from '../../Components/Header';
import FooterComponent from '../../Components/Footer';
import VehicleInfoComponent from '../../Components/VehicleInfo';
import PostsComponent from '../../Components/Posts';

import { GetThread } from '../../Helpers/DB_Helpers';

import {
    IPosts,
    IVehicleInfo,
    IOwner,
} from '../../Common/Interfaces/interfaces';

import styles from './styles';
import { IClasses } from '../../Common/Interfaces/IClasses';

interface IVehicleProps {
    // match: any;
}

const defaultData: IVehicleInfo = {
    date_added: '',
    description: '',
    features: [],
    image: '',
    location: '',
    number_plate: '',
    owner_id: '',
    status: -1,
    make: '',
    model: '',
    vin: '',
    category: '',
};

const defaultOwnerData: IOwner = {
    member_attributes: {
        profile_image: '',
        display_name: '',
    },
};

const defaultPosts: IPosts = {
    posts: [
        {
            type: -1,
            date_added: '',
            member_attributes: {
                display_name: '',
                profile_image: '',
            },
            post_attributes: {
                message: '',
                confirmation_image: '',
            },
        },
    ],
};

// TODO these props should be used
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const VehiclePage: React.FC<IVehicleProps> = (props: IVehicleProps) => {
    const classes: IClasses = styles();

    interface IParams {
        id: string;
    }
    const { id } = useParams<IParams>();

    const [threadID, setThreadID] = useState<string>(id);
    const [memberData, setMemberData] = useState<IOwner>(defaultOwnerData);
    const [vehicleData, setVehicleData] = useState<IVehicleInfo>(defaultData);
    const [postData, setPostData] = useState<IPosts>(defaultPosts);

    const fetch = (thread_ID: string) => {
        const data = GetThread(thread_ID);

        setMemberData(data.owner);
        setVehicleData(data.vehicle);
        setPostData(data);
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
                <PostsComponent posts={postData} />
            </section>

            <section className={classes.mainContentGap}>
                <FooterComponent />
            </section>
        </section>
    );
};

export default VehiclePage;
