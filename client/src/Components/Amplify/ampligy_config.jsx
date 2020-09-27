import Amplify, { API } from 'aws-amplify';
import * as constants from '../../../../secrets/constants';

Amplify.configure({
    // OPTIONAL - if your API requires authentication 
    Auth: {
        // REQUIRED - Amazon Cognito Identity Pool ID
        identityPoolId: constants.IDENTITYPOOLID,
        // REQUIRED - Amazon Cognito Region
        region: constants.REGION, 
        // OPTIONAL - Amazon Cognito User Pool ID
        userPoolId: constants.USERPOOLID, 
        // OPTIONAL - Amazon Cognito Web Client ID (26-char alphanumeric string)
        //userPoolWebClientId: 'a1b2c3d4e5f6g7h8i9j0k1l2m3',
    },
    API: {
        endpoints: [
            {
                name: 'MyAPIGatewayAPI',
                endpoint: ''
            },
        ],
    }
});