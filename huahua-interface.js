module.exports = async (mnemonic) => {
    let fs = require("fs")
    const {
        DirectSecp256k1HdWallet,
        Registry,
        decodeTxRaw
    } = await import("@cosmjs/proto-signing");
    const {
        SigningStargateClient,
        StargateClient,
        defaultRegistryTypes
    } = await import("@cosmjs/stargate");
    const wallet = await DirectSecp256k1HdWallet.fromMnemonic(mnemonic, {
        prefix: "chihuahua"
    });
    const [firstAccount] = await wallet.getAccounts();
    const registry = new Registry(defaultRegistryTypes)
    const rpcEndpoint = "https://rpc.chihuahua.wtf/";
    const client = await SigningStargateClient.connectWithSigner(rpcEndpoint, wallet, {
        registry: registry
    });
    let Chainify = require("./chainify")


    let chainify = new Chainify(async (data) => {
        let sent = await client.sendTokens(firstAccount.address, "chihuahua1xm2pj03uglrzpcsypuzrl7hrlumzdy7gsthyjh", [{
            denom: "uhuahua",
            amount: "200000",
        }], {
            amount: [{
                denom: "uhuahua",
                amount: "45000",
            }, ],
            gas: "1800000",
        }, data);
        return sent.transactionHash
    }, async (id) => {

        return decodeTxRaw((await client.getTx(id)).tx).body.memo
    }, 255, 64)

    return chainify
}