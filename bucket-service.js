const { Storage } = require('@google-cloud/storage');

const storage = new Storage();

const { BUCKET_NAME, LOCAL_FILE_NAME } = process.env;

// Checking for Storage Existing Bucket
async function check_bucket_exists() {
  const [buckets] = await storage.getBuckets();
  if (!buckets.find(b => b.name === BUCKET_NAME)) {
    console.log(BUCKET_NAME, 'does not exists, lets create!')
    await createBucket()
  }
}

// Creating bucket
async function createBucket() {
  // Creates the new bucket
  await storage.createBucket(BUCKET_NAME);
  console.log(`Bucket ${BUCKET_NAME} created.`);
}

async function uploadFile(
  filePath = './' + LOCAL_FILE_NAME,
  destFileName = LOCAL_FILE_NAME,
) {
  try {
    await storage.bucket(BUCKET_NAME).upload(filePath, {
        destination: destFileName
      });
    console.log(`${filePath} uploaded to ${BUCKET_NAME}`);
  } catch (error) {
    console.log(error)
  }
}


module.exports = {
  check_bucket_exists,
  createBucket,
  uploadFile
}