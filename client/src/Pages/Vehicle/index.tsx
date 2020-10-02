import React, { useState, useEffect } from 'react';
import Divider from '@material-ui/core/Divider';
import { API } from 'aws-amplify';
import { useParams } from 'react-router-dom';

import NavBarComponent from '../../Components/Header';
import FooterComponent from '../../Components/Footer';
import VehicleInfoComponent from '../../Components/VehicleInfo';
import PostsComponent from '../../Components/Posts';

import {
    IData,
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
                confirmation_image: ''
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

    const [vehicleID, setVehicleID] = useState<string>(id);
    const [memberData, setMemberData] = useState<IOwner>(defaultOwnerData);
    const [vehicleData, setVehicleData] = useState<IVehicleInfo>(defaultData);
    const [postData, setPostData] = useState<IPosts>(defaultPosts);

    const fetch = async (vehicleInfoID: string) => {
        try {
            const returnData: IData = await API.post('base_endpoint', '/forum/get', { body: { thread_id: vehicleInfoID } });

            console.debug(returnData);

            setMemberData(returnData.owner);
            setVehicleData(returnData.vehicle);
            setPostData(returnData);
        } catch (e) {
            console.error(e);
        }
    };

    useEffect(() => {
        // Setting ID
        setVehicleID(id);

        // Grabbing vehicle information
        fetch(vehicleID);
    }, [id, vehicleID]);

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