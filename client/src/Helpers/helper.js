export const GetDateTime = () => {
    const currentdate = new Date();
    return `${currentdate.getFullYear()}/${currentdate.getMonth()}/${currentdate.getDate()} ${currentdate.getHours()}:${currentdate.getMinutes()}:${currentdate.getSeconds()}`;
}

export const SQLStringProtection = (message) => {
    return message.replace(/[\t\r\n]|(--[^\r\n]*)|(\/\*[\w\W]*?(?=\*)\*\/)/gi, '');
}