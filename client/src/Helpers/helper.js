export const GetDateTime = () => {
    const currentdate = new Date();
    return `${currentdate.getFullYear()}/${currentdate.getMonth()}/${currentdate.getDate()} ${currentdate.getHours()}:${currentdate.getMinutes()}:${currentdate.getSeconds()}`;
}