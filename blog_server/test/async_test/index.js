const path = require("path");
const fs = require("fs");

/**
 * 异步1 callback
 */

// const getFileByCallback = (fileName, cb) => {
//   const filePath = path.resolve(__dirname, 'files', fileName);
//   fs.readFile(filePath, (err, data) => {
//     if (err) {
//       return console.error(err);
//     }
//     cb(JSON.parse(data.toString()));
//   })
// }

// getFileByCallback('a.json', (aData) => {
//   console.log('aData', aData);
//   getFileByCallback(aData.next, bData => {
//     console.log('bData', bData);
//     getFileByCallback(bData.next, (cData) => {
//       console.log('cData', cData);
//     })
//   })
// })

// aData { text: 'first', next: 'b.json' }
// bData { text: 'second', next: 'c.json' }
// cData { text: 'third', next: 'd.json' }

/**
 * 异步2 Promise 
 */

const getFileByPromise = (fileName) => {
  return new Promise((resolve, reject) => {
  const filePath = path.resolve(__dirname, 'files', fileName);
  fs.readFile(filePath, (err, data) => {
    if (err) {
      return reject(err);
    }
    resolve(JSON.parse(data.toString()));
  })
  })
}

// getFileByPromise('a.json').then((aData) => {
//   console.log('aData', aData);
//   return getFileByPromise(aData.next);
// }).then((bData) => {
//   console.log('bData', bData);
//   return getFileByPromise(bData.next);
// }).then((cData) => {
//   console.log('cData', cData);
// })

/**
 * 异步2 async await
 */

 async function getFileByAsync() {
   const aData = await getFileByPromise('a.json');
   const bData = await getFileByPromise(aData.next);
   const cData = await getFileByPromise(bData.next);
   console.log(aData.next, bData.next, cData.next);
 }

 getFileByAsync.call(null);