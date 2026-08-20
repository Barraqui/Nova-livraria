import * as readlinePromises from "node:readline/promises";

const rl = readlinePromises.createInterface({
    input: process.stdin,
    output: process.stdout,
});

const nome = await rl.question("Qual é o seu nome?\n");
console.log(`Olá, ${nome}`);

rl.close()