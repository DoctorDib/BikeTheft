export const GetDateTime = ():string => {
    const currentdate = new Date();
    const date = `${currentdate.getFullYear()}/${currentdate.getMonth()}/${currentdate.getDate()}`;
    const time = `${currentdate.getHours()}:${currentdate.getMinutes()}:${currentdate.getSeconds()}`;
    return `${date} ${time}`;
};

export const SQLStringProtection = (message:string):string => message.replace(/[\t\r\n]|(--[^\r\n]*)|(\/\*[\w\W]*?(?=\*)\*\/)/gi, '');

export const CheckSQLInObject = (object):object => {
    Object.keys(object).forEach(value => {
        let objectVal = object[value];

        if (typeof objectVal !== "string") { return; }

        object[value] = SQLStringProtection(objectVal);
    });

    return object;
};

export const SortFeaturesArray = (featuresArrayObject) => featuresArrayObject.map(object => object.value);
