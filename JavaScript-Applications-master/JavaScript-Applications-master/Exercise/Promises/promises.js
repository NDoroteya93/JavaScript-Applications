'use strict';

// function asyncFunction() {
//     return new Promise(
//         function(resolve, reject) {
//             resolve(resolve);

//             reject(error);
//         }
//     )
// }

// asyncFunction()
//     .then(result => {})
//     .catch();


// // example
// let promiseRead = readFile('some.txt');

// promiseRead.then(function(contents) {
//     // fullfillment
//     console.log(contents);
// }, function(err) {
//     //rejection
//     console.error(err.message);
// });

// promiseRead.then(function(contents) {
//     // fullfillment
//     console.log(contents);
// });

// promiseRead.then(null, function(err) {
//     // rejection
//     console.error(err.message);
// });

// // original fullfillment handler 
// promiseRead.then(function(contents) {
//     console.log(contents);

//     // now add another 
//     promiseRead.then(function(contents) {
//         console.log(contents);
//     });
// });

// // Node js example

// let fs = require('fs');

// function readFile(filename) {
//     return new Promise(function(resolve, reject) {
//         // trigger the asynchrronous operation

//         fs.readFile(filename, { encoding: 'utf8' }, function(err, contents) {
//             if (err) {
//                 reject(err);
//                 return;
//             }

//             // the read succeeded
//             resolve(contents);
//         });

//     })
// }


// create  unsettled new promise 
let newPromise = new Promise((resolve, reject) => {
    console.log('Promise!');
    resolve();
});


// Promise!
// Hi

//////////////////////////////////////////////////////////////
// then() and catch() 

newPromise.then(() => console.log('Resolved!'));

console.log('Hi');

// Promise
// Hi 
// Resolvedd

//////////////////////////////////////////////////////////////

// Settled promises
// promise.resolve() 

let promiseResolve = Promise.resolve(42);

promiseResolve.then((value) => console.log(value)); // 42

// Non-promises Thenables

let thenable = {
    then: function(resolve, reject) {
        reject(43);
    }
};

let p1 = Promise.resolve(thenable);
// p1.then((value) => console.log(value));
p1.catch((value) => console.log(value + 1));


// Executtor errors

let promiseErr = new Promise((resolve, reject) => {
    throw new Error('Explosion!');
});

promiseErr.catch((error) => console.log(error.message));

// Global Promise Rejection Handling

// Node.js Rejection Handling

let rejected;

// process.on('unhandleRejection', function(reason, promise) {
//     console.log(reason.message);
//     console.log(rejected === promise);
// })

// rejected = Promise.reject(new Error('Explosion! 2'));

process.on('rejectionHandled', function(promise) {
    console.log(rejected === promise);
});

rejected = Promise.reject(new Error('Explosion2!'));

// wait to add the rejection handler 
setTimeout(function() {
    rejected.catch((value) => console.log(value.message))
}, 1000);

/// use Map() to store promises and their rejection reasons
let possiblyUnhandleRejections = new Map();

// when a rejection is unhandleed, add it to the map 
process.on('unhandledRejection', function(reason, promise) {
    possiblyUnhandleRejections.set(promise, reason);
});

process.on('rejectionHandled', function(promise) {
    possiblyUnhandleRejections.delete(promise);
});

setInterval(function() {
    possiblyUnhandleRejections.forEach((reason, promis) => {
        console.log(reason.message ? reason.message : reason);

        // do something to handle these rejection
        handleRejection(promise, reason);
    });

    possiblyUnhandleRejections.clear();
}, 60000)

/////////////////////////////////////
// Browsr Rejection Handling
// let rejected2;

// window.onunhandlerejection = function(event) {
//     console.log(event.type);
//     console.log(event.reason.message);
//     console.log(rejected === event.promise);
// };
// window.onrejectionhandled = function(event) {
//     console.log(event.type);
//     console.log(event.reason.message);
//     console.log(rejected === event.promise);
// }

// rejected2 = Promise.reject(new Error('Explosion!'));

// Chaining promises 
let p2 = new Promise((resolve, reject) => resolve(47));

p2
    .then((value) => console.log(value))
    .then(() => console.log('Finished!'));


// Catching errors

let p3 = new Promise((resolve, reject) => resolve(48));

p3.then((value) => { throw new Error('Boom') })
    .catch((error) => console.log(error.message)); // boom


// returning values in promise chain 

let p4 = new Promise((resolve, reject) => {
    resolve(50);
});

p4.then((value) => {
    console.log(value);
    return value + 1;
}).then((value) => console.log(value));

// return Promises in Promise Chains 
let p5 = new Promise((resolve, reject) => {
    resolve(52);
});

let p6 = new Promise((resolve, reject) => {
    resolve(53);
});

p5.then((value) => {
    console.log(value);
    return p6;
}).then((value) => {
    console.log(value);
});


// promise.all()

let p7 = Promise.all([p1, p2, p3]);

p7.then((value) => {
    console.log('Is Array ' + Array.isArray(value));
});

// Inheriting from Promises 
class MyPromise extends Promise {
    success(resolve, reject) {
        return this.then(resolve, reject);
    }

    failure(reject) {
        return this.catch(reject);
    }
}

let promiseConstructor = new MyPromise((resolve, reject) => {
    resolve(34);
});

promiseConstructor.success((value) => {
    console.log(value);
})