const OTPS = require("../models/OTP");
const Product = require("../models/Product");
const Schedule = require("node-schedule");
function Clear() {
  setTimeout(async () => {
    console.log(Date());
    const otps = await OTPS.find({
      time: {
        $lt: (Date.now() - 1000 * 60 * 5).toString(),
      },
    });
    for (let i = 0; i < otps.length; i++) otps[i].remove();
  }, 1000 * 5 * 60 + 10000);
  //   setTimeout(() => {}, 1000 * 60 * 5);
}

module.exports = { Clear };
