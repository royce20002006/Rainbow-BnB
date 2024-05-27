const { parse } = require("dotenv");

const formatDate = ((date) => {
    const year = String(date.getFullYear());
    const month =String(date.getMonth()).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const seconds = String(date.getSeconds()).padStart(2, "0");
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`
});

let day = new Date("2020-11-15")
console.log(day)
let current = new Date();
console.log(current);
if (day < current) {
    console.log('works')
}
module.exports = formatDate;