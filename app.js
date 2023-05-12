require("dotenv").config()
const { check_bucket_exists, uploadFile } = require('./bucket-service')
const { download } = require('./file-service')
const { transcribe } = require('./speech-to-text-service')

async function main(url) {
    const { LOCAL_FILE_NAME } = process.env; 
    await check_bucket_exists()
    await download(url, LOCAL_FILE_NAME, uploadFile)
    const transcripted = await transcribe(LOCAL_FILE_NAME)
    console.log(`Transcription: ${transcripted}`)
}

main('https://tempstorage.download/instances/3BCBDABFF98AC04DE9035EDD7027E120/3AF1E0B3CC1701788565.ogg')
.then()
.catch()