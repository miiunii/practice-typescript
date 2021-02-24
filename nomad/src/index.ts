
// 인터페이스
// interface Human {
//     name: string;
//     age: number;
//     gender: string;
// }

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

import * as CryptoJS from "crypto-js";

class Block {
    public index: number;
    public hash: string;
    public previousHash: string;
    public data: string;
    public timeStamp: number;

    // class 생성전에도 쓰기 가능
    static caculateBlockHash = (index: number, previousHash: string, timestamp:number, data:string):string => CryptoJS.SHA256(index + previousHash + timestamp + data).toString();

    static validateStructure = (aBlock: Block): boolean =>
        typeof aBlock.index === "number" &&
        typeof aBlock.hash === "string" &&
        typeof aBlock.hash === "string" &&
        typeof aBlock.previousHash === "string" &&
        typeof aBlock.timeStamp === "number" &&
        typeof aBlock.data === "string";

    constructor(index: number, hash: string, previousHash: string, data: string, timeStamp: number) {
        this.index = index;
        this.hash = hash;
        this.previousHash = hash;
        this.data = data;
        this.timeStamp = timeStamp;
    }
}

const genesisBlock: Block = new Block(0, "204102399423", "", "I love Hamzzi", 123456);

let blockchain: Block[] = [genesisBlock];

const getBlockchain = (): Block[] => blockchain;

const getLatestBlock = (): Block => blockchain[blockchain.length - 1];

const getNewTimestamp = (): number => Math.round(new Date().getTime() / 1000);

const createNewBlock = (data:string): Block => {
    const previousBlock: Block = getLatestBlock();
    const newIndex: number = previousBlock.index + 1;
    const newTimestamp: number = getNewTimestamp();
    const newHash: string = Block.caculateBlockHash(newIndex, previousBlock.hash, newTimestamp, data);

const newBlock: Block = new Block(newIndex, newHash, previousBlock.hash, data, newTimestamp);
addBlock(newBlock);
return newBlock;

};

const getHashforBlock = (aBlock: Block): string => Block.caculateBlockHash(aBlock.index, aBlock.previousHash, aBlock.timeStamp, aBlock.data);

const isBlockedValid = (candidateBlock: Block, previousBlock: Block): boolean => {
    if(!Block.validateStructure(candidateBlock)) {
        return false;
    }
    else if(previousBlock.index + 1 !== candidateBlock.index) {
        return false;
    }
    else if(previousBlock.hash !== candidateBlock.previousHash) {
        return false;
    }
    else if(getHashforBlock(candidateBlock) !== candidateBlock.hash) {
        return false;
    }
    else {
        return true;
    }
};

const addBlock = (candidateBlock: Block): void => {
    if(isBlockedValid(candidateBlock, getLatestBlock())) {
        blockchain.push(candidateBlock);
    }
}

createNewBlock("second block");
createNewBlock("third block");
createNewBlock("fourth block");

console.log(blockchain);

export {};