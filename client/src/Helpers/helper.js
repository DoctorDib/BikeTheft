export const GetDateTime = () => {
    const currentdate = new Date();
    const date = `${currentdate.getFullYear()}/${currentdate.getMonth()}/${currentdate.getDate()}`;
    const time = `${currentdate.getHours()}:${currentdate.getMinutes()}:${currentdate.getSeconds()}`;
    return  `${date} ${time}`;
};

export const SQLStringProtection = (message) => {
    return message.replace(/[\t\r\n]|(--[^\r\n]*)|(\/\*[\w\W]*?(?=\*)\*\/)/gi, '');
};