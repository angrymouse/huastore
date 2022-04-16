# Huastore
## Motivation and how it works
This library is thing that will allow you to upload large files to chihuhua chain (but not so large as cinema or etc, maximim recommended limit is 10 mb).
It uses transfers with storing data in MEMO as data storage.
Normal MEMO allows just 255 chars, and when you want to upload large chunks of data, this library cuts your data into 255 chunks (191, 64 reserved for next chunk tx id).
## Usage from JS (node)

### Initializing client
 To use huastore you should import and initialize it:
```js
let huastore=require("huastore")
let huaclient=await huastore("my memo from wallet with some huahua")
```
 Now you can use huaclient to download and upload transactions to huahua!

### Uploading
```js
let data=Buffer.from(`Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`)// We can upload ONLY Buffers, not strings, so we need to convert our string into Buffer.
let uploadedTxId=await huaclient.upload(data)// We can upload large texts!!
console.log(uploadedTxId)// We'll use it for next example, let's print it to console!
```
Now look into console, you should see tx id of final transaction, use it in next example!

### Downloading
```js
let data=await huaclient.download("21D26E0B4221E970C31EDA27EFAB51D5D4055B8B1287D4D0124542E39FFAEC41")// Insert your tx id from previous step here
let text=data.toString()// By default, download returns Buffer, we need to convert it to string to read it
console.log(text)// Lorem ipsum dolor sit amet, consectetur....
```
Easy, right?

### Donate

You can donate some huahua to my HUAHUA address: ``chihuahua1xm2pj03uglrzpcsypuzrl7hrlumzdy7gsthyjh``