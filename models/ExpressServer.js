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
    this.app.get('/mine-block', (req, res) => {
      const lastBlock = this.blockchain.getLastBlock();
      const { proof: lastBlockProof } = lastBlock;
      const proof = this.blockchain.proofOfWork(lastBlockProof);
      const prevHash = this.blockchain.hash(lastBlock);
      const block = this.blockchain.createBlock(proof, prevHash);

      return res.json(block);
    });

    this.app.get('/get-chain', (req, res) => {
      const response = { 
        chain: this.blockchain.chain,
        length: this.blockchain.chain.length 
      };

      return res.json(response);
    });
  }

  listen() {
    this.middlewares();

    this.server.listen(this.port, () => {
      console.log(`Listening on port: ${this.port}`);
    });
  }
}

module.exports = ExpressServer;
