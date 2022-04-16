(async () => {
    let fs = require("fs")
    const { DirectSecp256k1HdWallet, Registry ,decodeTxRaw} =await import( "@cosmjs/proto-signing");
    const { assertIsBroadcastTxSuccess, SigningStargateClient, StargateClient, defaultRegistryTypes } =await import( "@cosmjs/stargate");
    let mnemonic=fs.readFileSync("mnemonic.txt","utf-8")
    const wallet = await DirectSecp256k1HdWallet.fromMnemonic(mnemonic,{prefix:"chihuahua"});
    const [firstAccount] = await wallet.getAccounts();
    const registry = new Registry(defaultRegistryTypes)
    const rpcEndpoint = "https://rpc.chihuahua.wtf/";
    const client = await SigningStargateClient.connectWithSigner(rpcEndpoint, wallet,{registry:registry});

    
   
    let chainify = new Chainify(async (data) => {
        let sent=await client.sendTokens(firstAccount.address, "chihuahua1xm2pj03uglrzpcsypuzrl7hrlumzdy7gsthyjh", [{
            denom: "uhuahua",
            amount: "200000",
          }],{ amount: [ { denom: "uhuahua", amount: "45000", }, ], gas: "1800000", },data);
          return sent.transactionHash
    }, async (id) => {
        
        // console.log(Buffer.from().toString())
        return decodeTxRaw((await client.getTx(id)).tx).body.memo
    }, 255, 64)
    // chainify.upload(fs.readFileSync("./test.txt")).then(data => console.log(data.toString()))
    console.log((await chainify.download("74A5BECF6C2806A426871FD3ACE7593E164CBAE6AFB6C0FCCD53FF10AC0AC6B4")).toString())
})();
let Chainify = require("./index")

// console.log(fetch)