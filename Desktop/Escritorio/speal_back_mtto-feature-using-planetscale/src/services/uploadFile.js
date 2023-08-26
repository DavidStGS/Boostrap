const AWS = require('aws-sdk');
const { BUCKET, IDAWS, KEYAWS } = require("../config/config");

class UploadController {

  constructor(){}
    
  createFile(fileName, base64) {

    const mime = base64.match(/[^:]\w+\/[\w-+\d.]+(?=;|,)/)[0];
    const ext = base64.match(/[^:/]\w+(?=;|,)/)[0];

    AWS.config.update({ accessKeyId: IDAWS, secretAccessKey: KEYAWS });
    const s3 = new AWS.S3();
    return new Promise((response, reject) => {
      // eslint-disable-next-line no-undef
      const buf = new Buffer.from(
        base64.match( /,(.*)$/ )[ 1 ],
        'base64'
      );
      const data = {
        Bucket: `${BUCKET}`,
        Key: `${fileName}.${ext}`,
        Body: buf,
        ACL: 'public-read',
        ContentEncoding: 'base64',
        ContentType: mime,
      };
      s3.putObject(data, (err) => {
        if (err) {
          console.log('ERR - ', err);
          reject(false);
        } else response(true);
      });
    });
  }

  deleteFile(urlFile) {
    console.log('deleteFile');
    const realName = urlFile ? urlFile.split('com/') : null;
    if (realName) {
      return new Promise((response, reject) => {
        AWS.config.update({ accessKeyId: IDAWS, secretAccessKey: KEYAWS });
        const s3 = new AWS.S3();
        const data = { Bucket: `${BUCKET}`, Key: realName[1] };
        s3.deleteObject(data, (err) => {
          if (err) reject(false);
          response(true);
        });
      });
    }
    return true;
  }
}

const UploadService = new UploadController();
module.exports = UploadService;

// mtto/companies/
// mtto/equipments/
// mtto/models/
// mtto/users/