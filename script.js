const getParams = window.location.search;
const urlParams = new URLSearchParams(getParams);

let reqID = null;
let userID = null;

if (urlParams.has('id')) {
    reqID = urlParams.get('id');
}

if (urlParams.has('user')) {
    userID = urlParams.get('user');
}

console.log('id:', reqID+';', 'user:', userID);

//TODO: get data for reqID from json, disable all fields (change styling), fill all the fields with data
//TODO: if userID is owner, anable all the fields (change styling)

const apiURL = "http://localhost:3000/"

