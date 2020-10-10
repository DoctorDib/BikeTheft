export const GetDateTime = ():string => {
    const currentdate = new Date();
    const date = `${currentdate.getFullYear()}/${currentdate.getMonth()}/${currentdate.getDate()}`;
    const time = `${currentdate.getHours()}:${currentdate.getMinutes()}:${currentdate.getSeconds()}`;
    return `${date} ${time}`;
};

export const SQLStringProtection = (message:string):string => message.replace(/[\t\r\n]|(--[^\r\n]*)|(\/\*[\w\W]*?(?=\*)\*\/)/gi, '');

export const CheckSQLInObject = (object:any) => {
    const newObject = object;
    Object.keys(newObject).forEach((value) => {
        const objectVal = newObject[value];

        if (typeof objectVal !== 'string') { return; }

        newObject[value] = SQLStringProtection(objectVal);
    });

    return newObject;
};

// fArrObj = Array of Object Features
export const SortFeaturesArray = (fArrObj:Array<any>):Array<string> => fArrObj.map((object:any) => object.value);
