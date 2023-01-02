export const getCurrentTimeStamp = () => {
    let ts = Date.now();

    let date_ob = new Date(ts);
    let date = date_ob.getDate();
    let month = date_ob.getMonth() + 1;
    let year = date_ob.getFullYear();
    let hours = date_ob.getHours();
    let minutes = date_ob.getMinutes();
    return `${year}/${month}/${date} ${hours}:${String(minutes).padStart(2, "0")}`
}