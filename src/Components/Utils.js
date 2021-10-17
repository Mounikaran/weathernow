const getCelius = (kelvin) => {
    return Number(kelvin-273.15).toFixed(1)
}

const getDirection = (angle) => {
    var directions = ["North", "North-East", "East", "South-East", "South", "South-West", "West", "North-West"]
    var index = Math.round(((angle %= 360) < 0 ? angle + 360 : angle) / 45) % 8;

    return directions[index]
}

const getDateTime = (dt, type=null) => {
    // let dt = 1549312452
    // Create a new JavaScript Date object based on the timestamp
    // multiplied by 1000 so that the argument is in milliseconds, not seconds.
    var date = new Date(dt * 1000);
    // Hours part from the timestamp
    var hours = date.getHours();
    var AmOrPm = hours >= 12 ? 'pm' : 'am';
    hours = (hours % 12) || 12
    // Minutes part from the timestamp
    var minutes = "0" + date.getMinutes();
    // Seconds part from the timestamp
    var seconds = "0" + date.getSeconds();

    // Will display time in 10:30:23 format
    var formattedTime = hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2) + " " + AmOrPm;

    if (type === "full_date")
        return date.toDateString() + " " + date.toTimeString()
    if (type === "date")
        return date.toDateString()
    else
        return formattedTime;
}

export { getCelius, getDirection, getDateTime};