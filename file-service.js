const http = require('https');
const fs = require('fs');

async function download(url, downloaded_file_name, callback) {
  const file = fs.createWriteStream(downloaded_file_name);
  const request = http.get(url, function(response) {
    response.pipe(file);
    // after download completed close filestream
    file.on("finish", async () => {
        file.close();
        console.log("Download Completed");
        await callback(downloaded_file_name)
    });
  });
}

module.exports = {
    download
}