const stream = require('stream');
class Chainify {
    constructor(uploadData,downloadData,limit,idMaxSize){
        this.put=uploadData
        this.get=downloadData
        this.limit=limit
        this.idMaxSize=idMaxSize
    }
    async upload(data){
        let prevId="";
        let collectedData=Buffer.from("")
        for (let chunk of data){
            collectedData=Buffer.concat([collectedData,Buffer.from([chunk])])
            if((collectedData.toString("hex")+";"+prevId.toString("hex")).length>=this.limit-4){
            let dId=await this.put((collectedData.toString("hex")+";"+prevId.toString("hex")))
            collectedData=Buffer.from("")
            prevId=dId
            }
        }

        return await this.put((collectedData.toString("hex")+";"+prevId.toString("hex")))

    } 
    async download(id){
        let buff=Buffer.from("")
        let prevId=id
        while(prevId!=""){
        
            let [data,nextId]=((await this.get(prevId)).split(";"))
            prevId=nextId
            buff= Buffer.concat([Buffer.from(data,"hex"),buff])
           
        }
        return buff
    }
}
module.exports=Chainify