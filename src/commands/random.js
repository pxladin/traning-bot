const storage = require('../global/storage');

module.exports = (client, message) => {
  const traninge = Object.values(storage.values);
  const randomTraning = traninge[Math.floor(traninge.length * Math.random())];

  message.channel.send(randomTraning.toString());
};
