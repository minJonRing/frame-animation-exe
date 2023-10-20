export const title = "桌面程序程序";
const ip = require("ip");

export const udp = {
  prot: "8080",
  address: ip.address(),
};
export default {
  title,
  udp,
};
