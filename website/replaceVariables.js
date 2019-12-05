const { exec } = require('child_process');
require('dotenv').config();

const siteVariables = {
    wmVersionNumber: process.env.WM_VERSION_NUMBER
};

console.log('Variable replacement started');

/**
 * The exec function will run after the build directory is generated and it looks for notation #{<variable name>}#
 * in all the subdirectories and files and replaces the respective variable using the siteVariables object
 */
exec("cd ./build/learn && find . -type f -name '*.*' -print0 | xargs -0 sed -i '' -e 's/#{wmVersionNumber}#/"+siteVariables['wmVersionNumber']+"/g'", (err, stdout, stderr) => {
    if (err) return;
    console.log(`stdout: ${stdout}`);
    console.log(`stderr: ${stderr}`);
    console.log('Variable replacement of wmVersionNumber to '+ siteVariables['wmVersionNumber'] +' completed');
});
