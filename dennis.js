const https = require('https');

async function eventIntent() {
    
    var options = `https://waterservices.usgs.gov/nwis/iv/?format=json&indent=on&sites=01447780&parameterCd=00062`;
    //console.log('options: ' + options);

    const myResult = await httpGet(options); 
    console.log('-----------------------------------------------------------------------------------------------------------------');	
    console.log("    sent: " + options);
    console.log("received: " + '\n' + myResult);
    console.log('-----------------------------------------------------------------------------------------------------------------');
}  

eventIntent();

async function httpGet(options) {
    // return new pending promise
    //console.log(`~~~~~~~~~ httpGet ~~~~~~~~~`);
    //console.log(`~~~${JSON.stringify(options)}~~~`);
  
    return new Promise((resolve, reject) => {    
  
    const request = https.request(options, (response) => {
        // handle http errors
        if (response < 200 || response > 299) {
          reject(new Error('Failed to load page, status code: ' + response));
        }// temporary data holder
        const datHold = [];
        // on every content chunk, push it to the data array
        response.on('data', (chunk) => datHold.push(chunk));
        // we are done, resolve promise with those joined chunks
        response.on('end', () => resolve(datHold.join('')));
        //console.log('Got the data from httpGet');
      });
      // handle connection errors of the request
      request.on('error', (err) => reject(err));    
      request.end(); 
    });
  }