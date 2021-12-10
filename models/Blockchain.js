const { sha256 } = require('js-sha256');

class Blockchain {
  constructor() {
    this.chain = [];

    this.createBlock(1, "0");
  }

  createBlock(proof, prevHash) {
    const newBlock = {
      index: this.chain.length + 1,
      timestamp: Date.now().toString(),
      proof,
      prevHash,
    };

    this.chain.push(newBlock);

    return newBlock;
  }

  getLastBlock() {
    const lastBlock = this.chain[this.chain.length - 1];

    return { ...lastBlock };
  }

  proofOfWork(prevProof) {
    let newProof = 1;
    let checkProof = false;

    while (!checkProof) {
      const hash = sha256(String(newProof * newProof - prevProof * prevProof));

      if (hash.slice(0, 4) === "0000") {
        checkProof = true;
      }
      else {
        ++newProof;
      }
    }

    return newProof;
  }

  hash(block) {
    const encodedBlock = JSON.stringify(block, Object.keys(block).sort());
    return sha256(encodedBlock);
  }

  isValidChain(chain) {
    let prevBlock = chain[0];

    for (let i = 1; i < chain.length; ++i) {
      const currentBlock = chain[i];
      const { prevHash, proof: currentBlockProof } = currentBlock;

      if (prevHash !== this.hash(prevBlock)) {
        return false;
      }

      const { proof: prevProof } = prevHash;
      const hash = sha256(string(currentBlockProof * currentBlockProof - prevProof * prevProof));

      if (hash.slice(0, 4) !== "0000") {
        return false;
      }

      prevBlock = currentBlock;
    }

    return true;
  }

}

module.exports = Blockchain;
