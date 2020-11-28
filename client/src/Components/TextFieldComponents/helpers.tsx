import { IToolTipMessage } from '../../Common/Interfaces/interfaces';

const toolTipMessages: IToolTipMessage = {
    primaryColour: 'The main Colour of your vehicle',
    secondaryColour: 'The second main colour of your vehicle',
    features:
        'Write down identifiable features of your vehicle, seperate using commans: e.g "single black door, red wheels"',
    description: 'Write a short description of your vehicle, more information the better.',
};

export const getToolTip = (key: string): string | boolean => {
    if (!Object.prototype.hasOwnProperty.call(toolTipMessages, key)) {
        return false;
    }

    return toolTipMessages[key];
};

export const formatID = (value:string):string => {
    const splitLabel = value.split(' ');
    return `${splitLabel[0].toLowerCase()}${splitLabel.slice(1).join('')}`;
};
