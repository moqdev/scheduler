// establishes a connection with the game server
const net = require('net');

const connect = function () {
  const conn = net.createConnection({
    host: "135.23.222.131",
    port: 50542,
  });

  // interpret incoming data as text
  //
  conn.setEncoding("utf8");

  return conn;
};



console.log("Connecting ...");
connect();