'use strict';

const records = [];

function add(person) {
    records.push(person);
}


function all() {
    return records;
}

export { add, all }