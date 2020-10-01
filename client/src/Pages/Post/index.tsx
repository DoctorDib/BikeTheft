import React, { useState, useEffect } from 'react';
import Divider from '@material-ui/core/Divider';

import { API } from 'aws-amplify';
import { useParams } from 'react-router-dom';

import NavBarComponent from '../../Components/Header';
import FooterComponent from '../../Components/Footer';
import PostInfoComponent from '../../Components/VehicleInfo';
import ForumComponent from '../../Components/Forum';

import {
    IData,
    IPosts,
    IVehicleInfo,
    IParams,
    IComment,
    IOwner,
} from '../../Common/Interfaces/interfaces';

import styles from './styles';
import { IClasses } from '../../Common/Interfaces/IClasses';

interface IPostProps {
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
    vehicle_make: '',
    vehicle_model: '',
};

const defaultOwnerData: IOwner = {
    display_name: '',
    profile_image: '',
};

const defaultPosts: IPosts = {
    posts: [
        {
            display_name: '',
            profile_image: '',
            date_added: '',
            post_attributes: {
                message: '',
            },
        }
    ],
};

// TODO these props should be used
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const PostPage: React.FC<IPostProps> = (props: IPostProps) => {
    const classes: IClasses = styles();

    const { id } = useParams<IParams>();

    const [vehicleID, setVehicleID] = useState(id);

    const [memberData, setMemberData] = useState<IOwner>(defaultOwnerData);
    const [vehicleData, setVehicleData] = useState<IVehicleInfo>(defaultData);
    const [postData, setPostData] = useState<IPosts>(defaultPosts);

    const fetch = async (vehicleInfoID: string) => {
        try {
            const returnData: IData = await API.post('base_endpoint', '/forum/get', { body: { thread_id: vehicleInfoID } });

            console.log(returnData);

            const posts: any = { 'posts': returnData.posts };

            setMemberData(returnData.owner.member_attributes);
            setVehicleData(returnData.vehicle);
            setPostData(posts);
        } catch (e) {
            console.log(e);
        }
    };

    useEffect(() => {
        // Setting ID
        setVehicleID(id);

        // Grabbing vehicle information
        fetch(vehicleID);
    }, [vehicleID]);

    return (
        <section className={classes.body}>
            <section id="menu" className={classes.menu}>
                <NavBarComponent />
            </section>

            <section className={classes.mainContentGap}>
                <PostInfoComponent owner={memberData} vehicle={vehicleData} />
            </section>

            <section className={classes.mainContentGap}>
                <Divider variant="middle" />
            </section>

            <section className={classes.mainContentGap}>
                <ForumComponent posts={postData} />
            </section>

            <section className={classes.mainContentGap}>
                <FooterComponent />
            </section>
        </section>
    );
};

export default PostPage;
