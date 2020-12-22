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
let minDeadline = nextWeekY+'-'+nextWeekM+'-'+nextWeekD;
let defDeadline = fourWeeksAheadY+'-'+fourWeeksAheadM+'-'+fourWeeksAheadD;
let maxDeadline = todayY+'-12-31';

//FIXME: delete logs
console.log('today is:', todayY+'-'+todayM+'-'+todayD);
console.log('next week is:', minDeadline);
console.log('four weeks ahead is:', defDeadline);

if (urlParams.has('id')) {
    reqID = urlParams.get('id');
}

if (urlParams.has('user')) {
    userID = urlParams.get('user');
}

//FIXME: delete log
console.log('id:', reqID+';', 'user:', userID);

//TODO: get data for reqID from json, disable all fields (change styling), fill all the fields with data
//TODO: if userID is owner, anable all the fields (change styling)

// const apiURL = "http://localhost:3000/"

displayFormContent();

function displayFormContent() {
    if (reqID) {
        if (userID != activeUser) {
            //TODO: disabling form fields
            console.log('disabling form fields');
        }
        //TODO: writing values to the form fields
        console.log('writing values to the form fields');
    } else {
        if (nextWeekY != todayY) {
            //TODO: disabling form fields
            //TODO: display info: 'Sorry, it is too late to finish the project this year. Please come back next year. Happy New Year!'
        } else {
            if (fourWeeksAheadY > todayY) {
                defDeadline = maxDeadline;
            }
            renderDeadline(minDeadline, defDeadline, maxDeadline);
        }
    }
}

function renderDeadline(min, def, max) {
    let field = document.getElementById('deadline')
    field.setAttribute('min', min);
    field.setAttribute('value', def);
    field.setAttribute('max', max);
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

