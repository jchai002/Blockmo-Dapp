var server = require("pushstate-server");

server.start({
  port: 4200,
  directory: "./build_webpack"
});
