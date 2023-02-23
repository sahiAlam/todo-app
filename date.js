// date
const getDate = () => {
    const today = new Date();
    var options = {
        weekday: "long",
        month: "long",
        day: "numeric",
    };
    const day = today.toLocaleDateString("en-US", options);
    
    return day;
};


module.exports = getDate;