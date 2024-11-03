const fs = require("fs");
const request = require("request-promise");
//load cert
const ca = fs.readFileSync("./brd.crt");

//Bright Data Access
const brd_user = "hl_b7406754";
const brd_zone = "otter";
const brd_passwd = "xy4lpme0n1yh";
const brd_superpoxy = "brd.superproxy.io:33335";
const brd_connectStr =
  "brd-customer-" +
  brd_user +
  "-zone-" +
  brd_zone +
  ":" +
  brd_passwd +
  "@" +
  brd_superpoxy;

//Switch between brd_test_url to get a json instead of txt response:
const brd_test_url = "https://geo.brdtest.com/mygeo.json";

//const brd_test_url = "https://geo.brdtest.com/welcome.txt";
//const brd_test_url = "https://remotive.com/api/remote-jobs";

(async () => {
  const response = await request({
    url: brd_test_url,
    proxy: "http://" + brd_connectStr,
    //add cert in the request options
    ca: ca,
  });
  console.log(response);
})();
