const getParams = window.location.search;
const urlParams = new URLSearchParams(getParams);

let reqID = null;
let userID = null;
//TODO: reading activeUser from cookies
let activeUser = null;
let isOwner = false;

if (urlParams.has('id')) {
    reqID = urlParams.get('id');
}

if (urlParams.has('user')) {
    userID = urlParams.get('user');
}

//FIXME: cleaning – delete log below
console.log('id:', reqID + ';', 'user:', userID);

//TODO: get data for reqID from json, disable all fields (change styling), fill all the fields with data
//TODO: if userID is owner, anable all the fields (change styling)

// const apiURL = "http://localhost:3000/"

displayFormContent();

function displayFormContent() {

    // setting dates for min, default and max in deadline field:
    //FIXME: bring the date back to 'now' after testing
    let currentDate = Date.now();
    // let currentDate = Date.UTC(2020, 11, 5);
    let today = new Date(currentDate);
    let todayY = today.getFullYear();
    let todayM = today.getMonth() + 1;
    let todayD = today.getDate();
    let nextWeek = new Date(currentDate + 7 * 24 * 60 * 60 * 1000);
    let nextWeekY = nextWeek.getFullYear();
    let nextWeekM = nextWeek.getMonth() + 1;
    let nextWeekD = nextWeek.getDate();
    let fourWeeksAhead = new Date(currentDate + 28 * 24 * 60 * 60 * 1000);
    let fourWeeksAheadY = fourWeeksAhead.getFullYear();
    let fourWeeksAheadM = fourWeeksAhead.getMonth() + 1;
    let fourWeeksAheadD = fourWeeksAhead.getDate();
    let minDeadline = nextWeekY + '-' + (nextWeekM > 9 ? nextWeekM : '0' + nextWeekM) + '-' + (nextWeekD > 9 ? nextWeekD : '0' + nextWeekD);
    let defDeadline = fourWeeksAheadY + '-' + (fourWeeksAheadM > 9 ? fourWeeksAheadM : '0' + fourWeeksAheadM) + '-' + (fourWeeksAheadD > 9 ? fourWeeksAheadD : '0' + fourWeeksAheadD);
    let maxDeadline = todayY + '-12-31';

    let fieldset = document.getElementsByTagName('fieldset')[0];

    //FIXME: cleaning – delete logs
    console.log('today is:', todayY + '-' + todayM + '-' + todayD, 'currentDate', currentDate);
    console.log('next week is:', minDeadline);
    console.log('four weeks ahead is:', defDeadline);

    if (reqID) {
        if (userID != activeUser) {
            //TODO: disabling form fields when user is not owner
            console.log('disabling form fields');
        }
        //TODO: writing values to the form fields 
        console.log('writing values to the form fields');
    } else {
        if (nextWeekY != todayY) {
            let deadlineArea = document.getElementById('deadline-area');
            deadlineArea.appendChild(document.createElement('p')).outerHTML = '<p id="deadlineerror" style="color:red;">Sorry, it is too late to finish the project this year. Please come back next year. Happy New Year!</p>';
            fieldset.setAttribute('disabled', true);
        } else {
            if (fourWeeksAheadY > todayY) {
                defDeadline = maxDeadline;
            }
            renderDeadline(minDeadline, defDeadline, maxDeadline);
        }
    }
}

function storytellerIsNeeded() {
    needStoryteller = document.getElementById('needstoryteller');
    storytellerArea = document.getElementById('storytellerArea');
    storyteller = document.getElementById('storyteller');
    storytellerErrorInfo = document.getElementById('storytellererror');

    if (needStoryteller.checked) {
        if (storytellerErrorInfo) {
            storytellerErrorInfo.remove();
        }
        storytellerArea.className = 'show';
    } else {
        storytellerArea.className = 'hide';
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

    if (!form.reqname.value) {
        errorInfo = document.getElementById('reqnameerror');
        if (errorInfo) {
            errorInfo.remove();
        }
        document.getElementById('reqnameArea').appendChild(document.createElement('p')).outerHTML = '<p id="reqnameerror" style="color:red;">Please add a name for the request</p>';
        isOK = false;
    }

    if (form.reqname.value.length >= 255) {
        errorInfo = document.getElementById('reqnameerror');
        if (errorInfo) {
            errorInfo.remove();
        }
        document.getElementById('reqnameArea').appendChild(document.createElement('p')).outerHTML = '<p id="reqnameerror" style="color:red;">Cannot be longer than 255 characters</p>';
        isOK = false;
    }

    if (!form.requestor.value) {
        errorInfo = document.getElementById('requestorerror');
        if (errorInfo) {
            errorInfo.remove();
        }
        document.getElementById('requestorArea').appendChild(document.createElement('p')).outerHTML = '<p id="requestorerror" style="color:red;">Please choose a requestor</p>'
        isOK = false;
    }

    if (form.description.value.length <= 250) {
        errorInfo = document.getElementById('descriptionerror');
        if (errorInfo) {
            errorInfo.remove();
        }
        let charactersLeft = 250 - form.description.value.length;
        document.getElementById('descriptionArea').appendChild(document.createElement('p')).outerHTML = '<p id="descriptionerror" style="color:red;">More than 255 characters is a must! There is still ' + charactersLeft + ' characters to add.</p>';
        isOK = false;
    }

    let storytellerVisible = document.getElementById('storytellerArea');

    if (storytellerVisible.className == 'show' && !form.storyteller.value) {
        errorInfo = document.getElementById('storytellererror');
        if (errorInfo) {
            errorInfo.remove();
        }
        document.getElementById('storytellerArea').appendChild(document.createElement('p')).outerHTML = '<p id="storytellererror" style="color:red;">Please choose your storyteller</p>';
        isOK = false;
    }

    if (form.budget.value <= 250000) {
        errorInfo = document.getElementById('budgeterror');
        if (errorInfo) {
            errorInfo.remove();
        }
        document.getElementById('budgetArea').appendChild(document.createElement('p')).outerHTML = '<p id="budgeterror" style="color:red;">Minimum amount of budget is 250 000 FBD</p>';
        isOK = false;
    }

    return isOK;
}

