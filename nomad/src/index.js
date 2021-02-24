"use strict";
// 인터페이스
// interface Human {
//     name: string;
//     age: number;
//     gender: string;
// }
exports.__esModule = true;
// const person = {
//     name: "corgi",
//     gender: "male",
//     age: 28
// };
// 클래스
// class Human {
//     public name: string;
//     public gender: string;
//     public age: number;
//     constructor(name: string, gender: string, age: number) {
//         this.name = name;
//         this.gender = gender;
//         this.age = age;
//     }
// };
// const lynn = new Human("corgi", "male", 28);
// const sayHi = (data: Human): string => {
//     return `Hello ${data.name}, you are ${data.age}, you are a ${data.gender}!!`;
// };
// sayHi(lynn);
var CryptoJS = require("crypto-js");
var Block = /** @class */ (function () {
    function Block(index, hash, previousHash, data, timeStamp) {
        this.index = index;
        this.hash = hash;
        this.previousHash = hash;
        this.data = data;
        this.timeStamp = timeStamp;
    }
    // class 생성전에도 쓰기 가능
    Block.caculateBlockHash = function (index, previousHash, timestamp, data) { return CryptoJS.SHA256(index + previousHash + timestamp + data).toString(); };
    Block.validateStructure = function (aBlock) {
        return typeof aBlock.index === "number" &&
            typeof aBlock.hash === "string" &&
            typeof aBlock.hash === "string" &&
            typeof aBlock.previousHash === "string" &&
            typeof aBlock.timeStamp === "number" &&
            typeof aBlock.data === "string";
    };
    return Block;
}());
var genesisBlock = new Block(0, "204102399423", "", "I love Hamzzi", 123456);
var blockchain = [genesisBlock];
var getBlockchain = function () { return blockchain; };
var getLatestBlock = function () { return blockchain[blockchain.length - 1]; };
var getNewTimestamp = function () { return Math.round(new Date().getTime() / 1000); };
var createNewBlock = function (data) {
    var previousBlock = getLatestBlock();
    var newIndex = previousBlock.index + 1;
    var newTimestamp = getNewTimestamp();
    var newHash = Block.caculateBlockHash(newIndex, previousBlock.hash, newTimestamp, data);
    var newBlock = new Block(newIndex, newHash, previousBlock.hash, data, newTimestamp);
    addBlock(newBlock);
    return newBlock;
};
var getHashforBlock = function (aBlock) { return Block.caculateBlockHash(aBlock.index, aBlock.previousHash, aBlock.timeStamp, aBlock.data); };
var isBlockedValid = function (candidateBlock, previousBlock) {
    if (!Block.validateStructure(candidateBlock)) {
        return false;
    }
    else if (previousBlock.index + 1 !== candidateBlock.index) {
        return false;
    }
    else if (previousBlock.hash !== candidateBlock.previousHash) {
        return false;
    }
    else if (getHashforBlock(candidateBlock) !== candidateBlock.hash) {
        return false;
    }
    else {
        return true;
    }
};
var addBlock = function (candidateBlock) {
    if (isBlockedValid(candidateBlock, getLatestBlock())) {
        blockchain.push(candidateBlock);
    }
};
createNewBlock("second block");
createNewBlock("third block");
createNewBlock("fourth block");
console.log(blockchain);
