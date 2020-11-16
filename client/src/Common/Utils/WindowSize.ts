// AUTHOR: https://dev.to/3sanket3/usewindowsize-react-hook-to-handle-responsiveness-in-javascript-3dcl

import { useState, useEffect } from 'react';

// 👇
// a Util function that will conver the absolute width into breakpoints
const getBreakPoint = (windowWidth:number):string => {
    if (windowWidth) {
        if (windowWidth < 480) { return 'sm'; }
        if (windowWidth < 1024) { return 'md'; }
        if (windowWidth < 1200) { return 'lg'; }
        if (windowWidth < 1700) { return 'xlg'; }
        return 'xxlg';
    }

    return '';
};
// ☝️

const useWindowSize = () => {
    const isWindowClient = typeof window === 'object';

    const [windowSize, setWindowSize] = useState(
        isWindowClient
            ? getBreakPoint(window.innerWidth) // 👈
            : undefined,
    );

    useEffect(():void | undefined => {
    // a handler which will be called on change of the screen resize
        const setSize = ():void => {
            setWindowSize(getBreakPoint(window.innerWidth)); // 👈
        };

        const removeEvent = ():void => {
            window.removeEventListener('resize', setSize);
        };

        const addEvent = ():void => {
            window.addEventListener('resize', setSize);
        };

        if (isWindowClient) {
            // register the window resize listener
            addEvent();

            // unregister the listerner on destroy of the hook
            return removeEvent();
        }
        return undefined;
    }, [isWindowClient, setWindowSize]);

    return windowSize;
};

export default useWindowSize;
