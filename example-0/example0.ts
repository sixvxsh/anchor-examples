// // Part1
console.log(pg.wallet.publicKey.toString(), "saying hello:");
//1. Fetch the latest blockhash
let latestBlockhash = await pg.connection.getLatestBlockhash('finalized');

//2. Call say_hello and send the transaction to the network
const tx = await pg.program.methods
  .sayHello()
  .rpc();

//3. Confirm the transaction and log the tx URL
await pg.connection.confirmTransaction({
  signature: tx,         
  blockhash: latestBlockhash.blockhash,
  lastValidBlockHeight: latestBlockhash.lastValidBlockHeight
});
console.log('Transaction Complete: ',`https://explorer.solana.com/tx/${tx}?cluster=devnet`);





// Part 2-1
// 1 - Generate a new Keypair for the counter Account
const counter = anchor.web3.Keypair.generate();
console.log('creating counter: ', counter.publicKey.toString());

// 2 - Fetch latest blockhash
let latestBlockhash = await pg.connection.getLatestBlockhash('finalized');

// 3 - Call initialize_counter and send the transaction to the network
const tx = await pg.program.methods
  .initializeCounter()
  // 3a - Pass the counter public key into our accounts context
  .accounts({counter: counter.publicKey})
  // 3b - Append the counter keypair's signature to transfer authority to our program
  .signers([counter])
  .rpc();

// 4 - Confirm the transaction
await pg.connection.confirmTransaction({
  signature: tx,         
  blockhash: latestBlockhash.blockhash,
  lastValidBlockHeight: latestBlockhash.lastValidBlockHeight
});
console.log(`https://explorer.solana.com/tx/${tx}?cluster=devnet`); 




// Part 2-2
// const COUNTER = 'ECDVkBiVD6UNL9JrqwU2BCkiWRxJnUCncW934YZ17Fq3'; //Replace with your counter public key
console.log(pg.wallet.publicKey.toString(), "saying hello:");

//1. Fetch latest blockhash
let latestBlockhash = await pg.connection.getLatestBlockhash('finalized');

//2. Call say_hello and send the transaction to the network
const counter = new anchor.web3.PublicKey('ECDVkBiVD6UNL9JrqwU2BCkiWRxJnUCncW934YZ17Fq3');
 const tx = await pg.program.methods
  .sayHello()
  .accounts({counter: counter})
  .rpc();

//3. Confirm the transaction and log the tx URL
await pg.connection.confirmTransaction({
  signature: tx,         
  blockhash: latestBlockhash.blockhash,
  lastValidBlockHeight: latestBlockhash.lastValidBlockHeight
}); 
console.log(`https://explorer.solana.com/tx/${tx}?cluster=devnet`);  

//4. Query the chain for our data account and log its value
const data = await pg.program.account.counter.fetch(counter);
console.log('greeted', data.count.toNumber(),' times');
