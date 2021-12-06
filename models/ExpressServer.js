const express = require('express');
const HttpServer = require('http');
const Blockchain = require('./Blockchain');

class ExpressServer {
  constructor() {
    this.app = express();
    this.port = 8080;
    this.server = HttpServer.createServer(this.app);
    this.blockchain = new Blockchain();
  }

  middlewares() {

  }

  listen() {
    this.middlewares();

    this.server.listen(this.port, () => {
      console.log(`Listening on port: ${this.port}`);
    });
  }
}

module.exports = ExpressServer;
