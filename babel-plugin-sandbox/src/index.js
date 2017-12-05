/* Test examples of env variables use in different cases */

const fileName = process.env.PWD + '/folder/file.txt';

const fileData = fs.readFileSync(process.env.PWD + '/folder/file.txt',{encoding:'utf8'});

const CONFIG = {
    appExe: process.env.PWD + 'coolApp/app.exe'
};

getAppExec(process.env.PWD);

function getAppExec(appData) {
    return appData + 'filename.exe';
}
