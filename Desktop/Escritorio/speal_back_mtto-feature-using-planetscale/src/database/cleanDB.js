const fs = require('fs')
const files = ['./db/database.db','./db/database.db-shm','./db/database.db-wal']
function deleteFiles(){
    files.forEach(fileURL =>{
        try {
            fs.unlinkSync(fileURL)
            // fs.unlinkSync(new URL(fileURL))
        } catch(err) {
            console.error(err)
        }
    })
}

deleteFiles();
