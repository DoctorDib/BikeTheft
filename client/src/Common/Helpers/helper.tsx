export function getDateTimeString(): string {
    const currentdate = new Date();
    const date = `${currentdate.getFullYear()}/${currentdate.getMonth()}/${currentdate.getDate()}`;
    const time = `${currentdate.getHours()}:${currentdate.getMinutes()}:${currentdate.getSeconds()}`;
    return `${date} ${time}`;
}

export const SQLStringProtection = (message: string): string => message.replace(/[\t\r\n]|(--[^\r\n]*)|(\/\*[\w\W]*?(?=\*)\*\/)/gi, '');

export function checkSQLInObject(object: any): Record<string, unknown> {
    const newObject = object;
    Object.keys(newObject).forEach((value) => {
        const objectVal = newObject[value];

        if (typeof objectVal !== 'string') {
            return;
        }

        newObject[value] = SQLStringProtection(objectVal);
    });

    return newObject;
}

// fArrObj = Array of Object Features
export function sortFeaturesArray(fArrObj: Array<any>): Array<any> {
    return fArrObj.map((object: any) => object.value);
}
