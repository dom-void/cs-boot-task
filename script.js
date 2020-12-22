const getParams = window.location.search;
const urlParams = new URLSearchParams(getParams);

let reqID = null;
let userID = null;
//TODO: reading activeUser from cookies
let activeUser = null;
let isOwner = false;

let currentDate = Date.now();
let today = new Date(currentDate);
let todayY = today.getFullYear();
let todayM = today.getMonth()+1;
let todayD = today.getDate();
let nextWeek = new Date(currentDate + 7 * 24 * 60 * 60 * 1000);
let nextWeekY = nextWeek.getFullYear();
let nextWeekM = nextWeek.getMonth()+1;
let nextWeekD = nextWeek.getDate();
let fourWeeksAhead = new Date(currentDate + 28 * 24 * 60 * 60 * 1000);
let fourWeeksAheadY = fourWeeksAhead.getFullYear();
let fourWeeksAheadM = fourWeeksAhead.getMonth()+1;
let fourWeeksAheadD = fourWeeksAhead.getDate();

console.log('today is:', todayY+'-'+todayM+'-'+todayD);
console.log('next week is:', nextWeekY+'-'+nextWeekM+'-'+nextWeekD);
console.log('four weeks ahead is:', fourWeeksAheadY+'-'+fourWeeksAheadM+'-'+fourWeeksAheadD);

if (urlParams.has('id')) {
    reqID = urlParams.get('id');
}

if (urlParams.has('user')) {
    userID = urlParams.get('user');
}

console.log('id:', reqID+';', 'user:', userID);

console.log(document.getElementById('reqname'))

//TODO: get data for reqID from json, disable all fields (change styling), fill all the fields with data
//TODO: if userID is owner, anable all the fields (change styling)

// const apiURL = "http://localhost:3000/"

function weeksAhead(n) {

}

function renderPageContent () {

    console.log('renderPageContent() works')

}

function validate(form) {

    let isOK = true;

    if(form.reqname.value.length >= 255) {
        document.getElementById('reqnameArea').appendChild(document.createElement('p')).outerHTML = '<p style="color:red;">Cannot be longer than 255 characters</p>';
        isOK = false;
    }

    if(form.description.value.length <= 250) {
        let charactersLeft = 250 - form.description.value.length;
        document.getElementById('descriptionArea').appendChild(document.createElement('p')).outerHTML = '<p style="color:red;">More than 255 characters is a must! There is still '+charactersLeft+' characters to add.</p>';
        isOK = false;
    }

    if(form.budget.value <= 250000) {
        document.getElementById('budgetArea').appendChild(document.createElement('p')).outerHTML = '<p style="color:red;">Minimum amount of budget is 250 000 FBD</p>';
        isOK = false;
    }

    return isOK;
}

