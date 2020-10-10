export const GetDateTime = ():string => {
    const currentdate = new Date();
    const date = `${currentdate.getFullYear()}/${currentdate.getMonth()}/${currentdate.getDate()}`;
    const time = `${currentdate.getHours()}:${currentdate.getMinutes()}:${currentdate.getSeconds()}`;
    return `${date} ${time}`;
};

export const SQLStringProtection = (message:string):string => message.replace(/[\t\r\n]|(--[^\r\n]*)|(\/\*[\w\W]*?(?=\*)\*\/)/gi, '');

export const CheckSQLInObject = (object:any) => {
    const cleanObject = object;
    Object.keys(cleanObject).forEach((value) => {
        const objectVal = cleanObject[value];

        if (typeof objectVal !== 'string') { return; }

        cleanObject[value] = SQLStringProtection(objectVal);
    });

    return cleanObject;
};

// fArrObj = Array of Object Features
export const SortFeaturesArray = (fArrObj:Array<any>):Array<string> => fArrObj.map((object:any) => object.value);
