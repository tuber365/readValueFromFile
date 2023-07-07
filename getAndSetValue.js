const fs = require('node:fs/promises')
const util = require('node:util');
var assert = require('assert');

//following are 2 values for your test cases
let testCase1 = '123';
let testCase2 = '1234';

//write function
async function SetFileValue(fileValToWrt){
	await fs.writeFile('test.txt', fileValToWrt, { encoding: 'utf8' }, (err) =>
		{
			if (err) throw err;
		}
	);
}

//wait function
function waitForFileToBeRfrs(ms){
    var start = new Date().getTime();
    var end = start;
    while(end < start + ms) {
      end = new Date().getTime();
   }
 }

//set 123 as deafult value for the local test.txt file
SetFileValue('123');
//wait statement added for file to be updated in the file system
waitForFileToBeRfrs(2000);

let file1Value;
let promise1='';

function GetFileValue(filePath){
    try{
        promise1 = new Promise(async (resolve, reject) => {
            resolve(""+await fs.readFile(filePath, {encoding: 'utf8'})+"");
        });
    }catch(e){
        console.log(e);
    }
}

//getting current test value from test.txt file
GetFileValue('test.txt');

promise1.then((value) => {
    file1Value = value;
    //This would be your first test value for assert
    console.log("valueForTest1Run: "+file1Value);
    assert.equal(file1Value, testCase1); 
}).then(() => {
    //cleaning promise value
});

//for testing purpose chaning the test.txt file value
SetFileValue('1234');
//wait statement added for file to be updated in the file system 
waitForFileToBeRfrs(2000);

//getting new value from test file
GetFileValue('test.txt');

promise1.then((value) => {
    file1Value = value;
    //This would be your seconed test value for assert
    console.log("valueForTest2Run: "+file1Value);
    assert.equal(file1Value, testCase2); 
});




