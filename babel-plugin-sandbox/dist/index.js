'use strict';

var fileName = '/Volumes/MEDIA/WEBSITES/frontcamp/fcamp_2' + '/folder/file.txt';

var fileData = fs.readFileSync('/Volumes/MEDIA/WEBSITES/frontcamp/fcamp_2' + '/folder/file.txt', { encoding: 'utf8' });

var CONFIG = {
    appExe: '/Volumes/MEDIA/WEBSITES/frontcamp/fcamp_2' + 'coolApp/app.exe'
};

getAppExec('/Volumes/MEDIA/WEBSITES/frontcamp/fcamp_2');

function getAppExec(appData) {
    return appData + 'filename.exe';
}
//# sourceMappingURL=index.js.map